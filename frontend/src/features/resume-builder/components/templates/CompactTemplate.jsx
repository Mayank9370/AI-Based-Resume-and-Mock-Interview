import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

/**
 * CompactTemplate
 * High density template designed to fit maximum information on a single page.
 * Uses 2 columns with very tight spacing and smaller fonts (10pt/11pt).
 */
const CompactTemplate = ({ data, accentColor }) => {

    // Helper to format dates
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const renderSection = (section) => {
        const { type, title, data: items } = section;
        if (!items || items.length === 0) return null;

        return (
            <div key={section.id} className="mb-4">
                <h2 className="text-sm font-bold uppercase border-b mb-1 pb-0.5" style={{ borderColor: accentColor, color: accentColor }}>
                    {title}
                </h2>
                <div className="">
                    {items.map((item, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-sm font-bold text-gray-900">
                                    {item.position || item.name || item.heading || item.title || item.degree}
                                </h3>
                                {(item.date || item.start_date) && (
                                    <span className="text-xs font-medium text-gray-600 whitespace-nowrap ml-2">
                                        {item.date || `${formatDate(item.start_date)} - ${item.is_current ? "Present" : formatDate(item.end_date)}`}
                                    </span>
                                )}
                            </div>

                            {(item.company || item.institution || item.subheading || item.subtitle) && (
                                <p className="text-xs font-semibold text-gray-700">
                                    {item.company || item.institution || item.subheading || item.subtitle}
                                </p>
                            )}

                            {item.description && (
                                <div
                                    className="text-xs leading-snug text-gray-800 mt-0.5 resume-html-content"
                                    dangerouslySetInnerHTML={{
                                        __html: Array.isArray(item.description)
                                            ? item.description.join('<br>')
                                            : item.description
                                    }}
                                />
                            )}

                            {item.bullets && item.bullets.length > 0 && (
                                <ul className="list-disc ml-4 mt-0.5 text-xs text-gray-800 leading-snug">
                                    {item.bullets.map((b, k) => b && <li key={k}>{b}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white text-gray-900 shadow-lg leading-tight" style={{ fontSize: '11px' }}>

            {/* COMPACT HEADER */}
            <header className="border-b-2 pb-3 mb-3 flex justify-between items-start" style={{ borderColor: accentColor }}>
                <div>
                    <h1 className="text-2xl font-bold uppercase tracking-tight" style={{ color: accentColor }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-sm font-medium text-gray-600">
                        {data.personal_info?.profession || "Profession"}
                    </p>
                </div>
                <div className="text-right text-xs space-y-0.5 text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center justify-end gap-1">
                            <span>{data.personal_info.email}</span> <Mail size={10} />
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center justify-end gap-1">
                            <span>{data.personal_info.phone}</span> <Phone size={10} />
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center justify-end gap-1">
                            <span>{data.personal_info.location}</span> <MapPin size={10} />
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center justify-end gap-1">
                            <span className="truncate max-w-[150px]">{data.personal_info.linkedin}</span> <Linkedin size={10} />
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-4">

                {/* LEFT COLUMN (Main Content) - 8 cols */}
                <div className="col-span-8">
                    {data.professional_summary && (
                        <div className="mb-3">
                            <h2 className="text-sm font-bold uppercase border-b mb-1 pb-0.5" style={{ borderColor: accentColor, color: accentColor }}>Profile</h2>
                            <div
                                className="text-xs text-gray-800 text-justify resume-html-content"
                                dangerouslySetInnerHTML={{ __html: data.professional_summary }}
                            />
                        </div>
                    )}

                    {/* Render Main Sections (Experience, Projects, Custom) */}
                    {data.sections && data.sections.map(section => {
                        if (section.type === 'skills' || section.type === 'education') return null;
                        return renderSection(section);
                    })}

                    {/* Fallback Main */}
                    {(!data.sections || data.sections.length === 0) && (
                        <>
                            {data.experience && renderSection({ id: 'st-exp', type: 'experience', title: 'Experience', data: data.experience })}
                            {data.project && renderSection({ id: 'st-proj', type: 'project', title: 'Projects', data: data.project })}
                        </>
                    )}
                </div>

                {/* RIGHT COLUMN (Sidebar items) - 4 cols */}
                <div className="col-span-4 border-l pl-4" style={{ borderColor: '#eee' }}>

                    {/* Skills */}
                    {data.sections && data.sections.find(s => s.type === 'skills') && (
                        <div className="mb-4">
                            <h2 className="text-sm font-bold uppercase border-b mb-1 pb-0.5" style={{ borderColor: accentColor, color: accentColor }}>Skills</h2>
                            <div className="flex flex-wrap gap-1">
                                {data.sections.find(s => s.type === 'skills').data.map((skill, i) => (
                                    <span key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-semibold text-gray-700 border border-gray-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {data.sections && data.sections.map(section => {
                        if (section.type !== 'education') return null;
                        return renderSection(section);
                    })}

                    {/* Fallback Sidebar */}
                    {(!data.sections || data.sections.length === 0) && (
                        <>
                            {data.skills && (
                                <div className="mb-4">
                                    <h2 className="text-sm font-bold uppercase border-b mb-1 pb-0.5" style={{ borderColor: accentColor, color: accentColor }}>Skills</h2>
                                    <div className="flex flex-wrap gap-1">
                                        {data.skills.map((skill, i) => (
                                            <span key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-semibold text-gray-700 border border-gray-200">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {data.education && renderSection({ id: 'st-edu', type: 'education', title: 'Education', data: data.education })}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CompactTemplate;
