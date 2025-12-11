const ExecutiveTemplate = ({ data, accentColor }) => {
  return (
    <div className="max-w-4xl mx-auto p-10 bg-white text-gray-800">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold" style={{ color: accentColor }}>
          {data.personal_info.full_name}
        </h1>
        <p className="text-lg text-gray-600">{data.professional_title}</p>

        <div className="mt-4 grid grid-cols-3 text-sm text-gray-700">
          <p>{data.personal_info.email}</p>
          <p>{data.personal_info.phone}</p>
          <p>{data.personal_info.location}</p>
        </div>
      </header>

      {/* Executive Summary */}
      {data.professional_summary && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
            Executive Summary
          </h2>
          <div
            className="leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: data.professional_summary }}
          />
        </section>
      )}

      {/* DYNAMIC SECTIONS */}
      {data.sections && data.sections.length > 0 ? (
        data.sections.map((section) => {
          const { type, title, data: items } = section;
          if (!items || items.length === 0) return null;

          if (type === "experience") {
            return (
              <section key={section.id} className="mb-10">
                <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                  {title}
                </h2>
                {items.map((exp, i) => (
                  <div key={i} className="mb-6">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.start_date} - {exp.is_current ? "Present" : exp.end_date}</p>
                    </div>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                    {exp.description && (
                      <div
                        className="text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                ))}
              </section>
            );
          }

          if (type === "education") {
            return (
              <section key={section.id} className="mb-10">
                <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                  {title}
                </h2>
                {items.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-sm text-gray-600">{edu.graduation_date}</p>
                  </div>
                ))}
              </section>
            );
          }

          if (type === "skills") {
            return (
              <section key={section.id} className="mb-10">
                <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                  {title}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded text-gray-700 text-sm">{skill}</span>
                  ))}
                </div>
              </section>
            );
          }

          if (type === "project") {
            return (
              <section key={section.id} className="mb-10">
                <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                  {title}
                </h2>
                {items.map((proj, i) => (
                  <div key={i} className="mb-6">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{proj.name}</h3>
                      {proj.year && <p className="text-sm text-gray-600">{proj.year}</p>}
                    </div>
                    {proj.description && (
                      <div
                        className="text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{ __html: proj.description }}
                      />
                    )}
                    {proj.bullets && proj.bullets.length > 0 && (
                      <ul className="list-disc ml-5 mt-1 text-gray-700">
                        {proj.bullets.map((b, k) => b && <li key={k}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            );
          }

          // Custom / Other
          return (
            <section key={section.id} className="mb-10">
              <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                {title}
              </h2>
              {items.map((item, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between">
                    {(item.heading || item.title) && <h3 className="font-semibold text-lg">{item.heading || item.title}</h3>}
                    {(item.date || item.start_date) && <p className="text-sm text-gray-600">{item.date || item.start_date}</p>}
                  </div>
                  {(item.subheading || item.subtitle) && <p className="text-gray-700 font-medium">{item.subheading || item.subtitle}</p>}

                  {item.description && (
                    <div
                      className="text-gray-700 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(item.description)
                          ? item.description.join('<br>')
                          : item.description
                      }}
                    />
                  )}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="list-disc ml-5 mt-1 text-gray-700">
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
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                Leadership Experience
              </h2>

              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg">{exp.position}</h3>
                    <p className="text-sm text-gray-600">{exp.start_date} - {exp.is_current ? "Present" : exp.end_date}</p>
                  </div>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                  {exp.description && (
                    <div
                      className="text-gray-700 mt-2"
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  )}
                </div>
              ))}
            </section>
          )}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: accentColor }}>
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
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

export default ExecutiveTemplate;
