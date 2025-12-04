import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import "./admin-list.css";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });
  const [sort, setSort] = useState({ field: "name", dir: "asc" });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admin/users", {
        params: {
          search: filters.name || filters.email || filters.address ? `${filters.name} ${filters.email} ${filters.address}`.trim() : undefined,
          role: filters.role || undefined,
          sortBy: sort.field
        }
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []); 

  const applyFilters = () => fetchUsers();
  const clearFilters = () => {
    setFilters({ name: "", email: "", address: "", role: "" });
    setSort({ field: "name", dir: "asc" });
    fetchUsers();
  };

  const toggleSort = (field) => {
    setSort(prev => ({ field, dir: prev.field === field && prev.dir === "asc" ? "desc" : "asc" }));
  };

  const display = [...users].sort((a,b) => {
    const f = sort.field; const dir = sort.dir==="asc"?1:-1;
    const va = (a[f] ?? "").toString().toLowerCase();
    const vb = (b[f] ?? "").toString().toLowerCase();
    if (va < vb) return -1 * dir;
    if (va > vb) return 1 * dir;
    return 0;
  });

  return (
    <div className="admin-list container">
      <h2>Users</h2>

      <div className="filter-row">
        <input placeholder="Name" value={filters.name} onChange={e => setFilters({...filters, name: e.target.value})} />
        <input placeholder="Email" value={filters.email} onChange={e => setFilters({...filters, email: e.target.value})} />
        <input placeholder="Address" value={filters.address} onChange={e => setFilters({...filters, address: e.target.value})} />

        <select style={{color:"black"}} value={filters.role} onChange={e => setFilters({...filters, role: e.target.value})}>
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn" onClick={applyFilters}>Apply</button>
        <button className="btn muted" onClick={clearFilters}>Clear</button>

        <div className="spacer" />
        <label>Sort:</label>
        <select style={{color:"black"}} value={sort.field} onChange={e=> setSort({field:e.target.value, dir:"asc"})}>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="role">Role</option>
        </select>
      </div>

      {loading ? <div className="loading">Loading users...</div> :
        error ? <div className="error">{error}</div> :
        display.length === 0 ? <div className="no-results">No users found.</div> :
        <table className="list-table">
          <thead>
            <tr>
              <th onClick={()=>toggleSort("name")}>Name {sort.field==="name"? (sort.dir==="asc"?"↑":"↓") : ""}</th>
              <th onClick={()=>toggleSort("email")}>Email {sort.field==="email"? (sort.dir==="asc"?"↑":"↓") : ""}</th>
              <th onClick={()=>toggleSort("address")}>Address</th>
              <th onClick={()=>toggleSort("role")}>Role {sort.field==="role"? (sort.dir==="asc"?"↑":"↓") : ""}</th>
            </tr>
          </thead>
          <tbody>
            {display.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}
