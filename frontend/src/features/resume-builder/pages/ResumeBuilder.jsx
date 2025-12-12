import { useEffect, useState, useMemo } from 'react'
import ColorPicker from '../components/ColorPicker';
import TemplateSelector from '../components/TemplateSelector';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, ChevronLeft, ChevronRight, X, Briefcase, GraduationCap, FolderGit2, Code, PenTool, Layout } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import ResumePreview from '../components/ResumePreview';
import FormStepper from '../components/FormStepper';

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
  /* Updated to support template URL param */
  const { resumeId } = useParams();
  /* Read template from URL query params */
  const [searchParams] = useSearchParams();
  const initialTemplate = searchParams.get('template') || "classic";

  const isEditMode = !!resumeId;
  const backenUrl = import.meta.env.VITE_BASE_URL;

  const [resumeData, setResumeData] = useState({
    title: "Untitled Resume",
    template: initialTemplate,
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/resume/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
            <div className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200">
              <ArrowLeftIcon className="size-4" />
            </div>
            <span className="font-medium hidden sm:block">Dashboard</span>
          </Link>

          <div className="flex items-center gap-3 overflow-x-auto sm:overflow-visible no-scrollbar py-2">
            <TemplateSelector
              selectedTemplate={resumeData.template}
              onChange={(t) => setResumeData(prev => ({ ...prev, template: t }))}
            />

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <ColorPicker
              selectedColor={resumeData.accent_color}
              onChange={(c) => setResumeData(prev => ({ ...prev, accent_color: c }))}
            />

            <div className="flex gap-2 ml-2">
              <button
                onClick={handleDownloadPDF}
                className="p-2 sm:px-4 sm:py-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all flex items-center gap-2"
                title="Download PDF"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span className="hidden sm:inline">PDF</span>
              </button>

              <button
                onClick={saveResume}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 hover:shadow-lg transition-all font-medium flex items-center gap-2"
              >
                <span className="hidden sm:inline">{isEditMode ? "Save Changes" : "Save Resume"}</span>
                <span className="sm:hidden">Save</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 mt-6 h-[calc(100vh-180px)]">

        <div className="grid lg:grid-cols-2 gap-6 h-full">
          {/* LEFT PANEL - FORM CARD */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
            {/* Header Step Indicator */}
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{activeStep.label}</h2>
                <p className="text-slate-500 text-sm mt-1">Add your details below</p>
              </div>
              <div className="flex gap-1">
                {formSteps.map((_, i) => (
                  <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i === activeIndex ? 'bg-blue-600' : 'bg-slate-200'}`} />
                ))}
              </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {/* STATIC FORMS */}
              {activeStep.key === "title" && (
                <div className="space-y-4">
                  <label className="text-base font-semibold text-slate-700">Resume Title</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-lg"
                    value={resumeData.title}
                    onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Full Stack Developer"
                  />
                </div>
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

              {/* Education Form */}
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
                className="w-full mt-8 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span> Add Custom Section
              </button>
            </div>

            {/* Navigation Footer */}
            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-white shrink-0">
              <button
                onClick={prevStep}
                disabled={activeIndex === 0}
                className="px-6 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Back
              </button>
              <button
                onClick={activeIndex === formSteps.length - 1 ? saveResume : nextStep}
                className="px-8 py-3 rounded-xl bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 shadow-xl shadow-blue-200 hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                {activeIndex === formSteps.length - 1 ? "Finish & Save" : `Next: ${formSteps[activeIndex + 1]?.label || 'Next Step'}`}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - PREVIEW CARD */}
          <div className="bg-slate-100 rounded-3xl p-6 hidden lg:flex flex-col h-full shadow-inner min-h-0 relative">
            <div className="flex items-center justify-between mb-4 px-2 shrink-0">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <span className="text-sm font-bold text-green-600">100%</span>
                <span className="text-xs text-slate-500 font-medium">Resume Score</span>
              </div>

              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(t) => setResumeData(prev => ({ ...prev, template: t }))}
              />
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar rounded-xl shadow-2xl bg-white border border-slate-200">
              <div className="min-h-full">
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

        </div>
      </div>

      {/* SECTION POPUP */}
      {/* MODERN DARK THEME SECTION POPUP */}
      {showSectionPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl shadow-2xl p-0 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
              <div>
                <h3 className="text-xl font-bold text-white">Add Section</h3>
                <p className="text-neutral-400 text-sm mt-0.5">Choose a section to add to your resume</p>
              </div>
              <button
                onClick={() => setShowSectionPopup(false)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid gap-3">
              {[
                { id: 'experience', label: 'Work Experience', desc: 'Add your past jobs and internships', icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                { id: 'education', label: 'Education', desc: 'Schools, degrees, and certifications', icon: GraduationCap, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                { id: 'project', label: 'Projects', desc: 'Showcase your best technical work', icon: FolderGit2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                { id: 'skills', label: 'Skills', desc: 'List your technical and soft skills', icon: Code, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                { id: 'custom', label: 'Custom Section', desc: 'Create a section for anything else', icon: PenTool, color: 'text-pink-400', bg: 'bg-pink-400/10' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => createSection(item.id)}
                  className="w-full text-left group flex items-center gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 hover:border-neutral-700 transition-all duration-200"
                >
                  <div className={`p-3 rounded-lg ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-base group-hover:text-blue-400 transition-colors">{item.label}</h4>
                    <p className="text-neutral-500 text-sm group-hover:text-neutral-400">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-neutral-950/50 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setShowSectionPopup(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
// End of file