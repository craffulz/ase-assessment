import { Router } from "express";
import { accessTokenMiddleware } from "../middlewares/accessToken.middleware.js";
import { ReportsController } from "../controllers/reports.controller.js";

const router = Router();

/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Retrieve all reports
 *     description: Get a list of all available reports.
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 reports:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No reports found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   example: Reports not found
 *       500:
 *         description: Server error
 */
router.get("/", ReportsController.getReports);

/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Create a new report
 *     description: Creates a new report for a player with the provided data.
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player_id:
 *                 type: string
 *                 description: ID of the player related to the report
 *               [other report fields]:
 *                 type: [type]
 *                 description: [description]
 *             required:
 *               - player_id
 *     responses:
 *       201:
 *         description: Report successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Successfully created report
 *                 createdReport:
 *                   type: string
 *                   description: ID of the player related to the report
 *       401:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Invalid data
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server error
 */
router.post("/", ReportsController.createReport);

/**
 * @swagger
 * /reports/{id}:
 *   put:
 *     summary: Update an existing report
 *     description: Updates the report identified by the given ID with new data.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the report to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               [fields to update]:
 *                 type: [type]
 *                 description: [field description]
 *     responses:
 *       201:
 *         description: Report successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Successfully updated report
 *                 updatedReport:
 *                   type: string
 *                   description: ID of the player related to the updated report
 *       401:
 *         description: Invalid data or missing data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Invalid data
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server error
 */
router.put("/:id", ReportsController.updateReport);

/**
 * @swagger
 * /reports/{id}:
 *   delete:
 *     summary: Delete a report by ID
 *     description: Deletes the report identified by the provided ID.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the report to delete
 *     responses:
 *       200:
 *         description: Report successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: Success deleting report
 *                 deletedReport:
 *                   type: string
 *                   description: ID of the deleted report
 *       401:
 *         description: ID not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Id not provided
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server error
 */
router.delete("/:id", ReportsController.deleteReport);

export default router;
