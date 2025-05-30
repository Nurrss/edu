const router = require("express").Router();
const _ = require("lodash");
const ENTSubject = require("../models/Subject");

/**
 * @swagger
 * /api/entsubjects:
 *   get:
 *     tags: [ENTSubjects]
 *     summary: "Get all ENT subjects"
 *     responses:
 *       200:
 *         description: "List of ENT subjects"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ENTSubject'
 *
 * /api/entsubjects/add:
 *   post:
 *     tags: [ENTSubjects]
 *     summary: "Add a new ENT subject"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ENTSubject'
 *     responses:
 *       200:
 *         description: "ENT subject created"
 *
 * /api/entsubjects/{id}:
 *   get:
 *     tags: [ENTSubjects]
 *     summary: "Get an ENT subject by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "ENT subject found"
 *
 *   put:
 *     tags: [ENTSubjects]
 *     summary: "Update an ENT subject"
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
 *             $ref: '#/components/schemas/ENTSubject'
 *     responses:
 *       200:
 *         description: "ENT subject updated"
 *
 *   delete:
 *     tags: [ENTSubjects]
 *     summary: "Delete an ENT subject"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "ENT subject deleted"
 *
 * components:
 *   schemas:
 *     ENTSubject:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Математика"
 */

router.get("/", async (req, res) => {
  const data = await ENTSubject.find();
  res.status(200).json(data);
});

router.post("/add", async (req, res) => {
  const { name } = req.body;
  const item = new ENTSubject({ name });
  await item.save();
  res.status(200).json(item);
});

router.get("/:id", async (req, res) => {
  const id = _.get(req, "params.id");
  const data = await ENTSubject.findById(id);
  res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
  const id = _.get(req, "params.id");
  const data = await ENTSubject.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
  const id = _.get(req, "params.id");
  await ENTSubject.findByIdAndDelete(id);
  res.status(200).json({ message: `ENTSubject ${id} deleted` });
});

module.exports = router;
