import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import RichTextEditor from './RichTextEditor';

const ProfessionalSummaryForm = ({ data, onChange }) => {

  // const { token } = useSelector(state => state.auth)
  const [isGenerating, setIsGenerating] = useState(false)
  const backendURL = import.meta.env.VITE_BASE_URL;

  const generateSummary = async () => {
    try {
      if (!data) return toast.error("Please write something first to enhance.");

      setIsGenerating(true)
      const res = await axios.post(`${backendURL}/api/ai/enhance`,
        { text: data, type: "summary" },
        { withCredentials: true }
      );

      if (res.data.success) {
        onChange(res.data.enhancedText);
        toast.success("Summary enhanced successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to enhance text");
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='space-y-4'>
      <div className="border-b border-slate-100 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Professional Summary</h2>
        <p className="text-slate-500 mt-1">Write a short and engaging summary about yourself.</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Summary</label>
          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-violet-100 to-fuchsia-100 text-violet-700 px-3 py-1.5 rounded-full hover:from-violet-200 hover:to-fuchsia-200 border border-violet-200 transition-all shadow-sm disabled:opacity-70"
          >
            {isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            {isGenerating ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all bg-white relative group">
          <textarea
            value={data?.summary || ""}
            onChange={(e) => onChange({ ...data, summary: e.target.value })}
            placeholder="Experienced Full Stack Developer with 5+ years..."
            className="w-full h-40 p-4 outline-none resize-none text-slate-700 leading-relaxed"
          />
          <div className={`absolute right-4 bottom-4 transition-all duration-300 pointer-events-none ${data?.summary?.length > 10 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="bg-white rounded-full shadow-sm">
              <CheckCircle2 className="text-green-500 w-6 h-6" fill="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm;
