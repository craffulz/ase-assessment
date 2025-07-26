import { Router } from "express";
import { PlayerController } from "./../controllers/player.controller.js";
import { accessTokenMiddleware } from "../middlewares/accessToken.middleware.js";
const router = Router();

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     description: Retrieve a list of all players.
 *     tags:
 *       - Players
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 players:
 *                   type: array
 *                   description: List of players
 *                   items:
 *                     type: object
 *       404:
 *         description: No players found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   example: Players not found
 *       500:
 *         description: Server error
 */
router.get("/", accessTokenMiddleware, PlayerController.getPlayers);

/**
 * @swagger
 * /players/search:
 *   get:
 *     summary: Search and paginate players
 *     description: Retrieve a paginated list of players with optional filters and sorting.
 *     tags:
 *       - Players
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default: 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of players per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *       # Add more filter query params if needed here
 *     responses:
 *       200:
 *         description: List of players with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 players:
 *                   type: array
 *                   description: List of players matching the query
 *                   items:
 *                     type: object
 *                 pagination:
 *                   type: object
 *                   description: Pagination details
 *       500:
 *         description: Server error
 */
router.get("/search", accessTokenMiddleware, PlayerController.searchPlayers);

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     description: Adds a new player to the database.
 *     tags:
 *       - Players
 *     requestBody:
 *       description: Player data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Define your player creation schema here
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 newPlayer:
 *                   type: object
 *                   description: The newly created player object
 *       400:
 *         description: Invalid data provided
 *       500:
 *         description: Server error
 */
router.post("/", accessTokenMiddleware, PlayerController.createPlayer);


/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get player details by ID
 *     description: Retrieve detailed information about a specific player by their ID.
 *     tags:
 *       - Players
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player to retrieve
 *     responses:
 *       200:
 *         description: Player details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 playerDetails:
 *                   type: object
 *       400:
 *         description: Player ID not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   example: Player ID not provided
 *       404:
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   example: Player not found
 *       500:
 *         description: Server error
 */
router.get("/:id", accessTokenMiddleware, PlayerController.getPlayerDetails);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Update player information by ID
 *     description: Updates the details of a player using their unique ID.
 *     tags:
 *       - Players
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the player to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Player data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Define your player update schema here
 *     responses:
 *       201:
 *         description: Player updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                 playerUpdated:
 *                   type: string
 *                   description: Name of the updated player
 *       400:
 *         description: Invalid data or missing parameters
 *       500:
 *         description: Server error
 */
router.put("/:id", accessTokenMiddleware, PlayerController.updatePlayer);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Delete a player by ID
 *     description: Deletes a player identified by their unique ID from the system.
 *     tags:
 *       - Players
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Player ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 playerDeleted:
 *                   type: string
 *                   description: Name of the deleted player
 *       400:
 *         description: Player ID not provided
 *       500:
 *         description: Server error
 */
router.delete("/:id", accessTokenMiddleware, PlayerController.deletePlayer);

export default router;
