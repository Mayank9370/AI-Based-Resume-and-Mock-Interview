import React from 'react';
import { useNavigate } from 'react-router-dom';
import { templates } from '../constants/templates';
import { ArrowRight, Star } from 'lucide-react';

const TemplateGallery = () => {
    const navigate = useNavigate();

    // Limit to first 6 templates for the dashboard view
    const displayedTemplates = templates.slice(0, 6);

    const handleUseTemplate = (templateId) => {
        navigate(`/resumeBuilder?template=${templateId}`);
    };

    return (
        <div className="py-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Start with a Template</h2>
                    <p className="text-slate-500 mt-2">Choose from our professionally designed templates to get started quickly.</p>
                </div>
                {/* Optional: View All Link */}
                {/* <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1">
                    View All Templates <ArrowRight size={16} />
                </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedTemplates.map((template) => (
                    <div
                        key={template.id}
                        className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
                    >
                        {/* Preview Area (Abstract Representation) */}
                        <div className={`h-40 ${template.color || 'bg-slate-50'} p-6 flex flex-col items-center justify-center relative overflow-hidden`}>
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>

                            <div className="w-24 h-32 bg-white shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300 rounded border border-slate-100 flex flex-col p-2 gap-2">
                                <div className="h-2 w-12 bg-slate-200 rounded"></div>
                                <div className="h-1 w-full bg-slate-100 rounded"></div>
                                <div className="h-1 w-full bg-slate-100 rounded"></div>
                                <div className="h-1 w-16 bg-slate-100 rounded"></div>
                                <div className="mt-2 h-8 w-full bg-slate-50 rounded border border-dashed border-slate-200"></div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-slate-900">{template.name}</h3>
                                {template.id === 'modern' || template.id === 'professional' ? (
                                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                        <Star size={10} fill="currentColor" /> Popular
                                    </span>
                                ) : null}
                            </div>

                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{template.preview}</p>

                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                                <div className="flex gap-2">
                                    {template.tags?.slice(0, 2).map((tag, i) => (
                                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleUseTemplate(template.id)}
                                    className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                >
                                    Select <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateGallery;
