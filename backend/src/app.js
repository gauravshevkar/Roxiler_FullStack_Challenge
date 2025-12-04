const express = require("express");
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/admin.routes");
const storeRoutes = require("./routes/store.routes");
const authRoutes = require("./routes/auth.routes");
const ownerRoutes = require("./routes/owner.routes");
require("./models");  


app.use(cors());
app.use(express.json());

// Import Routes


// Route Mapping
app.use("/api/auth", authRoutes);
app.use("/api/admin", require("./routes/admin.routes"));

app.use("/api/stores", storeRoutes);
app.use("/api/ratings", require("./routes/rating.routes"));

app.use("/api/owner", ownerRoutes);
app.use("/api/owner", require("./routes/owner.routes"));



app.get("/", (req, res) => {
  res.send("Backend running...");
});

module.exports = app;
