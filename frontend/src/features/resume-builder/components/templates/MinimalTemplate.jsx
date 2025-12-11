
const MinimalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const renderSection = (section) => {
        const { type, title, data: items } = section;
        if (!items || items.length === 0) return null;

        return (
            <section key={section.id} className="mb-10">
                <h2 className="text-sm uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor }}>
                    {title}
                </h2>

                {/* EXPERIENCE & PROJECTS & CUSTOM */}
                {(type === "experience" || type === "project" || type === "custom" || type === "other" || type === "education") && (
                    <div className="space-y-6">
                        {items.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <div className="flex flex-col">
                                        {(item.position || item.name || item.heading || item.title || item.degree) && (
                                            <h3 className="text-lg font-medium">
                                                {item.position || item.name || item.heading || item.title || `${item.degree} ${item.field ? `in ${item.field}` : ''}`}
                                                {item.link && (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-blue-500 hover:underline">
                                                        [Link]
                                                    </a>
                                                )}
                                            </h3>
                                        )}
                                        {/* Project specific: Role & Tech */}
                                        {item.role && <span className="text-sm text-gray-600">{item.role}</span>}
                                        {item.tech && <span className="text-xs text-gray-500 italic">{item.tech}</span>}
                                    </div>

                                    {(item.start_date || item.date || item.graduation_date) && (
                                        <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                                            {item.date ? item.date : item.graduation_date ? formatDate(item.graduation_date) : `${formatDate(item.start_date)} - ${item.is_current ? "Present" : formatDate(item.end_date)}`}
                                        </span>
                                    )}
                                </div>
                                {(item.company || item.institution || item.subheading || item.subtitle) && (
                                    <p className="text-gray-600 mb-2">{item.company || item.institution || item.subheading || item.subtitle}</p>
                                )}

                                {item.description && (
                                    <div
                                        className="text-gray-700 leading-relaxed text-sm mt-1"
                                        dangerouslySetInnerHTML={{
                                            __html: Array.isArray(item.description)
                                                ? item.description.join('<br>')
                                                : item.description
                                        }}
                                    />
                                )}

                                {/* Bullets for Projects */}
                                {item.bullets && item.bullets.length > 0 && item.bullets.some(b => b.trim()) && (
                                    <ul className="list-disc list-outside ml-4 mt-2 text-sm text-gray-700">
                                        {item.bullets.map((b, i) => b && b.trim() && <li key={i}>{b}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* SKILLS */}
                {type === "skills" && (
                    <div className="text-gray-700">
                        {items.join(" • ")}
                    </div>
                )}
            </section>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-thin mb-4 tracking-wide">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    {data.personal_info?.email && <span>{data.personal_info.email}</span>}
                    {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <span className="break-all">{data.personal_info.linkedin}</span>
                    )}
                    {data.personal_info?.website && (
                        <span className="break-all">{data.personal_info.website}</span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: data.professional_summary }}
                    />
                </section>
            )}

            {/* DYNAMIC SECTIONS */}
            {data.sections && data.sections.length > 0 ? (
                data.sections.map(section => renderSection(section))
            ) : (
                <>
                    {/* Fallback */}
                    {data.experience && renderSection({ id: "st-exp", type: "experience", title: "Experience", data: data.experience })}
                    {data.project && renderSection({ id: "st-proj", type: "project", title: "Projects", data: data.project })}
                    {data.education && renderSection({ id: "st-edu", type: "education", title: "Education", data: data.education })}
                    {data.skills && renderSection({ id: "st-skills", type: "skills", title: "Skills", data: data.skills })}
                </>
            )}
        </div>
    );
}

export default MinimalTemplate;