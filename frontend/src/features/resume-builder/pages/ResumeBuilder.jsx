import { useEffect, useState, useMemo } from 'react'
import ColorPicker from '../components/ColorPicker';
import TemplateSelector from '../components/TemplateSelector';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import ResumePreview from '../components/ResumePreview';

// STATIC FORMS
import PersonalInfoForm from '../components/PersonalInfoForm';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';

// SECTION FORMS
import SkillsForm from '../components/SkillsForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import DynamicSectionForm from '../components/DynamicSectionForm';

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const isEditMode = !!resumeId;
  const backenUrl = import.meta.env.VITE_BASE_URL;

  const [resumeData, setResumeData] = useState({
    title: "Untitled Resume",
    template: "classic",
    accent_color: "#2563EB",
    personal_info: {},
    professional_summary: "",
    sections_obj: {},
    section_order: []
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [showSectionPopup, setShowSectionPopup] = useState(false);

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!resumeId) return;
      try {
        const res = await axios.get(`${backenUrl}/api/resumes/${resumeId}`, { withCredentials: true });
        const resume = res.data.resume;

        const sections_obj = Object.fromEntries(
          resume.sections.map(s => [s.id, s])
        );

        const section_order = resume.sections.map(s => s.id);

        setResumeData({
          ...resume,
          sections_obj,
          section_order
        });

      } catch (err) {
        toast.error("Failed to load resume");
      }
    };

    fetchResumeData();
  }, [resumeId, backenUrl]);

  // FORM STEPPER
  const formSteps = useMemo(() => [
    { key: "title", label: "Resume Title", type: "static" },
    { key: "personal_info", label: "Personal Information", type: "static" },
    { key: "summary", label: "Professional Summary", type: "static" },
    ...resumeData.section_order.map(id => ({
      key: id,
      label: resumeData.sections_obj[id]?.title || "Section",
      type: resumeData.sections_obj[id].type
    }))
  ], [resumeData.section_order, resumeData.sections_obj]);

  const activeStep = formSteps[activeIndex];

  const nextStep = () => activeIndex < formSteps.length - 1 && setActiveIndex(activeIndex + 1);
  const prevStep = () => activeIndex > 0 && setActiveIndex(activeIndex - 1);

  // CREATE NEW SECTION
  const createSection = (type) => {
    const id = `sec-${type}-${Date.now()}`;

    const newSection = {
      id,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      data: type === "skills" ? [] : type === "project" ? [{
        name: "",
        type: "",
        role: "",
        tech: "",
        start_date: "",
        end_date: "",
        is_current: false,
        link: "",
        description: "",
        bullets: [""]
      }] : type === "custom" ? [{
        title: "",
        subtitle: "",
        description: [""],
        date: ""
      }] : [{}]
    };

    setResumeData(prev => ({
      ...prev,
      section_order: [...prev.section_order, id],
      sections_obj: {
        ...prev.sections_obj,
        [id]: newSection
      }
    }));

    setActiveIndex(formSteps.length);
    setShowSectionPopup(false);
  };

  // SAVE RESUME
  const saveResume = async () => {
    const formatted = {
      ...resumeData,
      sections: resumeData.section_order.map(id => resumeData.sections_obj[id])
    };

    try {
      if (isEditMode) {
        await axios.patch(`${backenUrl}/api/resumes/${resumeId}`, formatted, { withCredentials: true });
        toast.success("Resume Updated!");
      } else {
        await axios.post(`${backenUrl}/api/resumes`, formatted, { withCredentials: true });
        toast.success("Resume Created!");
      }
    } catch (err) {
      toast.error("Saving failed!");
    }
  };
  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      toast.error("Resume preview not found");
      return;
    }

    try {
      // Use html-to-image to capture the element (supports oklch/modern CSS)
      const imgData = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2 // Improve quality
      });

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calculate dimensions to fit the page
      // eslint-disable-next-line new-cap
      const pdfDoc = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdfDoc.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;


      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdfDoc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add subsequent pages if content overflows
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdfDoc.addPage();
        pdfDoc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdfDoc.save(`${resumeData.title || 'resume'}.pdf`);
      toast.success("Downloaded as PDF");
    } catch (err) {
      console.error("PDF Download Error:", err);
      toast.error("Failed to download PDF: " + (err.message || err));
    }
  };

  const handleDownloadWord = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    // Clone the element to not affect the view
    const clone = element.cloneNode(true);

    // Prepare styles for Word compatibility
    // Mapping common Tailwind classes to inline styles or CSS block
    const css = `
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.5; color: #333; }
        h1 { font-size: 24pt; font-weight: bold; margin-bottom: 10pt; }
        h2 { font-size: 18pt; font-weight: bold; margin-top: 15pt; margin-bottom: 8pt; border-bottom: 1pt solid #ccc; }
        h3 { font-size: 14pt; font-weight: bold; margin-top: 10pt; margin-bottom: 5pt; }
        p { font-size: 11pt; margin-bottom: 5pt; }
        ul { margin-top: 0; margin-bottom: 5pt; padding-left: 20pt; }
        li { font-size: 11pt; margin-bottom: 3pt; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .font-bold { font-weight: bold; }
        .font-semibold { font-weight: bold; }
        .text-xl { font-size: 16pt; }
        .text-lg { font-size: 14pt; }
        .text-sm { font-size: 10pt; }
        .text-gray-600 { color: #666; }
        .text-gray-700 { color: #444; }
        .mb-4 { margin-bottom: 10pt; }
        .mb-2 { margin-bottom: 5pt; }
        .border-b-2 { border-bottom: 2pt solid #eee; }
      </style>
    `;

    const html = `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        ${css}
      </head>
      <body>
        ${clone.outerHTML}
      </body>
      </html>`;

    try {
      const blob = await asBlob(html);
      saveAs(blob, `${resumeData.title || 'resume'}.docx`);
      toast.success("Downloaded as Word");
    } catch (e) {
      console.error(e);
      toast.error("Word download failed");
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen pb-12">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/resumeBuilder" className="flex items-center gap-2 text-gray-600">
            <ArrowLeftIcon className="size-4" /> Back
          </Link>

          <div className="flex gap-4 items-center">
            <TemplateSelector
              selectedTemplate={resumeData.template}
              onChange={(t) => setResumeData(prev => ({ ...prev, template: t }))}
            />

            <ColorPicker
              selectedColor={resumeData.accent_color}
              onChange={(c) => setResumeData(prev => ({ ...prev, accent_color: c }))}
            />

            <button
              onClick={handleDownloadPDF}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              Download PDF
            </button>
            <button
              onClick={handleDownloadWord}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Download Word
            </button>

            <button
              onClick={saveResume}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditMode ? "Save Changes" : "Create Resume"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="ml-10 mx-auto grid lg:grid-cols-12 gap-8 px-2 mt-4">

        {/* LEFT PANEL */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white shadow-lg border rounded-xl p-6">

            {/* Navigation */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={prevStep} disabled={activeIndex === 0} className="p-2 border rounded-lg">
                <ChevronLeft />
              </button>

              <span className="text-sm text-gray-600">
                Step {activeIndex + 1} of {formSteps.length}
              </span>

              <button onClick={nextStep} disabled={activeIndex === formSteps.length - 1} className="p-2 border rounded-lg">
                <ChevronRight />
              </button>
            </div>

            <h2 className="text-lg font-semibold mb-4">{activeStep.label}</h2>

            {/* STATIC FORMS */}
            {activeStep.key === "title" && (
              <input
                type="text"
                className="w-full border rounded p-2"
                value={resumeData.title}
                onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
              />
            )}

            {activeStep.key === "personal_info" && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(v) => setResumeData(prev => ({ ...prev, personal_info: v }))}
              />
            )}

            {activeStep.key === "summary" && (
              <ProfessionalSummaryForm
                data={resumeData.professional_summary}
                onChange={(v) => setResumeData(prev => ({ ...prev, professional_summary: v }))}
              />
            )}

            {/* SECTION FORMS */}
            {activeStep.type === "skills" && (
              <SkillsForm
                data={resumeData.sections_obj[activeStep.key].data}
                onChange={(v) =>
                  setResumeData(prev => ({
                    ...prev,
                    sections_obj: {
                      ...prev.sections_obj,
                      [activeStep.key]: {
                        ...prev.sections_obj[activeStep.key],
                        data: v
                      }
                    }
                  }))
                }
              />
            )}
            {activeStep.type === "experience" && (
              <ExperienceForm
                data={resumeData.sections_obj[activeStep.key]?.data || []}
                onChange={(v) =>
                  setResumeData(prev => ({
                    ...prev,
                    sections_obj: {
                      ...prev.sections_obj,
                      [activeStep.key]: {
                        ...(prev.sections_obj[activeStep.key] || {
                          id: activeStep.key,
                          type: "experience",
                          title: "Work Experience",
                          order: 1,
                          data: []
                        }),
                        data: v
                      }
                    }
                  }))
                }
              />
            )}


            {activeStep.type === "education" && (
              <EducationForm
                data={resumeData.sections_obj[activeStep.key].data}
                onChange={(v) =>
                  setResumeData(prev => ({
                    ...prev,
                    sections_obj: {
                      ...prev.sections_obj,
                      [activeStep.key]: { ...prev.sections_obj[activeStep.key], data: v }
                    }
                  }))
                }
              />
            )}

            {activeStep.type === "project" && (
              <ProjectForm
                data={resumeData.sections_obj[activeStep.key].data}
                onChange={(v) =>
                  setResumeData(prev => ({
                    ...prev,
                    sections_obj: {
                      ...prev.sections_obj,
                      [activeStep.key]: { ...prev.sections_obj[activeStep.key], data: v }
                    }
                  }))
                }
              />
            )}

            {/* CUSTOM SECTION */}
            {activeStep.type === "custom" && (
              <DynamicSectionForm
                section={resumeData.sections_obj[activeStep.key]}
                onChange={(v) =>
                  setResumeData(prev => ({
                    ...prev,
                    sections_obj: {
                      ...prev.sections_obj,
                      [activeStep.key]: { ...prev.sections_obj[activeStep.key], data: v }
                    }
                  }))
                }
                onTitleChange={(newTitle) =>
                  setResumeData(prev => ({
                    ...prev,
                    sections_obj: {
                      ...prev.sections_obj,
                      [activeStep.key]: {
                        ...prev.sections_obj[activeStep.key],
                        title: newTitle
                      }
                    }
                  }))
                }
              />
            )}

            {/* Add Section Button */}
            <button
              onClick={() => setShowSectionPopup(true)}
              className="bg-gray-200 w-full py-3 rounded mt-6"
            >
              + Add Section
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            <ResumePreview
              data={{
                ...resumeData,
                sections: resumeData.section_order.map(id => resumeData.sections_obj[id])
              }}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>

      </div>

      {/* SECTION POPUP */}
      {showSectionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 space-y-3">
            <h3 className="text-lg font-bold">Add New Section</h3>

            <button className="w-full border p-2 rounded" onClick={() => createSection("skills")}>Skills</button>
            <button className="w-full border p-2 rounded" onClick={() => createSection("experience")}>Experience</button>
            <button className="w-full border p-2 rounded" onClick={() => createSection("project")}>Projects</button>
            <button className="w-full border p-2 rounded" onClick={() => createSection("education")}>Education</button>
            <button className="w-full border p-2 rounded" onClick={() => createSection("custom")}>Custom Section</button>

            <button className="text-red-500 text-sm mt-2" onClick={() => setShowSectionPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
// End of file