const Rating = require("../models/Rating.model");

exports.createRating = async (req, res) => {
  try {
    const { storeId, ratingValue } = req.body;
    const userId = req.user.id;

    const existing = await Rating.findOne({
      where: { userId, storeId }
    });

    if (existing) {
      return res.status(400).json({ message: "You already rated this store" });
    }

    const rating = await Rating.create({
      userId,
      storeId,
      ratingValue,
    });

    res.json({ message: "Rating submitted", rating });
  } catch (err) {
    console.log("CREATE RATING ERROR:", err);
    res.status(500).json({ message: "Failed to submit rating" });
  }
};


exports.updateRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { ratingValue } = req.body;
    const userId = req.user.id;

    const rating = await Rating.findOne({
      where: { userId, storeId }
    });

    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    rating.ratingValue = ratingValue;
    await rating.save();

    res.json({ message: "Rating updated", rating });

  } catch (err) {
    console.log("UPDATE RATING ERROR:", err);
    res.status(500).json({ message: "Failed to update rating" });
  }
};


exports.getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;

    const ratings = await Rating.findAll({
      where: { storeId }
    });

    res.json(ratings);
  } catch (err) {
    console.log("GET RATINGS ERROR:", err);
    res.status(500).json({ message: "Failed to load ratings" });
  }
};
