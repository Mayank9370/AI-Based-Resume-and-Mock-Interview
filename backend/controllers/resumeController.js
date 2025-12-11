// // controllers/resumeController.js
// import Resume from "../models/resumeModel.js";

// /**
//  * Parse JSON fields if they come as strings (when using form-data)
//  *
//  * This will handle both:
//  * - top-level fields like personal_info, skills, etc.
//  * - OR a single "resumeData" field which is a JSON string (frontend's FormData format)
//  */
// const parseJSONFields = (body) => {
//   if (!body) return body;

//   // If frontend sent a single "resumeData" field (stringified JSON), extract it first
//   if (typeof body.resumeData === "string") {
//     try {
//       const parsed = JSON.parse(body.resumeData);
//       // Merge parsed object into body (parsed fields overwrite top-level if present)
//       body = { ...body, ...parsed };
//       // Remove resumeData wrapper so other parsing logic below can run cleanly
//       delete body.resumeData;
//     } catch (e) {
//       // if invalid JSON, leave it as-is (other fields may still be present)
//       console.warn("Failed to parse resumeData JSON:", e.message);
//     }
//   }

//   // Now try to parse specific fields that may still be stringified
//   const jsonFields = [
//     "personal_info",
//     "skills",
//     "experience",
//     "education",
//     "project",
//   ];

//   jsonFields.forEach((field) => {
//     if (body[field] && typeof body[field] === "string") {
//       try {
//         body[field] = JSON.parse(body[field]);
//       } catch {
//         // ignore invalid JSON → assume already object/array or plain string
//       }
//     }
//   });

//   return body;
// };

// /**
//  * CREATE RESUME
//  */
// export const createResume = async (req, res) => {
//   try {
//     const userId = req.userId; // expects isAuth middleware to set req.userId
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     // Parse incoming body (supporting FormData with "resumeData" JSON)
//     req.body = parseJSONFields(req.body);

//     // Build resume object explicitly to avoid unexpected fields
//     const resumePayload = {
//       userId,
//       title: req.body.title,
//       public: req.body.public,
//       template: req.body.template,
//       accent_color: req.body.accent_color,
//       professional_summary: req.body.professional_summary,
//       skills: req.body.skills,
//       personal_info: req.body.personal_info,
//       experience: req.body.experience,
//       education: req.body.education,
//       project: req.body.project,
//     };

//     const resume = new Resume(resumePayload);

//     // If multer provided file, attach path
//     if (req.file) {
//       resume.personal_info = resume.personal_info || {};
//       resume.personal_info.image = req.file.path;
//     }

//     await resume.save();

//     res.status(201).json({
//       success: true,
//       message: "Resume created successfully",
//       data: resume,
//     });
//   } catch (err) {
//     console.error("createResume err:", err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// export const updateResume = async (req, res) => {
//   try {
//     const resumeId = req.params.id;
//     const resume = await Resume.findById(resumeId);

//     if (!resume) {
//       return res.status(404).json({ success: false, message: "Resume not found" });
//     }

//     // Use req.userId consistently (isAuth should set req.userId)
//     if (!req.userId || resume.userId.toString() !== req.userId.toString()) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     // Parse incoming body (including possible resumeData wrapper)
//     req.body = parseJSONFields(req.body);

//     // If file uploaded, ensure image path is set on personal_info
//     if (req.file) {
//       req.body.personal_info = req.body.personal_info || {};
//       req.body.personal_info.image = req.file.path;
//     }

//     // Prevent accidental setting of userId/_id via body
//     const sanitized = { ...req.body };
//     delete sanitized._id;
//     delete sanitized.userId;
//     delete sanitized.createdAt;
//     delete sanitized.updatedAt;

//     const updated = await Resume.findByIdAndUpdate(
//       resumeId,
//       { $set: sanitized },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Resume updated successfully",
//       data: updated,
//     });
//   } catch (err) {
//     console.error("updateResume err:", err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// /**
//  * GET ALL RESUMES (Dashboard)
//  */
// export const getMyResumes = async (req, res) => {
//   try {
//     const userId = req.userId;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: resumes });
//   } catch (err) {
//     console.error("getMyResumes err:", err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// /**
//  * GET SINGLE RESUME
//  */
// export const getResumeById = async (req, res) => {
//   try {
//     const resume = await Resume.findById(req.params.id);

//     if (!resume) {
//       return res.status(404).json({ success: false, message: "Resume not found" });
//     }

//     if (!req.userId || resume.userId.toString() !== req.userId.toString()) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     res.status(200).json({ success: true, data: resume });
//   } catch (err) {
//     console.error("getResumeById err:", err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// /**
//  * DELETE RESUME
//  */
// export const deleteResume = async (req, res) => {
//   try {
//     const resume = await Resume.findById(req.params.id);

//     if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });

//     if (!req.userId || resume.userId.toString() !== req.userId.toString()) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     await resume.deleteOne();

//     res.status(200).json({ success: true, message: "Resume deleted" });
//   } catch (err) {
//     console.error("deleteResume err:", err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// /**
//  * DUPLICATE RESUME
//  */
// export const duplicateResume = async (req, res) => {
//   try {
//     const old = await Resume.findById(req.params.id);

//     if (!old) return res.status(404).json({ success: false, message: "Resume not found" });

