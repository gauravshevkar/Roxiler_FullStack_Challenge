const User = require("../models/User.model");
const Store = require("../models/Store.model");
const Rating = require("../models/Rating.model");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");


// ADD USER 
// -------------------------
exports.addUser = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;

    if (!name || !email || !address || !password || !role) {
      return res.status(400).json({ message: "All fields required." });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already exists." });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      address,
      password: hashed,
      role,
    });

    res.json({ message: "User created successfully!", user });

  } catch (err) {
    console.log("ADD USER ERROR:", err);
    res.status(500).json({ message: "Failed to add user." });
  }
};



// ADD STORE
exports.addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({ message: "All fields required." });
    }

    // Verify owner exists
    const owner = await User.findOne({ where: { id: ownerId, role: "owner" } });
    if (!owner) {
      return res.status(400).json({ message: "Invalid owner ID." });
    }

    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    res.json({
      message: "Store created successfully!",
      store,
    });

  } catch (err) {
    console.log("ADD STORE ERROR:", err);
    res.status(500).json({ message: "Failed to add store." });
  }
};




// DASHBOARD METRICS 

exports.getDashboardMetrics = async (req, res) => {
  try {
    const totalUsers = await User.count();     // 🟢 Count all users
    const totalStores = await Store.count();   // 🟢 Count all stores
    const totalRatings = await Rating.count(); // 🟢 Count all ratings

    res.json({ totalUsers, totalStores, totalRatings });

  } catch (err) {
    console.log("ADMIN METRICS ERROR:", err);
    res.status(500).json({ message: "Failed to load admin metrics." });
  }
};





//  Users List Page
// -------------------------
exports.getUsers = async (req, res) => {
  try {
    const { role, search, sortBy } = req.query;

    let where = {};

    if (role) where.role = role;

    if (search) {
      where = {
        ...where,
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
        ]
      };
    }

    const order = [[sortBy || "name", "ASC"]];

    const users = await User.findAll({ where, order });

    res.json(users);

  } catch (err) {
    console.log("GET USERS ERROR:", err);
    res.status(500).json({ message: "Failed to load users list." });
  }
};



// -------------------------
// GET ALL STORES List Page 
// -------------------------
exports.getStores = async (req, res) => {
  try {
    const { search, sortBy } = req.query;

    let where = {};

    if (search) {
      where = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
        ]
      };
    }

    const stores = await Store.findAll({
      where,
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "name", "email"]
        },
        {
          model: Rating,
          attributes: ["ratingValue"]
        }
      ],
      order: [[sortBy || "name", "ASC"]],
    });

    // Format response
    const formatted = stores.map((s) => {
      const ratings = s.Ratings;
      const avg =
        ratings.length > 0
          ? (ratings.reduce((a, b) => a + b.ratingValue, 0) / ratings.length).toFixed(1)
          : null;

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        address: s.address,
        owner: s.owner,
        rating: avg,
      };
    });

    res.json(formatted);

  } catch (err) {
    console.log("STORE LIST ERROR:", err);
    res.status(500).json({ message: "Failed to load store list." });
  }
};
