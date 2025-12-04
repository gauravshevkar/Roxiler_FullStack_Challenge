import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./add_store.css"; 

export default function AddStore() {
  const navigate = useNavigate();

  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all owners
  const fetchOwners = async () => {
    try {
      const res = await api.get("/admin/users?role=owner"); 
      setOwners(res.data);
    } catch (err) {
      console.error("Owner fetch error:", err);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await api.post("/admin/stores", form);
      setMessage(" Store added successfully!");
      setTimeout(() => navigate("/admin/stores"), 1500); 
    } catch (err) {
      setMessage(err.response?.data?.message || " Failed to add store.");
    } finally {
      setLoading(false);
    }
  };

  const ownerSelectionReady = !loading && owners.length > 0;
  
  return (
    <div className="container">
      <h2>Add New Store</h2>

      <form className="add-user-form" onSubmit={handleSubmit}> 
        
        {/* Store Name */}
        <label>Store Name</label>
        <input
          type="text" 
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* Store Email */}
        <label>Store Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* Store Address */}
        <label>Store Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        {/* Select Store Owner */}
        <label>Select Store Owner</label>
        <select
          style={{color:"black"}}
          name="ownerId"
          value={form.ownerId}
          onChange={handleChange}
          required
          disabled={loading || owners.length === 0} 
        >
          <option value="">
             {loading ? "Loading Owners..." : "-- Select Owner --"}
          </option>
          {owners.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name} ({o.email})
            </option>
          ))}
        </select>
        
        {/* Message Display */}
        {message && <p className={`msg ${message.startsWith('❌') ? 'error-msg' : 'success-msg'}`}>{message}</p>}

        <button type="submit" disabled={loading || !ownerSelectionReady}>
          {loading ? "Adding Store..." : "Add Store"}
        </button>
      </form>
    </div>
  );
}