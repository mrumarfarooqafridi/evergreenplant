exports.getReviews = async (req, res) => {
  try {
    if (req.useFileDatabase) {
      const reviews = await req.fileDatabase.getReviews();
      return res.json(reviews);
    }
    return res.json([]);
  } catch (error) {
    console.error("Get reviews error:", error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { name, rating, service, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "Name, rating and comment are required" });
    }

    const normalizedRating = Number(rating);
    if (Number.isNaN(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    if (req.useFileDatabase) {
      const review = await req.fileDatabase.createReview({
        name,
        service: service || "Website",
        rating: normalizedRating,
        comment,
      });
      return res.status(201).json(review);
    }

    return res.status(501).json({ message: "Reviews are not configured in Mongo mode yet" });
  } catch (error) {
    console.error("Create review error:", error);
    return res.status(500).json({ message: "Failed to submit review" });
  }
};

