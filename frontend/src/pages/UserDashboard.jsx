import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./userdashcss.css";
import AdminNavbar from "../component/admin_Navbar";

export default function StoreListing() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); 

  const navigate = useNavigate();

  //  Fetch Stores API
  const fetchStores = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/stores", {
        params: {
          search: searchQuery,
          sortBy: sortBy,
        },
      });

      setStores(res.data || []);
    } catch (err) {
      console.error("Store Listing Fetch Error:", err);
      setError("Failed to load stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [searchQuery, sortBy]);

  //  Submit or Update Rating
  const handleRateStore = async (storeId, userRating) => {
    const entered = prompt(
      `Enter your rating for this store (1–5)\nCurrent Rating: ${userRating || "Not Rated"}`
    );

    const ratingValue = Number(entered);

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      alert("❌ Invalid rating! Must be a number between 1 and 5.");
      return;
    }

    try {
      const endpoint = userRating ? `/ratings/${storeId}` : `/ratings`;
      const method = userRating ? "PUT" : "POST";

      await api({
        url: endpoint,
        method,
        data: { storeId, ratingValue },
      });

      alert("✔ Rating submitted successfully!");
      fetchStores(); 
    } catch (err) {
      console.error("Rating Error:", err);
      setError(err.response?.data?.message || "Failed to submit rating.");
    }
  };

  //  Loading UI
  if (loading) {
    return <div className="loading">⏳ Loading stores...</div>;
  }

 
  if (error) {
    return <div className="error">❌ {error}</div>;
  }

  return (

    //NAV BAR
    <div>
    <AdminNavbar/>

    <div className="container">
      <h2>🌍 Explore Stores</h2>

      {/* ─── Search + Sort Controls ─── */}
      <div className="controls-bar">
        <input
          type="text"
          placeholder="Search by Name or Address…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          style={{color:"black"}}
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {/* ─── Store List ─── */}
      {stores.length === 0 ? (
        <p className="no-results">No stores found matching your search.</p>
      ) : (
        <div className="store-list">
          {stores.map((store) => (
            <div key={store.id} className="store-card">
              <h3>{store.name}</h3>

              <p className="address">📍 {store.address}</p>

              <div className="ratings-info">
                <p>
                  ⭐ <b>Overall Rating:</b> {store.overallRating || "N/A"}
                </p>
               <p>
                  📝 Your Rating: {store.userSubmittedRating ?? "Not Rated"}
                </p>

              </div>

              <button
                className="rate-btn"
                onClick={() =>
                  handleRateStore(store.id, store.userSubmittedRating)
                }
              >
                {store.userSubmittedRating ? "Modify Rating" : "Submit Rating"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
