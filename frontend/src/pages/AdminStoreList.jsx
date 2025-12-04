import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function AdminStoreList() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: ""
  });
  const [sortBy, setSortBy] = useState({ field: "name", dir: "asc" });

  const fetchStores = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/stores", {
        params: {
          search: filters.name || filters.email || filters.address ? `${filters.name} ${filters.email} ${filters.address}`.trim() : undefined,
          sortBy: sortBy.field === "rating" ? "rating" : "name"
        }
      });
      setStores(res.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load stores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const applyFilters = () => {
    fetchStores();
  };

  const clearFilters = () => {
    setFilters({ name: "", email: "", address: "" });
    setSortBy({ field: "name", dir: "asc" });
    fetchStores();
  };

  const toggleSort = (field) => {
    setSortBy(prev => {
      const dir = prev.field === field && prev.dir === "asc" ? "desc" : "asc";
      return { field, dir };
    });
  };

  const displayList = [...stores].sort((a, b) => {
    const f = sortBy.field;
    const dir = sortBy.dir === "asc" ? 1 : -1;
    const va = (a[f] ?? "").toString().toLowerCase();
    const vb = (b[f] ?? "").toString().toLowerCase();
    if (f === "rating") {
      return (Number(a.overallRating ?? 0) - Number(b.overallRating ?? 0)) * dir;
    }
    if (va < vb) return -1 * dir;
    if (va > vb) return 1 * dir;
    return 0;
  });

  return (
    <div className="admin-list container">
      <h2>Stores</h2>

      <div className="filter-row">
        <input placeholder="Filter by name" value={filters.name}
               onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
        <input placeholder="Filter by email" value={filters.email}
               onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
        <input placeholder="Filter by address" value={filters.address}
               onChange={(e) => setFilters({ ...filters, address: e.target.value })} />

        <button className="btn" onClick={applyFilters}>Apply</button>
        <button className="btn muted" onClick={clearFilters}>Clear</button>

        <div className="spacer" />

        <label>Sort:</label>
        <select style={{color:"black"}} value={sortBy.field} onChange={(e) => setSortBy({ field: e.target.value, dir: "asc" })}>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading stores...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : displayList.length === 0 ? (
        <div className="no-results">No stores found.</div>
      ) : (
        <table className="list-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort("name")}>Name {sortBy.field==="name" ? (sortBy.dir==="asc" ? "↑" : "↓") : ""}</th>
              <th onClick={() => toggleSort("email")}>Email {sortBy.field==="email" ? (sortBy.dir==="asc" ? "↑" : "↓") : ""}</th>
              <th onClick={() => toggleSort("address")}>Address {sortBy.field==="address" ? (sortBy.dir==="asc" ? "↑" : "↓") : ""}</th>
              <th onClick={() => toggleSort("rating")}>Rating {sortBy.field==="rating" ? (sortBy.dir==="asc" ? "↑" : "↓") : ""}</th>
            </tr>
          </thead>
          <tbody>
            {displayList.map(store => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.email}</td>
                <td>{store.address}</td>
                <td>{store.overallRating ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
