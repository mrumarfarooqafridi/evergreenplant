const express = require("express");
const router = express.Router();
const { submitContact } = require("../controllers/contactController");

// POST endpoint for contact form submission
router.post("/submit", submitContact);

module.exports = router;
