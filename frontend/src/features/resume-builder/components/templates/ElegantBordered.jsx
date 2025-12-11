const ElegantBordered = ({ data, accentColor }) => {
  return (
    <div
      className="max-w-4xl mx-auto p-8 bg-white border rounded-xl text-gray-800"
      style={{ borderColor: accentColor }}
    >
      {/* Header */}
      <header className="mb-6 pb-4 border-b" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {data.personal_info.full_name}
        </h1>
        <p className="text-gray-600">{data.professional_title}</p>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="font-semibold text-lg mb-2" style={{ color: accentColor }}>
            Profile
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
        </section>
      )}

      {/* DYNAMIC SECTIONS */}
      {data.sections && data.sections.length > 0 ? (
        data.sections.map((section) => {
          const { type, title, data: items } = section;
          if (!items || items.length === 0) return null;

          if (type === "experience") {
            return (
              <section key={section.id} className="mb-6">
                <h2 className="font-semibold text-lg mb-3" style={{ color: accentColor }}>
                  {title}
                </h2>
                {items.map((exp, i) => (
                  <div key={i} className="mb-4 border-l pl-4" style={{ borderColor: accentColor }}>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                    <p className="text-sm text-gray-600">
                      {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                    </p>
                    {exp.description && <p className="text-gray-700 mt-2 whitespace-pre-line">{exp.description}</p>}
                  </div>
                ))}
              </section>
            );
          }

          if (type === "skills") {
            return (
              <section key={section.id} className="mb-6">
                <h2 className="font-semibold text-lg mb-2" style={{ color: accentColor }}>
                  {title}
                </h2>
                <div className="flex gap-3 flex-wrap text-gray-700">
                  {items.map((skill, i) => (
                    <span key={i}>• {skill}</span>
                  ))}
                </div>
              </section>
            );
          }

          if (type === "education") {
            return (
              <section key={section.id} className="mb-6">
                <h2 className="font-semibold text-lg mb-2" style={{ color: accentColor }}>
                  {title}
                </h2>
                {items.map((edu, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.graduation_date}</p>
                  </div>
                ))}
              </section>
            );
          }

          if (type === "project") {
            return (
              <section key={section.id} className="mb-6">
                <h2 className="font-semibold text-lg mb-2" style={{ color: accentColor }}>
                  {title}
                </h2>
                {items.map((proj, i) => (
                  <div key={i} className="mb-4 border-l pl-4" style={{ borderColor: accentColor }}>
                    <h3 className="font-semibold">{proj.name}</h3>
                    {proj.description && <p className="text-gray-700 mt-1 whitespace-pre-line">{proj.description}</p>}
                    {proj.bullets && proj.bullets.length > 0 && (
                      <ul className="list-disc ml-4 text-gray-700 text-sm mt-1">
                        {proj.bullets.map((b, k) => b && <li key={k}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )
          }

          // Custom / Other
          return (
            <section key={section.id} className="mb-6">
              <h2 className="font-semibold text-lg mb-2" style={{ color: accentColor }}>
                {title}
              </h2>
              {items.map((item, i) => (
                <div key={i} className="mb-4 border-l pl-4" style={{ borderColor: accentColor }}>
                  {(item.title || item.heading) && <h3 className="font-semibold">{item.title || item.heading}</h3>}
                  {(item.subtitle || item.subheading) && <p className="text-gray-700 text-sm">{item.subtitle || item.subheading}</p>}
                  {(item.date || item.start_date) && <p className="text-gray-600 text-xs">{item.date || item.start_date}</p>}

                  {item.description && (
                    <div className="text-gray-700 mt-1 whitespace-pre-line">
                      {Array.isArray(item.description)
                        ? <ul className="list-disc ml-4">{item.description.map((d, k) => <li key={k}>{d}</li>)}</ul>
                        : item.description
                      }
                    </div>
                  )}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="list-disc ml-4 text-gray-700 text-sm mt-1">
                      {item.bullets.map((b, k) => b && <li key={k}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          );
        })
      ) : (
        /* FALLBACK */
        <>
          {data.experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-3" style={{ color: accentColor }}>
                Work Experience
              </h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-4 border-l pl-4" style={{ borderColor: accentColor }}>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-sm text-gray-600">
                    {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                  </p>
                  <p className="text-gray-700 mt-2 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </section>
          )}
          {data.skills?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-semibold text-lg mb-2" style={{ color: accentColor }}>
                Skills
              </h2>
              <div className="flex gap-3 flex-wrap text-gray-700">
                {data.skills.map((skill, i) => (
                  <span key={i}>• {skill}</span>
                ))}
              </div>
            </section>
          )}
          {data.education?.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg mb-2" style={{ color: accentColor }}>
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-600">{edu.graduation_date}</p>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default ElegantBordered;
