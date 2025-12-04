const Store = require("../models/Store.model");
const Rating = require("../models/Rating.model");
const { Op } = require("sequelize");

exports.getAllStores = async (req, res) => {
  try {
    const { search, sortBy } = req.query;

    const where = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { address: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const stores = await Store.findAll({
      where,
      include: [
        {
          model: Rating,
          as: "ratings",              // ⭐ FIXED
          attributes: ["ratingValue", "userId"],
        },
      ],
    });

    const userId = req.user?.id;

    const formatted = stores.map((store) => {
      const ratings = store.ratings ?? [];

      const overall =
        ratings.length > 0
          ? (
              ratings.reduce((a, r) => a + r.ratingValue, 0) /
              ratings.length
            ).toFixed(1)
          : null;

      const yourRating =
        ratings.find((r) => r.userId == userId)?.ratingValue || null;

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating: overall,
        userSubmittedRating: yourRating,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.log("STORE LIST ERROR:", err);
    res.status(500).json({ message: "Failed to load stores" });
  }
};
