import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiX, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';

const UploadResumeModal = ({ isOpen, onClose, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const backendURL = import.meta.env.VITE_BASE_URL;

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) validateAndSetFile(droppedFile);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file) => {
        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (allowedTypes.includes(file.type)) {
            setFile(file);
        } else {
            toast.error("Only PDF, DOC, and DOCX files are allowed");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("resumeFile", file);

        try {
            const res = await axios.post(`${backendURL}/api/resumes/upload`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data.success) {
                toast.success("Resume uploaded successfully!");
                onUploadSuccess();
                onClose();
                setFile(null);
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error(error.response?.data?.message || "Failed to upload resume");
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <h3 className="text-lg font-semibold text-slate-800">Import Resume</h3>
                            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {!file ? (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all ${dragging ? "border-indigo-500 bg-indigo-50" : "border-slate-300 bg-slate-50"
                                        }`}
                                >
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                                        <FiUploadCloud size={24} />
                                    </div>
                                    <p className="text-slate-700 font-medium mb-1">Click or Drag & Drop to Upload</p>
                                    <p className="text-sm text-slate-500 mb-4">PDF, DOCX up to 5MB</p>
                                    <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                        Browse Files
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            ) : (
                                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded flex items-center justify-center flex-shrink-0">
                                            <FiFile size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                                            <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                                            <FiX size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Upload Button */}
                            {file && (
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <FiUploadCloud size={18} /> Upload Resume
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UploadResumeModal;
