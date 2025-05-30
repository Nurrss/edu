const router = require("express").Router();
const _ = require("lodash");
const City = require("../models/City");

/**
 * @swagger
 * /api/cities:
 *   get:
 *     tags: [Cities]
 *     summary: "Get all cities"
 *     responses:
 *       200:
 *         description: "A list of cities retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 *
 * @swagger
 * /api/cities/add:
 *   post:
 *     tags: [Cities]
 *     summary: "Add a new city"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       200:
 *         description: "New city added successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *
 * @swagger
 * /api/cities/{id}:
 *   get:
 *     tags: [Cities]
 *     summary: "Get a single city by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "City retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *
 *   put:
 *     tags: [Cities]
 *     summary: "Update a city by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       200:
 *         description: "City updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *
 *   delete:
 *     tags: [Cities]
 *     summary: "Delete a city by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "City deleted successfully"
 *
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Алматы"
 */

// GET all cities
router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD city
router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "City name is required" });

    const newCity = new City({ name });
    await newCity.save();
    res.status(200).json(newCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating city" });
  }
});

// GET city by ID
router.get("/:id", async (req, res) => {
  try {
    const cityId = _.get(req, "params.id");
    const city = await City.findById(cityId);
    if (!city) return res.status(404).json({ message: "City not found" });

    res.status(200).json(city);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching city" });
  }
});

// UPDATE city
router.put("/:id", async (req, res) => {
  try {
    const cityId = _.get(req, "params.id");
    const { name } = req.body;
    const updated = await City.findByIdAndUpdate(
      cityId,
      { name },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating city" });
  }
});

// DELETE city
router.delete("/:id", async (req, res) => {
  try {
    const cityId = _.get(req, "params.id");
    await City.findByIdAndDelete(cityId);
    res.status(200).json({ message: `${cityId} was deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting city" });
  }
});

module.exports = router;
