import { Router } from "express";
import * as auth from "../controllers/auth";
import * as events from "../controllers/events";
import * as groups from "../controllers/groups";

const router = Router();

router.get("/events", auth.validate, events.getAll);
router.get("/events/:id", auth.validate, events.getEvent);
router.post("/events", auth.validate, events.addEvent);
router.put("/events/:id", auth.validate, events.getEvent);
router.delete("/events/:id", auth.validate, events.deleteEvent);

router.get("events/:id_event/groups", auth.validate, groups.getAll);

export default router;