//     if (!req.userId || old.userId.toString() !== req.userId.toString()) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     const newResume = new Resume({
//       ...old.toObject(),
//       _id: undefined,
//       createdAt: undefined,
//       updatedAt: undefined,
//       title: (old.title || "Untitled Resume") + " (Copy)",
//       userId: old.userId,
//     });

//     await newResume.save();

//     res.status(201).json({
//       success: true,
//       message: "Resume duplicated successfully",
//       data: newResume,
//     });
//   } catch (err) {
//     console.error("duplicateResume err:", err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

// /**
//  * TOGGLE PUBLIC/PRIVATE
//  */
// export const togglePublicStatus = async (req, res) => {
//   try {
//     const resume = await Resume.findById(req.params.id);

//     if (!resume) return res.status(404).json({ success: false, message: "Resume not found" });

//     if (!req.userId || resume.userId.toString() !== req.userId.toString()) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     resume.public = !resume.public;
//     await resume.save();

//     res.status(200).json({
//       success: true,
//       message: `Resume is now ${resume.public ? "public" : "private"}`,
//       data: resume,
//     });
//   } catch (err) {
//     console.error("togglePublicStatus err:", err);
//     res.status(500).json({ success: false, message: err.message || "Server error" });
//   }
// };

import Resume from "../models/resumeModel.js";
import { deepMerge } from "../utils/deepMerge.js";
import { parseJsonFields } from "../utils/parseJsonFields.js";

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;

    let payload = parseJsonFields(req.body);

    if (req.file) {
      payload.personal_info = {
        ...(payload.personal_info || {}),
        image: req.file.path,
      };
    }

    const resume = await Resume.create({
      ...payload,
      userId,
    });

    res.status(201).json({ success: true, resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, resumes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume)
      return res.status(404).json({ success: false, message: "Resume not found" });

    res.json({ success: true, resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    let update = parseJsonFields(req.body);

    if (req.file) {
      update.personal_info = {
        ...(update.personal_info || {}),
        image: req.file.path,
      };
    }

    const existing = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!existing)
      return res.status(404).json({ success: false, message: "Resume not found" });

    const merged = deepMerge(existing.toObject(), update);

    const updated = await Resume.findByIdAndUpdate(req.params.id, merged, {
      new: true,
    });

    res.json({ success: true, resume: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted)
      return res.status(404).json({ success: false, message: "Resume not found" });

    res.json({ success: true, message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const duplicateResume = async (req, res) => {
  try {
    const original = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!original)
      return res.status(404).json({ success: false, message: "Resume not found" });

    const copy = original.toObject();
    delete copy._id;

    copy.title = `${copy.title} (Copy)`;

    const newResume = await Resume.create(copy);

    res.json({ success: true, resume: newResume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const togglePublicStatus = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume)
      return res.status(404).json({ success: false, message: "Resume not found" });

    resume.public = !resume.public;

    await resume.save();

    res.json({
      success: true,
      public: resume.public,
      message: `Resume is now ${resume.public ? "Public" : "Private"}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const { originalname, path } = req.file;
    const title = originalname.split(".").slice(0, -1).join(".");

    console.log("[Upload] File uploaded:", originalname);
    console.log("[Upload] Starting resume parsing and enhancement...");

    // Import services dynamically (top-level imports would be better but doing inline for clarity)
    const { parseResumeFile } = await import("../services/resumeParserService.js");
    const { extractResumeData } = await import("../services/aiResumeService.js");

    // Step 1: Parse the file to extract text
    let extractedText;
    try {
      extractedText = await parseResumeFile(req.file);
      console.log("[Upload] Text extracted successfully");
    } catch (parseError) {
      console.error("[Upload] Parse error:", parseError);
      // Fallback: Create resume with just file metadata if parsing fails
      const fallbackResume = await Resume.create({
        userId: req.userId,
        title,
        fileUrl: path,
        fileName: originalname,
        template: "classic",
      });
      return res.status(201).json({
        success: true,
        resume: fallbackResume,
        warning: "File uploaded but content parsing failed. You can manually edit the resume."
      });
    }

    // Step 2: Use AI to extract structured data
    let structuredData;
    try {
      structuredData = await extractResumeData(extractedText);
      console.log("[Upload] AI extraction successful");
    } catch (aiError) {
      console.error("[Upload] AI extraction error:", aiError);
      // Fallback: Create resume with just file metadata if AI extraction fails
      const fallbackResume = await Resume.create({
        userId: req.userId,
        title,
        fileUrl: path,
        fileName: originalname,
        template: "classic",
      });
      return res.status(201).json({
        success: true,
        resume: fallbackResume,
        warning: "File uploaded but AI enhancement failed. You can manually edit the resume."
      });
    }

    // Step 3: Create resume with enhanced structured data
    const newResume = await Resume.create({
      userId: req.userId,
      title: structuredData.personal_info?.full_name
        ? `${structuredData.personal_info.full_name}'s Resume`
        : title,
      fileUrl: path,
      fileName: originalname,
      template: "classic",
      personal_info: structuredData.personal_info || {},
      professional_summary: structuredData.professional_summary || "",
      sections: structuredData.sections || [],
    });

    console.log("[Upload] Resume created successfully with enhanced data");

    res.status(201).json({
      success: true,
      resume: newResume,
      message: "Resume uploaded and enhanced successfully!"
    });
  } catch (err) {
    console.error("[Upload] Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};