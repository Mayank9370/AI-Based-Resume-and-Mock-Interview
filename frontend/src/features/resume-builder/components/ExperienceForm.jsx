import { Loader2, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import RichTextEditor from './RichTextEditor';

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
    <div className="space-y-6">
      {(data || []).map((item, i) => (
        <div key={i} className="border border-gray-300 rounded-lg p-4 space-y-3 bg-white">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Experience #{i + 1}</h3>
            <button onClick={() => remove(i)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Company</label>
              <input
                value={item.company || ""}
                onChange={(e) => updateItem(i, "company", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex. Google"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Position</label>
              <input
                value={item.position || ""}
                onChange={(e) => updateItem(i, "position", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex. Senior Software Engineer"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Start Date</label>
              <input
                type="month"
                value={item.start_date || ""}
                onChange={(e) => updateItem(i, "start_date", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">End Date</label>
              <input
                type="month"
                disabled={item.is_current}
                value={item.end_date || ""}
                onChange={(e) => updateItem(i, "end_date", e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm text-gray-600">Description</label>
              <button
                onClick={() => enhanceDescription(i, item.description)}
                disabled={loadingIndex === i}
                className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
              >
                {loadingIndex === i ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {loadingIndex === i ? "Enhancing..." : "AI Enhance"}
              </button>
            </div>
            <RichTextEditor
              value={item.description || ""}
              onChange={(value) => updateItem(i, "description", value)}
              placeholder="• Developed backend API...&#10;• Led team of 5 developers..."
            />
            <p className="text-xs text-slate-400 mt-1">Use the toolbar to format your description with bullets and styling.</p>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={item.is_current || false}
              onChange={(e) => updateItem(i, "is_current", e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Currently working here
          </label>
        </div>
      ))}

      <button
        onClick={add}
        className="w-full border-2 border-dashed border-blue-200 text-blue-600 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
      >
        + Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
