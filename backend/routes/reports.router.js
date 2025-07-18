import { Router } from "express";
import { accessTokenMiddleware } from "../middlewares/accessToken.middleware.js";
import { ReportsController } from "../controllers/reports.controller.js";

const router = Router();

router.get("/", ReportsController.getReports);
router.post("/", ReportsController.createReport);
router.put("/:id", ReportsController.updateReport);
router.delete("/:id", ReportsController.deleteReport);

export default router;
