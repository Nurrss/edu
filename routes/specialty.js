const router = require("express").Router();
const _ = require("lodash");
const Specialty = require("../models/Specialty");

/**
 * @swagger
 * /api/specialties:
 *   get:
 *     tags: [Specialties]
 *     summary: "Get all specialties"
 *     responses:
 *       200:
 *         description: "A list of specialties"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Specialty'
 *
 * @swagger
 * /api/specialties/add:
 *   post:
 *     tags: [Specialties]
 *     summary: "Add a new specialty"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Specialty'
 *     responses:
 *       200:
 *         description: "Specialty created"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specialty'
 *
 * @swagger
 * /api/specialties/{id}:
 *   get:
 *     tags: [Specialties]
 *     summary: "Get a specialty by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: "Specialty found"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specialty'
 *
 *   put:
 *     tags: [Specialties]
 *     summary: "Update a specialty by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Specialty'
 *     responses:
 *       200:
 *         description: "Specialty updated"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Specialty'
 *
 *   delete:
 *     tags: [Specialties]
 *     summary: "Delete a specialty"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: "Specialty deleted"
 *
 * components:
 *   schemas:
 *     Specialty:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Информационные технологии"
 *         code:
 *           type: string
 *           example: "6B06101"
 *         ent_subjects:
 *           type: array
 *           items:
 *             type: string
 *             description: "ENTSubject ObjectId"
 *         universities:
 *           type: array
 *           items:
 *             type: string
 *             description: "University ObjectId"
 *         degree_type:
 *           type: string
 *           enum: ["Бакалавриат", "Магистратура", "Докторантура"]
 *           example: "Бакалавриат"
 *         description:
 *           type: string
 *           example: "Специальность, связанная с программированием и ИТ."
 */

// GET all specialties
router.get("/", async (req, res) => {
  try {
    const data = await Specialty.find()
      .populate("ent_subjects")
      .populate("universities");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD specialty
router.post("/add", async (req, res) => {
  try {
    const { name, code, ent_subjects, universities, degree_type, description } =
      req.body;

    const newSpecialty = new Specialty({
      name,
      code,
      ent_subjects,
      universities,
      degree_type,
      description,
    });

    await newSpecialty.save();
    res.status(200).json(newSpecialty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating specialty" });
  }
});

// GET specialty by ID
router.get("/:id", async (req, res) => {
  try {
    const id = _.get(req, "params.id");
    const specialty = await Specialty.findById(id)
      .populate("ent_subjects")
      .populate("universities");

    if (!specialty) {
      return res.status(404).json({ message: "Specialty not found" });
    }

    res.status(200).json(specialty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching specialty" });
  }
});

// UPDATE specialty
router.put("/:id", async (req, res) => {
  try {
    const id = _.get(req, "params.id");
    const { name, code, ent_subjects, universities, degree_type, description } =
      req.body;

    const updated = await Specialty.findByIdAndUpdate(
      id,
      {
        name,
        code,
        ent_subjects,
        universities,
        degree_type,
        description,
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating specialty" });
  }
});

// DELETE specialty
router.delete("/:id", async (req, res) => {
  try {
    const id = _.get(req, "params.id");
    await Specialty.findByIdAndDelete(id);
    res.status(200).json({ message: `Specialty ${id} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting specialty" });
  }
});

module.exports = router;
