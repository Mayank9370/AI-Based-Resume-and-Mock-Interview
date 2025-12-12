import React, { useEffect, useState } from 'react';
import { FiUploadCloud } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Edit3, Trash2, FileText, MoreVertical, Copy, Globe, Lock, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';

import UploadResumeModal from '../components/UploadResumeModal';
import TemplateGallery from '../components/TemplateGallery';

const ResumeDashboard = () => {
  const [allResume, setAllResume] = useState([]);
  console.log('Fetch all Resume', allResume);

  const [menuOpen, setMenuOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const RESUMES_PER_PAGE = 5;

  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BASE_URL;

  const safe = (fn, fallback) => {
    try { return fn(); } catch { return fallback; }
  };

  const createResume = () => navigate(`/resumeBuilder`);

  const uploadResume = () => {
    setShowUploadModal(true);
  };

  /** ---------------------------------------------
   * FETCH ALL RESUMES
   ---------------------------------------------- */
  const fetchResume = async () => {
    if (!backendURL) {
      toast.error("Backend URL is not configured");
      return;
    }

    try {
      const res = await axios.get(`${backendURL}/api/resumes`, { withCredentials: true });

      const data = res?.data?.resumes;
      setAllResume(Array.isArray(data) ? data : []);

    } catch (error) {
      toast.error("Error fetching resumes");
      setAllResume([]);

    } finally {
      setLoading(false);
    }
  };

  // ❗ FIXED: RUN ONLY ON MOUNT
  useEffect(() => {
    fetchResume();
  }, []);

  /** ---------------------------------------------
   * DELETE RESUME
   ---------------------------------------------- */
  const deleteResume = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/resumes/${id}`, { withCredentials: true });
      setAllResume(prev => prev.filter(r => r._id !== id));
      toast.success("Resume deleted");
    } catch {
      toast.error("Failed to delete resume");
    }
  };

  /** ---------------------------------------------
   * DUPLICATE RESUME
   ---------------------------------------------- */
  const duplicateResume = async (id) => {
    try {
      const res = await axios.post(`${backendURL}/api/resumes/${id}/duplicate`, {}, { withCredentials: true });

      if (res?.data?.resumes) {
        setAllResume(prev => [res.data.resumes, ...prev]);
      }

      toast.success("Resume duplicated");
    } catch {
      toast.error("Failed to duplicate");
    }
  };

  /** ---------------------------------------------
   * TOGGLE PUBLIC/PRIVATE
   ---------------------------------------------- */
  const togglePublic = async (id) => {
    try {
      const res = await axios.patch(`${backendURL}/api/resumes/${id}/toggle-public`, {}, { withCredentials: true });

      if (res?.data?.resumes) {
        setAllResume(prev => prev.map(r => (r._id === id ? res.data.resumes : r)));
      }

      toast.success(res?.data?.message || "Updated");
    } catch {
      toast.error("Failed to change visibility");
    }
  };

  /** ---------------------------------------------
   * SHARE RESUME
   ---------------------------------------------- */
  const shareResume = (id) => {
    const url = `${window.location.origin}/view/${id}`;

    if (navigator.share) {
      navigator.share({ url, text: "My Resume" }).catch(() => { });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const downloadResume = () => window.print();

  const resumePlaceholder =
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop";

  /** ---------------------------------------------
   * LOADING STATE
   ---------------------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading resumes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">My Resumes</h1>
          <p className="text-slate-500 mt-1">Manage and create your professional resumes.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={uploadResume}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 py-2 px-5 rounded-lg shadow-sm hover:bg-slate-50"
          >
            <FiUploadCloud size={18} /> <span>Import</span>
          </button>

          <button
            onClick={createResume}
            className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-5 rounded-lg shadow hover:bg-indigo-700"
          >
            <FaPlus size={18} /> Create New
          </button>
        </div>
      </div>

      {/* RESUME LIST */}
      <div className="max-w-6xl mx-auto">

        {allResume.length === 0 ? (
          /** Empty State */
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">No resumes yet</h3>
            <p className="text-slate-500 mt-2 mb-6 max-w-md mx-auto">
              Start by creating a new resume from scratch or import your existing one.
            </p>
            <button
              onClick={createResume}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white py-2.5 px-6 rounded-lg hover:bg-indigo-700"
            >
              <FaPlus size={18} /> Create Resume
            </button>
          </div>
        ) : (
          <>
          /** Resumes Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {/* PAGINATION LOGIC */
                /* Show "Create New" card only on first page if we want consistency, or always? 
                   User request: "list of resume add pagination at most we can see atmost 5 resume"
                   Implying the list itself is paginated. The Create New card is part of the grid.
                   Let's count the "Create New" card as one item or Keep it separate?
                   The design usually has the "Create New" card as the first item. 
                   If we paginate the *data* (allResume), the create card stays at top or is part of page 1.
                   Let's place "Create New" card always on Page 1 as the first item.
                */
              }

              {/* Create New Card - Only show on Page 1 */}
              {currentPage === 1 && (
                <div
                  onClick={createResume}
                  className="group cursor-pointer bg-white border-2 border-dashed border-slate-300 rounded-xl h-[320px] flex flex-col items-center justify-center hover:border-indigo-500 hover:bg-indigo-50/30 transition-all"
                >
                  <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaPlus size={28} />
                  </div>
                  <h3 className="font-semibold text-slate-900">Create New Resume</h3>
                  <p className="text-sm text-slate-500 mt-1">Start from scratch</p>
                </div>
              )}

              {/* Resume Cards - Paginated */}
              {allResume
                /* 
                   If Page 1: Show first 4 resumes (since Create Card takes 1 spot) -> Total 5 items
                   If Page > 1: Show 5 resumes
                   This logic matches "at most 5 resume" per view. 
                   Let's simplify: Pagination applies to the LIST. 
                   Page 1: Create Card + Resumes 0-3
                   Page 2: Resumes 4-8
                */
                .slice(
                  currentPage === 1 ? 0 : (currentPage - 1) * RESUMES_PER_PAGE - 1,
                  currentPage === 1 ? RESUMES_PER_PAGE - 1 : currentPage * RESUMES_PER_PAGE - 1
                )
                .map((res) => (
                  <motion.div
                    key={res?._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all flex flex-col h-[320px] relative"
                  >
                    {/* Preview */}
                    <div
                      onClick={() => navigate(`/resumeBuilder/${res?._id}`)}
                      className="relative h-48 cursor-pointer"
                    >
                      <img
                        src={resumePlaceholder}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all"
                        onError={(e) => (e.target.src = resumePlaceholder)}
                      />
                    </div>

                    {/* Menu Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(menuOpen === res._id ? null : res._id);
                      }}
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full p-2 shadow hover:bg-white"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen === res._id && (
                      <div className="absolute right-3 top-12 w-44 bg-white border shadow-lg rounded-lg p-2 z-20">
                        <button
                          onClick={() => { togglePublic(res._id); setMenuOpen(null); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 rounded"
                        >
                          {res.public ? <Lock size={14} /> : <Globe size={14} />}
                          {res.public ? "Make Private" : "Make Public"}
                        </button>

                        <button
                          onClick={() => { shareResume(res._id); setMenuOpen(null); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 rounded"
                        >
                          <Globe size={14} /> Share
                        </button>

                        <button
                          onClick={() => { downloadResume(res._id); setMenuOpen(null); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 rounded"
                        >
                          <Download size={14} /> Download
                        </button>

                        <button
                          onClick={() => { duplicateResume(res._id); setMenuOpen(null); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100 rounded"
                        >
                          <Copy size={14} /> Duplicate
                        </button>

                        <button
                          onClick={() => { deleteResume(res._id); setMenuOpen(null); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}

                    {/* Info */}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h3
                          onClick={() => navigate(`/resumeBuilder/${res?._id}`)}
                          className="font-semibold text-lg cursor-pointer hover:text-indigo-600"
                        >
                          {res?.title || "Untitled Resume"}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1 truncate">
                          {safe(() => res.personal_info.profession, "No profession added")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                        <button
                          onClick={() => navigate(`/resumeBuilder/${res?._id}`)}
                          className="flex-1 flex items-center justify-center gap-1.5 text-sm text-slate-700 hover:text-indigo-600 py-1.5 px-3 rounded hover:bg-indigo-50"
                        >
                          <Edit3 size={14} /> Edit
                        </button>

                        <div className="w-px h-4 bg-slate-200"></div>

                        <button
                          onClick={() => deleteResume(res._id)}
                          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 py-1.5 px-3 rounded hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* PAGINATION CONTROLS */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-slate-600 font-medium">Page {currentPage}</span>
              <button
                /* 
                   Calculate max pages:
                   Total items = allResume.length + 1 (Create Card)
                   Pages = Math.ceil(Total / 5)
                */
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage >= Math.ceil((allResume.length + 1) / RESUMES_PER_PAGE)}
                className="p-2 border rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* TEMPLATE GALLERY SECTION */}
      <div className="max-w-6xl mx-auto mt-20 pt-12 border-t border-slate-200">
        <TemplateGallery />
      </div>

      <UploadResumeModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={fetchResume}
      />
    </div>
  );
};


export default ResumeDashboard;