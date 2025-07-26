import { Router } from "express";
import { PlayerAttributesController } from "../controllers/playerAttributes.controller.js";

const router = Router();
/**
 * @swagger
 * /players/attributes:
 *   get:
 *     summary: Retrieve attributes for all players
 *     description: Fetches attribute data for all players in the system.
 *     tags:
 *       - PlayerAttributes
 *     responses:
 *       200:
 *         description: Player attributes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 playersAttributes:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Players attributes not found
 *       500:
 *         description: Server error
 */

router.get("/", PlayerAttributesController.getPlayersAttributes);

/**
 * @swagger
 * /players/attributes/{id}:
 *   put:
 *     summary: Update attributes for a specific player
 *     description: Updates the attributes data for a player identified by their ID.
 *     tags:
 *       - PlayerAttributes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Player ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Attributes data to update
 *     responses:
 *       201:
 *         description: Player attributes updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 updatedAttributes:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid data or player attributes not found
 *       500:
 *         description: Server error
 */
router.put("/", PlayerAttributesController.updatePlayerAttributes); 

/**
 * @swagger
 * /players/{id}/attributes:
 *   post:
 *     summary: Create attributes for a specific player
 *     description: Adds new attribute data to a player identified by their ID.
 *     tags:
 *       - PlayerAttributes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to add attributes to
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Player attributes data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define expected player attribute fields here
 *     responses:
 *       201:
 *         description: Player attributes created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 playerAttributes:
 *                   type: object
 *       401:
 *         description: Invalid data
 *       500:
 *         description: Server error
 */
router.post("/:id", PlayerAttributesController.createPlayerAttributes)

/**
 * @swagger
 * /players/{id}/attributes:
 *   get:
 *     summary: Retrieve attributes of a specific player
 *     description: Fetches the attribute data for a player identified by their ID.
 *     tags:
 *       - PlayerAttributes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to retrieve attributes for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player attributes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 playerAttributes:
 *                   type: object
 *       400:
 *         description: Player attributes not found
 *       500:
 *         description: Server error
 */
router.get("/:id", PlayerAttributesController.getPlayerAttributesById);


export default router;
