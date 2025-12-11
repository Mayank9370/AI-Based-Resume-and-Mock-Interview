import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, default: "" },
  order: { type: Number, default: 0 },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
});

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, default: "Untitled Resume" },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },

    fileUrl: { type: String, default: "" },
    fileName: { type: String, default: "" },

    personal_info: {
      image: String,
      full_name: String,
      profession: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      website: String,
    },
    professional_summary: { type: String, default: "" },

    sections: [SectionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);


// {
//   "title": "Software Engineer Resume",
//   "personal_info": {
//     "full_name": "John Doe",
//     "email": "john@gmail.com",
//     "phone": "9876543210"
//   },

//   "sections": [
//     /* --------------------------------------------
//        EXPERIENCE SECTION
//     --------------------------------------------- */
//     {
//       "id": "sec-exp-1",
//       "type": "experience",
//       "title": "Work Experience",
//       "order": 1,
//       "data": [
//         {
//           "company": "Google",
//           "position": "Software Engineer",
//           "start_date": "2021-01",
//           "end_date": "2023-04",
//           "is_current": false,
//           "description": "Built scalable systems..."
//         },
//         {
//           "company": "Amazon",
//           "position": "Backend Developer",
//           "start_date": "2019-03",
//           "end_date": "2020-12",
//           "description": "Developed APIs..."
//         }
//       ]
//     },

//     /* --------------------------------------------
//        SKILLS SECTION
//     --------------------------------------------- */
//     {
//       "id": "sec-skill-1",
//       "type": "skills",
//       "title": "Skills",
//       "order": 2,
//       "data": [
//         "React",
//         "Node.js",
//         "MongoDB",
//         "AWS",
//         "System Design"
//       ]
//     },

//     /* --------------------------------------------
//        PROJECTS SECTION
//     --------------------------------------------- */
//     {
//       "id": "sec-project-1",
//       "type": "project",
//       "title": "Projects",
//       "order": 3,
//       "data": [
//         {
//           "name": "Resume Builder SaaS",
//           "tech": ["React", "Node", "MongoDB"],
//           "description": "A platform to build resumes dynamically."
//         },
//         {
//           "name": "E-Commerce App",
//           "tech": ["Flutter", "Firebase"],
//           "description": "Shopping app with payments integration."
//         }
//       ]
//     },

//     /* --------------------------------------------
//        EDUCATION SECTION
//     --------------------------------------------- */
//     {
//       "id": "sec-edu-1",
//       "type": "education",
//       "title": "Education",
//       "order": 4,
//       "data": [
//         {
//           "institution": "MIT",
//           "degree": "BTech",
//           "field": "Computer Science",
//           "graduation_date": "2020"
//         }
//       ]
//     },

//     /* --------------------------------------------
//        CERTIFICATIONS
//     --------------------------------------------- */
//     {
//       "id": "sec-cert-1",
//       "type": "certifications",
//       "title": "Certifications",
//       "order": 5,
//       "data": [
//         {
//           "name": "AWS Developer Associate",
//           "issuer": "Amazon",
//           "issue_date": "2022",
//           "credential_id": "AWS-1234"
//         }
//       ]
//     },

//     /* --------------------------------------------
//        ACHIEVEMENTS
//     --------------------------------------------- */
//     {
//       "id": "sec-ach-1",
//       "type": "achievements",
//       "title": "Achievements",
//       "order": 6,
//       "data": [
//         {
//           "title": "Hackathon Winner",
//           "description": "Won 1st place out of 200 teams."
//         }
//       ]
//     },

//     /* --------------------------------------------
//        LANGUAGES (custom section)
//     --------------------------------------------- */
//     {
//       "id": "sec-lang-1",
//       "type": "custom",
//       "title": "Languages",
//       "order": 7,
//       "data": [
//         "English - Native",
//         "Hindi - Fluent",
//         "German - Intermediate"
//       ]
//     },

//     /* --------------------------------------------
//        INTERESTS (custom section)
//     --------------------------------------------- */
//     {
//       "id": "sec-interest-1",
//       "type": "custom",
//       "title": "Interests",
//       "order": 8,
//       "data": [
//         "Traveling",
//         "Photography",
//         "Chess"
//       ]
//     },

//     /* --------------------------------------------
//        PUBLICATIONS (custom complex section)
//     --------------------------------------------- */
//     {
//       "id": "sec-pub-1",
//       "type": "publications",
//       "title": "Publications",
//       "order": 9,
//       "data": [
//         {
//           "title": "Research on AI Systems",
//           "publisher": "IEEE",
//           "year": "2023",
//           "link": "https://example.com/publication"
//         }
//       ]
//     }
//   ]
// }