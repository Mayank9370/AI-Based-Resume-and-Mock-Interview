import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const renderDynamicSection = (section) => {
        const { title, type, data: items } = section;

        if (!items || items.length === 0) return null;

        return (
            <section key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                    {title.toUpperCase()}
                </h2>

                {/* ---- SKILLS ---- */}
                {type === "skills" && (
                    <div className="flex gap-3 flex-wrap">
                        {items.map((skill, i) => (
                            <span key={i} className="text-gray-700">• {skill}</span>
                        ))}
                    </div>
                )}

                {/* ---- PROJECTS ---- */}
                {type === "project" && (
                    <div className="space-y-4">
                        {items.map((proj, i) => (
                            <div key={i} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            {proj.name}
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-blue-600 hover:underline">
                                                    [Link]
                                                </a>
                                            )}
                                        </h3>
                                        {proj.role && <p className="font-medium text-gray-700">{proj.role}</p>}
                                        {proj.tech && <p className="text-sm text-gray-600 italic">Tech: {proj.tech}</p>}
                                    </div>
                                    {(proj.start_date || proj.end_date) && (
                                        <p className="text-sm text-gray-600">
                                            {formatDate(proj.start_date)} - {proj.is_current ? "Present" : formatDate(proj.end_date)}
                                        </p>
                                    )}
                                </div>

                                {proj.description && (
                                    <div className="text-gray-700 leading-relaxed mt-1 resume-html-content" dangerouslySetInnerHTML={{ __html: proj.description }} />
                                )}

                                {proj.bullets && proj.bullets.length > 0 && proj.bullets.some(b => b.trim()) && (
                                    <ul className="list-disc list-outside ml-4 mt-2 text-gray-700">
                                        {proj.bullets.filter(b => b.trim()).map((b, idx) => (
                                            <li key={idx}>{b}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* ---- EXPERIENCE ---- */}
                {type === "experience" && (
                    <div className="space-y-4">
                        {items.map((exp, i) => (
                            <div key={i} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold">{exp.position}</h3>
                                        <p className="text-gray-700">{exp.company}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </p>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 resume-html-content" dangerouslySetInnerHTML={{ __html: exp.description }} />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* ---- EDUCATION ---- */}
                {type === "education" && (
                    <div className="space-y-4">
                        {items.map((edu, i) => (
                            <div key={i} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                                <p className="text-sm text-gray-600">
                                    {formatDate(edu.graduation_date)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* ---- CUSTOM SECTIONS ---- */}
                {/* ---- CUSTOM SECTIONS ---- */}
                {(type === "custom" || type === "other") && (
                    <div className="space-y-4">
                        {items.map((item, i) => (
                            <div key={i} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                {(item.heading || item.title) && (
                                    <h3 className="font-semibold text-gray-900">{item.title || item.heading}</h3>
                                )}
                                {(item.subheading || item.subtitle) && (
                                    <p className="font-medium text-gray-700">{item.subheading || item.subtitle}</p>
                                )}

                                {item.description && (
                                    <div className="text-gray-700 resume-html-content" dangerouslySetInnerHTML={{
                                        __html: Array.isArray(item.description)
                                            ? item.description.join('<br>')
                                            : item.description
                                    }} />
                                )}

                                {item.bullets && item.bullets.length > 0 && item.bullets.some(b => b.trim()) && (
                                    <ul className="list-disc list-outside ml-4 mt-2 text-gray-700">
                                        {item.bullets.filter(b => b.trim()).map((b, idx) => (
                                            <li key={idx}>{b}</li>
                                        ))}
                                    </ul>
                                )}

                                {(item.start_date || item.end_date || item.date) && (
                                    <p className="text-sm text-gray-600">
                                        {item.date ? item.date : `${formatDate(item.start_date)} - ${item.is_current ? "Present" : formatDate(item.end_date)}`}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">

            {/* ---- HEADER ---- */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.personal_info?.profession && (
                    <p className="text-xl text-gray-600 mb-2 font-medium">{data.personal_info.profession}</p>
                )}

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" /><span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" /><span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" /><span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-4" /><span>{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" /><span>{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* ---- SUMMARY ---- */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <div className="text-gray-700 resume-html-content" dangerouslySetInnerHTML={{ __html: data.professional_summary }} />
                </section>
            )}

            {/* ---- STATIC FIELDS (only if old data still exists) ---- */}
            {data.experience && renderDynamicSection({ id: "static-exp", title: "Experience", type: "experience", data: data.experience })}
            {data.project && renderDynamicSection({ id: "static-proj", title: "Projects", type: "project", data: data.project })}
            {data.education && renderDynamicSection({ id: "static-edu", title: "Education", type: "education", data: data.education })}
            {data.skills && renderDynamicSection({ id: "static-skill", title: "Skills", type: "skills", data: data.skills })}

            {/* ---- DYNAMIC SECTIONS ---- */}
            {data.sections && data.sections.length > 0 && data.sections.map(renderDynamicSection)}

        </div>
    );
};

export default ClassicTemplate;
