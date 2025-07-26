import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { loginMiddleware } from "../middlewares/login.middleware.js";
import { accessTokenMiddleware } from "../middlewares/accessToken.middleware.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user and create a scout profile.
 *     description: Creates a new user account with a hashed password and generates a default scout profile. Returns a success message upon creation.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: MySecurePassword123
 *     responses:
 *       201:
 *         description: User and scout profile successfully created.
 *       400:
 *         description: Validation failed or bad request.
 *       500:
 *         description: Internal server error during registration.
 */



router.post("/register", AuthController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and generate access and refresh tokens.
 *     description: Validates user credentials. If correct, returns an access token in the response and sets a refresh token in an httpOnly cookie.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: myStrongPassword123
 *     responses:
 *       200:
 *         description: Login successful. Returns access token and sets refresh token in cookie.
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", loginMiddleware, AuthController.login);

/**
 * @swagger
 * /auth/logout/{userId}:
 *   post:
 *     summary: Log out user by revoking their refresh token.
 *     description: Revokes the user's refresh token and clears the refresh token cookie.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to log out.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token successfully revoked and cookie cleared.
 *       400:
 *         description: User ID not provided.
 *       500:
 *         description: Server error while revoking token.
 */
router.post("/logout", AuthController.logout);

export default router;
