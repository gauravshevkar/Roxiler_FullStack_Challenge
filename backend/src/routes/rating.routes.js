const express = require("express");
const router = express.Router();

const ratingController = require("../controllers/rating.controller");
const auth = require("../middlewares/auth");  

router.post("/", auth, ratingController.createRating);

router.put("/:storeId", auth, ratingController.updateRating);

router.get("/:storeId", ratingController.getStoreRatings);

module.exports = router;
