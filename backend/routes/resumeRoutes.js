import express from "express";
import upload from "../middlewares/upload.js";
import { isAuth } from "../middlewares/isAuth.js";

import uploadResumeFile from "../middlewares/uploadResumeFile.js";
import {
  createResume,
  getMyResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
  togglePublicStatus,
  uploadResume,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/upload", isAuth, uploadResumeFile.single("resumeFile"), uploadResume);
router.post("/", isAuth, upload.single("profileImage"), createResume);
router.get("/", isAuth, getMyResumes);
router.get("/:id", isAuth, getResumeById);
router.patch("/:id", isAuth, upload.single("profileImage"), updateResume);
router.delete("/:id", isAuth, deleteResume);
router.post("/:id/duplicate", isAuth, duplicateResume);
router.patch("/:id/toggle-public", isAuth, togglePublicStatus);

export default router;