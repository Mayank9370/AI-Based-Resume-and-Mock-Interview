import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ProfessionalTwoColumn = ({ data, accentColor }) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 bg-white shadow p-0">

      {/* LEFT SIDEBAR */}
      <aside
        className="col-span-1 p-6 text-white"
        style={{ background: accentColor }}
      >
        <h1 className="text-2xl font-bold mb-2">{data.personal_info?.full_name}</h1>
        <p className="opacity-90 mb-6">{data.professional_title}</p>

        <div className="space-y-2 text-sm">
          {data.personal_info?.email && <p><Mail size={14} /> {data.personal_info.email}</p>}
          {data.personal_info?.phone && <p><Phone size={14} /> {data.personal_info.phone}</p>}
          {data.personal_info?.location && <p><MapPin size={14} /> {data.personal_info.location}</p>}
        </div>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-2">Skills</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="col-span-2 p-8">

        {/* Summary */}
        {data.professional_summary && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>Summary</h2>
            <div className="text-gray-700 resume-html-content" dangerouslySetInnerHTML={{ __html: data.professional_summary }} />
          </section>
        )}

        {/* Dynamic Sections */}
        {data.sections && data.sections.length > 0 ? (
          data.sections.map((section) => {
            if (section.type === "skills" || section.type === "personal_info") return null; // handled in sidebar
            const { type, title, data: items } = section;
            if (!items || items.length === 0) return null;

            return (
              <section key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>{title}</h2>
                {items.map((item, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between">
                      {(item.position || item.name || item.degree || item.heading || item.title) && (
                        <h3 className="font-semibold">{item.position || item.name || item.degree || item.heading || item.title}</h3>
                      )}
                      {(item.start_date || item.date || item.graduation_date) && (
                        <p className="text-sm text-gray-600">
                          {item.date ? item.date : item.graduation_date ? item.graduation_date : `${item.start_date} - ${item.is_current ? "Present" : item.end_date}`}
                        </p>
                      )}
                    </div>
                    {(item.company || item.institution || item.subheading || item.subtitle) && (
                      <p className="text-gray-700">{item.company || item.institution || item.subheading || item.subtitle}</p>
                    )}
                    {item.description && (
                      <div className="text-gray-700 mt-1 resume-html-content" dangerouslySetInnerHTML={{
                        __html: Array.isArray(item.description) ? item.description.join('<br>') : item.description
                      }} />
                    )}
                  </div>
                ))}
              </section>
            )
          })
        ) : (
          <>
            {/* Fallback */}
            {data.experience && data.experience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>Experience</h2>
                {data.experience.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.start_date} - {exp.is_current ? "Present" : exp.end_date}</p>
                    </div>
                    <p className="text-gray-700">{exp.company}</p>
                    <div className="text-gray-700 mt-1 resume-html-content" dangerouslySetInnerHTML={{ __html: exp.description }} />
                  </div>
                ))}
              </section>
            )}

            {data.education && data.education.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>Education</h2>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-2">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.graduation_date}</p>
                  </div>
                ))}
              </section>
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default ProfessionalTwoColumn;
