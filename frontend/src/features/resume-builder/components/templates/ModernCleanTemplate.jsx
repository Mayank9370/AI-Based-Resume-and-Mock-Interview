import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernCleanTemplate = ({ data, accentColor }) => {

  const SectionTitle = ({ children }) => (
    <div className="mb-1 mt-2 mr-2">
      <h2 className="text-sm font-bold tracking-wide text-gray-800 uppercase">
        {children}
      </h2>
      <div className="h-[1px] w-full mt-1" style={{ background: accentColor }}></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pt-3 pl-8 bg-white text-gray-900 leading-relaxed text-[13px]">

      {/* HEADER */}
      <header className="text-center">
        <h1 className="text-xl font-bold tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {/* CONTACT */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px] text-gray-700 mt-1">
          {data.personal_info?.email && (
            <span className="flex items-center gap-1"><Mail size={12} /> {data.personal_info.email}</span>
          )}
          {data.personal_info?.phone && (
            <span className="flex items-center gap-1"><Phone size={12} /> {data.personal_info.phone}</span>
          )}
          {data.personal_info?.location && (
            <span className="flex items-center gap-1"><MapPin size={12} /> {data.personal_info.location}</span>
          )}
          {data.personal_info?.linkedin && (
            <span className="flex items-center gap-1"><Linkedin size={12} /> {data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="flex items-center gap-1"><Globe size={12} /> {data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.professional_summary && (
        <>
          <SectionTitle>Summary</SectionTitle>
          <div
            className="text-gray-800 leading-snug resume-html-content"
            dangerouslySetInnerHTML={{ __html: data.professional_summary }}
          />
        </>
      )}

      {/* DYNAMIC SECTIONS */}
      {data.sections && data.sections.length > 0 ? (
        data.sections.map((section) => {
          const { type, title, data: items } = section;
          if (!items || items.length === 0) return null;

          if (type === "skills") {
            return (
              <div key={section.id}>
                <SectionTitle>{title}</SectionTitle>
                <ul className="list-disc ml-5 text-gray-800">
                  {items.map((skill, i) => <li key={i}>{skill}</li>)}
                </ul>
              </div>
            );
          }

          if (type === "experience") {
            return (
              <div key={section.id}>
                <SectionTitle>{title}</SectionTitle>
                <div className="space-y-3">
                  {items.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          <p className="font-semibold">{exp.company}</p>
                          <p className="text-gray-700 text-[13px]">{exp.position}</p>
                        </div>
                        <p className="text-[12px] text-gray-600 mr-2">
                          {exp.start_date} – {exp.is_current ? "Present" : exp.end_date}
                        </p>
                      </div>
                      {exp.description && (
                        <div
                          className="ml-5 mt-1 text-gray-800 text-sm resume-html-content"
                          dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (type === "project") {
            return (
              <div key={section.id}>
                <SectionTitle>{title}</SectionTitle>
                <div className="space-y-3">
                  {items.map((proj, i) => (
                    <div key={i}>
                      <div className="flex justify-between">
                        <p className="font-semibold">{proj.name}</p>
                        {proj.year && <p className="text-[12px] text-gray-600">{proj.year}</p>}
                      </div>
                      {proj.description && (
                        <div
                          className="ml-5 mt-1 text-gray-800 text-sm resume-html-content"
                          dangerouslySetInnerHTML={{ __html: proj.description }}
                        />
                      )}
                      {proj.bullets && proj.bullets.length > 0 && (
                        <ul className="list-disc ml-5 mt-1 text-gray-800">
                          {proj.bullets.map((b, idx) => b && <li key={idx}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          if (type === "education") {
            return (
              <div key={section.id}>
                <SectionTitle>{title}</SectionTitle>
                <div className="space">
                  {items.map((edu, i) => (
                    <div key={i}>
                      <div className="flex gap-2">
                        <p className="text-gray-800 font-semibold">{edu.institution} | </p>
                        <p className="">{edu.degree} | </p>
                        <p className="text-[12px] text-gray-600">{edu.graduation_date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          // CUSTOM / OTHER / CERTIFICATIONS
          return (
            <div key={section.id}>
              <SectionTitle>{title}</SectionTitle>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      {(item.title || item.heading) && <p className="font-semibold">{item.title || item.heading}</p>}
                      {(item.date || item.start_date) && <p className="text-[12px] text-gray-600">{item.date || item.start_date}</p>}
                    </div>
                    {(item.subtitle || item.subheading) && <p className="text-sm text-gray-700">{item.subtitle || item.subheading}</p>}

                    {item.description && (
                      <div
                        className="ml-5 mt-1 text-gray-800 text-sm resume-html-content"
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(item.description)
                            ? item.description.join('<br>')
                            : item.description
                        }}
                      />
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc ml-5 mt-1 text-gray-800">
                        {item.bullets.map((b, k) => b && <li key={k}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        /* FALLBACK IF NO SECTIONS (Old data) */
        <>
          {/* SKILLS */}
          {data.skills?.length > 0 && (
            <>
              <SectionTitle>Skills</SectionTitle>
              <ul className="list-disc ml-5 text-gray-800">
                {data.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </>
          )}
          {/* EXPERIENCE */}
          {data.experience?.length > 0 && (
            <>
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-3">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                        <p className="font-semibold">{exp.company} </p>
                        <p className="text-gray-700 text-[13px]">{exp.position}</p>
                      </div>
                      <p className="text-[12px] text-gray-600 mr-2">
                        {exp.start_date} – {exp.is_current ? "Present" : exp.end_date}
                      </p>
                    </div>
                    {exp.description && (
                      <div
                        className="ml-5 mt-1 text-gray-800 text-sm resume-html-content"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {/* PROJECTS */}
          {data.project?.length > 0 && (
            <>
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-3">
                {data.project.map((proj, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <p className="font-semibold">{proj.name}</p>
                      {proj.year && <p className="text-[12px] text-gray-600">{proj.year}</p>}
                    </div>
                    {proj.description && (
                      <div
                        className="ml-5 mt-1 text-gray-800 text-sm resume-html-content"
                        dangerouslySetInnerHTML={{ __html: proj.description }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

    </div>
  );
};

export default ModernCleanTemplate;
