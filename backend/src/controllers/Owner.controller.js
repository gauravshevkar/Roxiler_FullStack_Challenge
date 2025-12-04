const Store = require("../models/Store.model");
const Rating = require("../models/Rating.model");
const User = require("../models/User.model");

exports.getStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: { ownerId },
    });

    if (!store) {
      return res.json({
        storeRatings: [],
        message: "No store found for this owner.",
      });
    }

    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      storeRatings: ratings,
    });

  } catch (error) {
    console.log("OWNER RATINGS ERROR:", error);
    res.status(500).json({ message: "Failed to load ratings." });
  }
};

exports.getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    //  Get the store owned by the logged-in owner
    const store = await Store.findOne({
      where: { ownerId }
    });

    if (!store) {
      return res.status(404).json({
        message: "No store found for this owner."
      });
    }

    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      attributes: ["ratingValue"]
    });

    const totalRatings = ratings.length;

    const averageRating =
      totalRatings > 0
        ? ratings.reduce((sum, r) => sum + r.ratingValue, 0) / totalRatings
        : 0;

    res.json({
      storeName: store.name,
      totalRatings,
      averageRating
    });

  } catch (error) {
    console.error("OWNER DASHBOARD ERROR:", error);
    res.status(500).json({ message: "Failed to load dashboard." });
  }
};