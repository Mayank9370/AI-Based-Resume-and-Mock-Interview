import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

/**
 * CreativeTemplate
 * A modern, colorful template with a distinct header and sidebar.
 */
const CreativeTemplate = ({ data, accentColor }) => {
    // Helper to format dates
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    // Helper to render sections dynamically
    const renderSection = (section) => {
        const { type, title, data: items } = section;
        if (!items || items.length === 0) return null;

        // Skip sidebar items if they appear in main flow (optional decision)
        if (type === 'skills' || type === 'personal_info') return null;

        return (
            <section key={section.id} className="mb-8">
                <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3" style={{ backgroundColor: accentColor }}>
                        {title.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                        {title}
                    </h2>
                </div>

                <div className="border-l-2 pl-6 ml-4" style={{ borderColor: accentColor + '40' }}>
                    {items.map((item, i) => (
                        <div key={i} className="mb-6 relative">
                            {/* Timeline dot */}
                            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-white" style={{ borderColor: accentColor }}></div>

                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {item.position || item.name || item.heading || item.title || item.degree}
                                </h3>
                                {(item.date || item.start_date) && (
                                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                        {item.date || `${formatDate(item.start_date)} - ${item.is_current ? "Present" : formatDate(item.end_date)}`}
                                    </span>
                                )}
                            </div>

                            {(item.company || item.institution || item.subheading || item.subtitle) && (
                                <p className="text-md font-medium text-gray-600 mb-2">
                                    {item.company || item.institution || item.subheading || item.subtitle}
                                </p>
                            )}

                            {item.description && (
                                <div
                                    className="text-gray-700 leading-relaxed text-sm"
                                    dangerouslySetInnerHTML={{
                                        __html: Array.isArray(item.description)
                                            ? item.description.join('<br>')
                                            : item.description
                                    }}
                                />
                            )}

                            {item.bullets && item.bullets.length > 0 && (
                                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                                    {item.bullets.map((b, k) => b && <li key={k}>{b}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    return (
        <div className="max-w-5xl mx-auto flex min-h-[1000px] bg-white shadow-xl overflow-hidden font-sans">

            {/* LEFT SIDEBAR */}
            <aside className="w-1/3 text-white p-8 flex flex-col" style={{ backgroundColor: accentColor }}>

                {/* Profile Image (Optional) */}
                <div className="mb-8 text-center">
                    {data.personal_info?.image ? (
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-white overflow-hidden shadow-lg mb-4">
                            <img src={typeof data.personal_info.image === 'string' ? data.personal_info.image : URL.createObjectURL(data.personal_info.image)}
                                alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-24 h-24 mx-auto rounded-full border-2 border-white/50 flex items-center justify-center text-4xl font-bold bg-white/10 mb-6">
                            {data.personal_info?.full_name?.charAt(0) || "U"}
                        </div>
                    )}
                    <h1 className="text-2xl font-bold leading-tight mb-2">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="text-sm font-medium opacity-90 uppercase tracking-widest">
                        {data.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 text-sm mb-10">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-3 opacity-90">
                            <Mail size={16} /> <span className="break-all">{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-3 opacity-90">
                            <Phone size={16} /> <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-3 opacity-90">
                            <MapPin size={16} /> <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-3 opacity-90">
                            <Linkedin size={16} /> <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                </div>

                {/* Skills in Sidebar */}
                {data.skills?.length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-lg font-bold uppercase border-b border-white/30 pb-2 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* RIGHT MAIN CONTENT */}
            <main className="w-2/3 p-10 bg-gray-50 text-gray-800">
                {/* Summary */}
                {data.professional_summary && (
                    <div className="mb-10 p-6 bg-white rounded-lg shadow-sm border-l-4" style={{ borderColor: accentColor }}>
                        <h2 className="text-xl font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>Profile</h2>
                        <div
                            className="leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{ __html: data.professional_summary }}
                        />
                    </div>
                )}

                {/* Dynamic Content */}
                {data.sections && data.sections.map(renderSection)}

                {/* Fallback if no sections (Legacy Data) */}
                {(!data.sections || data.sections.length === 0) && (
                    <>
                        {data.experience && renderSection({ id: 'st-exp', type: 'experience', title: 'Experience', data: data.experience })}
                        {data.project && renderSection({ id: 'st-proj', type: 'project', title: 'Projects', data: data.project })}
                    </>
                )}
            </main>

        </div>
    );
};

export default CreativeTemplate;
