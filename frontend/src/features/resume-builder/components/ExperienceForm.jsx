import { Loader2, Sparkles, Plus, Trash2, Calendar, Building2, Briefcase } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import RichTextEditor from './RichTextEditor';
import ValidatedInput from './ValidatedInput';

const ExperienceForm = ({ data = [], onChange }) => {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const backendURL = import.meta.env.VITE_BASE_URL;

  const updateItem = (i, field, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  const add = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false
      }
    ]);
  };

  const remove = (i) => {
    onChange(data.filter((_, idx) => idx !== i));
  };

  const enhanceDescription = async (index, text) => {
    if (!text) return toast.error("Please provide a description first.");

    setLoadingIndex(index);
    try {
      const res = await axios.post(`${backendURL}/api/ai/enhance`,
        { text, type: "experience" },
        { withCredentials: true }
      );

      if (res.data.success) {
        updateItem(index, "description", res.data.enhancedText);
        toast.success("Description enhanced!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to enhance text");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800">Experience</h2>
        <p className="text-slate-500 mt-1">Detailed work history helps recruiters understand your background.</p>
      </div>

      <div className="space-y-6">
        {(data || []).map((item, i) => (
          <div key={i} className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:border-blue-200 hover:shadow-sm transition-all group">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                  {i + 1}
                </span>
                {item.company || "New Experience"}
              </h3>
              <button
                onClick={() => remove(i)}
                className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Experience"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <ValidatedInput
                label="Position Title"
                value={item.position}
                onChange={(e) => updateItem(i, "position", e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                startIcon={Briefcase}
              />
              <ValidatedInput
                label="Company Name"
                value={item.company}
                onChange={(e) => updateItem(i, "company", e.target.value)}
                placeholder="e.g. Google"
                startIcon={Building2}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <ValidatedInput
                label="Start Date"
                type="month"
                value={item.start_date}
                onChange={(e) => updateItem(i, "start_date", e.target.value)}
                startIcon={Calendar}
              />
              <div className="space-y-2">
                <ValidatedInput
                  label="End Date"
                  type="month"
                  value={item.end_date}
                  onChange={(e) => updateItem(i, "end_date", e.target.value)}
                  startIcon={Calendar}
                  className={item.is_current ? "opacity-50 pointer-events-none" : ""}
                />
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer w-fit ml-1">
                  <input
                    type="checkbox"
                    checked={item.is_current || false}
                    onChange={(e) => updateItem(i, "is_current", e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  I currently work here
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <button
                  onClick={() => enhanceDescription(i, item.description)}
                  disabled={loadingIndex === i}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 px-3 py-1.5 rounded-full hover:from-violet-200 hover:to-fuchsia-200 border border-violet-200 transition-all shadow-sm disabled:opacity-70"
                >
                  {loadingIndex === i ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  {loadingIndex === i ? "Enhancing..." : "Enhance with AI"}
                </button>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all bg-white">
                <RichTextEditor
                  value={item.description || ""}
                  onChange={(value) => updateItem(i, "description", value)}
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Add Work Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
