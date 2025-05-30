const router = require("express").Router();
const _ = require("lodash");
const University = require("../models/University");

/**
 * @swagger
 * /api/universities:
 *   get:
 *     tags: [Universities]
 *     summary: "Get all universities"
 *     responses:
 *       200:
 *         description: "List of universities"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/University'
 *
 * /api/universities/add:
 *   post:
 *     tags: [Universities]
 *     summary: "Add a new university"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/University'
 *     responses:
 *       200:
 *         description: "University created"
 *
 * /api/universities/{id}:
 *   get:
 *     tags: [Universities]
 *     summary: "Get a university by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "University found"
 *
 *   put:
 *     tags: [Universities]
 *     summary: "Update a university"
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
 *             $ref: '#/components/schemas/University'
 *     responses:
 *       200:
 *         description: "University updated"
 *
 *   delete:
 *     tags: [Universities]
 *     summary: "Delete a university"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "University deleted"
 *
 * components:
 *   schemas:
 *     University:
 *       type: object
 *       required:
 *         - name
 *         - city
 *       properties:
 *         name:
 *           type: string
 *           example: "Назарбаев Университет"
 *         city:
 *           type: string
 *           example: "Астана"
 *         website:
 *           type: string
 *           example: "https://nu.edu.kz"
 */

router.get("/", async (req, res) => {
  const data = await University.find();
  res.status(200).json(data);
});

router.post("/add", async (req, res) => {
  const { name, city, website } = req.body;
  const item = new University({ name, city, website });
  await item.save();
  res.status(200).json(item);
});

router.get("/:id", async (req, res) => {
  const id = _.get(req, "params.id");
  const data = await University.findById(id);
  res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
  const id = _.get(req, "params.id");
  const data = await University.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
  const id = _.get(req, "params.id");
  await University.findByIdAndDelete(id);
  res.status(200).json({ message: `University ${id} deleted` });
});

module.exports = router;
