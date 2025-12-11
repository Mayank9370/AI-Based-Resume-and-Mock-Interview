import React from 'react';
import { Layout, Check } from 'lucide-react';

const TemplateSidebar = ({ selectedTemplate, onChange, isOpen, onClose }) => {
    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "Traditional, clear sections, professional.",
            color: "bg-gray-100"
        },
        {
            id: "modern",
            name: "Modern",
            preview: "Sleek, colorful, modern fonts.",
            color: "bg-blue-50"
        },
        {
            id: "modern-clean",
            name: "Modern Clean",
            preview: "Two-column, bold headings, clean.",
            color: "bg-green-50"
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Ultra-clean, content focused.",
            color: "bg-white border-dashed border-gray-300"
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "Clean typography with profile photo.",
            color: "bg-purple-50"
        },
        {
            id: "professional",
            name: "Professional",
            preview: "Two-column sidebar, tech favorite.",
            color: "bg-slate-100"
        },
        {
            id: "elegant-bordered",
            name: "Elegant Bordered",
            preview: "Bordered layout, strong hierarchy.",
            color: "bg-rose-50"
        },
        {
            id: "executive",
            name: "Executive",
            preview: "Corporate, senior-level layout.",
            color: "bg-amber-50"
        },
        {
            id: "creative",
            name: "Creative",
            preview: "Timeline style, colorful sidebar.",
            color: "bg-cyan-50"
        },
        {
            id: "compact",
            name: "Compact",
            preview: "High density, single page focus.",
            color: "bg-zinc-100"
        },
        {
            id: "basic",
            name: "Basic",
            preview: "Simple, no-frills layout.",
            color: "bg-gray-50"
        }
    ];

    return (
        <div className={`
            fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            lg:relative lg:translate-x-0 lg:w-full lg:shadow-none lg:bg-transparent
        `}>
            <div className="h-full flex flex-col bg-white lg:rounded-xl lg:border lg:shadow-sm overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                        <Layout size={18} /> Templates
                    </h3>
                    <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-gray-700">
                        Close
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {templates.map((t) => (
                        <div
                            key={t.id}
                            onClick={() => { onChange(t.id); if (window.innerWidth < 1024) onClose(); }}
                            className={`
                                cursor-pointer group relative rounded-lg border-2 text-left transition-all p-3 hover:shadow-md
                                ${selectedTemplate === t.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/50' : 'border-transparent hover:border-gray-200 bg-white shadow-sm'}
                            `}
                        >
                            <div className={`h-16 w-full rounded mb-3 ${t.color} flex items-center justify-center text-xs text-gray-400 font-mono`}>
                                Preview
                            </div>

                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className={`font-bold text-sm ${selectedTemplate === t.id ? 'text-blue-700' : 'text-gray-800'}`}>
                                        {t.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-1 leading-snug">
                                        {t.preview}
                                    </p>
                                </div>
                                {selectedTemplate === t.id && (
                                    <div className="bg-blue-500 text-white rounded-full p-0.5">
                                        <Check size={12} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateSidebar;
