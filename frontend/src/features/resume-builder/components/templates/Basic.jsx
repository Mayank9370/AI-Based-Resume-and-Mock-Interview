import React from "react";

const Basic = ({ data }) => {
  return (
    <div className="p-8 w-[800px] mx-auto text-gray-900 leading-relaxed font-serif">

      {/* Header */}
      <h1 className="text-3xl font-bold tracking-wide">
        {data.name || "Your Name"}
      </h1>

      <div className="mt-1 text-sm text-gray-700">
        <span>Email: {data.email || "example@gmail.com"}</span> |
        <span className="ml-1">Portfolio: {data.portfolio || "yourportfolio.com"}</span> |
        <br />
        <span>LinkedIn: {data.linkedin || "linkedin.com/in/username"}</span> |
        <span className="ml-1">GitHub: {data.github || "github.com/username"}</span>
      </div>

      {/* DYNAMIC SECTIONS */}
      {data.sections && data.sections.length > 0 ? (
        data.sections.map((section) => {
          const { type, title, data: items } = section;
          if (!items || items.length === 0) return null;

          // Skills
          if (type === "skills") {
            return (
              <Section key={section.id} title={title}>
                <ul className="grid grid-cols-2 text-sm list-disc ml-4 gap-1">
                  {items.map((skill, i) => <li key={i}>{skill}</li>)}
                </ul>
              </Section>
            );
          }

          // Projects
          if (type === "project") {
            return (
              <Section key={section.id} title={title}>
                {items.map((project, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} className="text-xs text-blue-600 block mb-1">Link</a>
                    )}
                    {project.description && (
                      <p className="text-sm">{project.description}</p>
                    )}
                    {(project.bullets || project.points) && (
                      <ul className="list-disc ml-5 text-sm leading-snug">
                        {(project.bullets || project.points).map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </Section>
            );
          }

          // Education
          if (type === "education") {
            return (
              <Section key={section.id} title={title}>
                {items.map((edu, i) => (
                  <div key={i} className="mb-2 text-sm">
                    <b>{edu.degree}</b> — {edu.institution} {edu.graduation_date && `(${edu.graduation_date})`}
                  </div>
                ))}
              </Section>
            );
          }

          // Experience
          if (type === "experience") {
            return (
              <Section key={section.id} title={title}>
                {items.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between">
                      <b>{exp.position}</b>
                      <span className="text-xs">{exp.start_date} - {exp.is_current ? "Present" : exp.end_date}</span>
                    </div>
                    <div className="text-sm italic mb-1">{exp.company}</div>
                    <p className="text-sm whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </Section>
            );
          }

          // Custom / Other
          return (
            <Section key={section.id} title={title}>
              <ul className="text-sm list-disc ml-4">
                {items.map((item, i) => (
                  <li key={i}>
                    <div className="inline-block align-top">
                      {(item.title || item.heading) && <strong>{item.title || item.heading}</strong>}
                      {(item.subtitle || item.subheading) && <span> - {item.subtitle || item.subheading}</span>}

                      {item.description && (
                        <div className="block mt-1 text-gray-700 whitespace-pre-line text-sm">
                          {Array.isArray(item.description)
                            ? <ul>{item.description.map((d, k) => <li key={k}>{d}</li>)}</ul>
                            : item.description
                          }
                        </div>
                      )}
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="list-disc ml-5 mt-1 text-gray-800">
                          {item.bullets.map((b, k) => b && <li key={k}>{b}</li>)}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          );
        })
      ) : (
        /* FALLBACK */
        <>
          {/* SKILLS */}
          {data.skills && (
            <Section title="Skills">
              <ul className="grid grid-cols-2 text-sm list-disc ml-4 gap-1">
                {data.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </Section>
          )}
          {/* EXPERIENCE */}
          {data.experience && (
            <Section title="Experience">
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  <b>{exp.position}</b>
                  <div className="text-sm italic">{exp.company}</div>
                </div>
              ))}
            </Section>
          )}
          {/* PROJECTS */}
          {data.projects && (
            <Section title="Projects">
              {data.projects.map((project, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-semibold">{project.title}</h3>
                </div>
              ))}
            </Section>
          )}
        </>
      )}
    </div>
  );
};

/** Reusable Section Component */
const Section = ({ title, children }) => (
  <div className="mt-6">
    <h2 className="text-lg font-bold border-b mb-2 pb-1 tracking-wide">
      {title}
    </h2>
    {children}
  </div>
);

export default Basic;
