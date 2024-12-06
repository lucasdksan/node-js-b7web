import { Router } from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";

const router = Router();

router.get("/events", auth.validate, events.getAll);
router.get("/events/:id", auth.validate, events.getEvent);

export default router;