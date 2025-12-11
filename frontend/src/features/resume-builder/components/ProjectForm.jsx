import { Plus, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import RichTextEditor from './RichTextEditor';

const emptyProject = {
  name: "",
  type: "",
  role: "",
  tech: "",
  start_date: "",
  end_date: "",
  is_current: false,
  link: "",
  description: "",
  bullets: [""],
};

const ProjectForm = ({ data = [], onChange }) => {

  // ✅ FIX: Always ensure at least one empty project exists
  useEffect(() => {
    if (!data || data.length === 0) {
      onChange([{ ...emptyProject }]);
    }
  }, [data]);

  const addProject = () => {
    onChange([...data, { ...emptyProject }]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated.length === 0 ? [{ ...emptyProject }] : updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const updateBullet = (index, bIndex, value) => {
    const updated = [...data];
    updated[index].bullets[bIndex] = value;
    onChange(updated);
  };

  const addBullet = (index) => {
    const updated = [...data];
    updated[index].bullets.push("");
    onChange(updated);
  };

  const removeBullet = (index, bIndex) => {
    const updated = [...data];
    updated[index].bullets = updated[index].bullets.filter(
      (_, i) => i !== bIndex
    );
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your projects</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-6 mt-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <h4 className="font-medium">Project #{index + 1}</h4>
              <button
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid gap-3">
              {/* Project Name */}
              <input
                value={project.name || ""}
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
                type="text"
                placeholder="Project Name"
                className="px-3 py-2 text-sm rounded-lg"
              />

              {/* Project Type */}
              <input
                value={project.type || ""}
                onChange={(e) =>
                  updateProject(index, "type", e.target.value)
                }
                type="text"
                placeholder="Project Type (Work / Personal / Academic)"
                className="px-3 py-2 text-sm rounded-lg"
              />

              {/* Role */}
              <input
                value={project.role || ""}
                onChange={(e) =>
                  updateProject(index, "role", e.target.value)
                }
                type="text"
                placeholder="Your Role (Developer, Lead, Collaborator...)"
                className="px-3 py-2 text-sm rounded-lg"
              />

              {/* Tech Stack */}
              <input
                value={project.tech || ""}
                onChange={(e) =>
                  updateProject(index, "tech", e.target.value)
                }
                type="text"
                placeholder="Tech Stack (React, Node, MongoDB...)"
                className="px-3 py-2 text-sm rounded-lg"
              />

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={project.start_date || ""}
                  type="date"
                  onChange={(e) =>
                    updateProject(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                />

                {!project.is_current && (
                  <input
                    value={project.end_date || ""}
                    type="date"
                    onChange={(e) =>
                      updateProject(index, "end_date", e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg"
                  />
                )}
              </div>

              {/* Ongoing */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={project.is_current || false}
                  onChange={(e) =>
                    updateProject(index, "is_current", e.target.checked)
                  }
                />
                Ongoing
              </label>

              {/* Link */}
              <input
                value={project.link || ""}
                onChange={(e) =>
                  updateProject(index, "link", e.target.value)
                }
                type="url"
                placeholder="GitHub / Live Demo URL"
                className="px-3 py-2 text-sm rounded-lg"
              />

              {/* Summary */}
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <RichTextEditor
                  value={project.description || ""}
                  onChange={(value) =>
                    updateProject(index, "description", value)
                  }
                  placeholder="Short summary of the project"
                />
              </div>

              {/* Bullet Points */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Key Achievements</p>

                {project.bullets.map((bullet, bIndex) => (
                  <div key={bIndex} className="flex gap-2">
                    <input
                      value={bullet || ""}
                      onChange={(e) =>
                        updateBullet(index, bIndex, e.target.value)
                      }
                      placeholder="• e.g. Improved page load speed by 40%"
                      className="flex-1 px-3 py-2 text-sm rounded-lg"
                    />
                    <button
                      onClick={() => removeBullet(index, bIndex)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addBullet(index)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Add Bullet
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
