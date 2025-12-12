import { Plus, Trash2, FolderGit2, Link as LinkIcon, Calendar, Briefcase, Code2 } from "lucide-react";
import React, { useEffect } from "react";
import RichTextEditor from './RichTextEditor';
import ValidatedInput from './ValidatedInput';

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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
        <p className="text-slate-500 mt-1">Showcase your work, personal projects, or contributions.</p>
      </div>

      <div className="space-y-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:border-blue-200 hover:shadow-sm transition-all group"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-slate-700 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                {project.name || "New Project"}
              </h4>
              <button
                onClick={() => removeProject(index)}
                className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove Project"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <ValidatedInput
                label="Project Name"
                value={project.name}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                placeholder="e.g. E-Commerce Platform"
                startIcon={FolderGit2}
              />

              <ValidatedInput
                label="Project Type"
                value={project.type}
                onChange={(e) => updateProject(index, "type", e.target.value)}
                placeholder="e.g. Personal, Freelance, Academic"
                startIcon={Briefcase}
              />

              <ValidatedInput
                label="Your Role"
                value={project.role}
                onChange={(e) => updateProject(index, "role", e.target.value)}
                placeholder="e.g. Lead Developer"
                startIcon={Briefcase}
              />

              <ValidatedInput
                label="Tech Stack"
                value={project.tech}
                onChange={(e) => updateProject(index, "tech", e.target.value)}
                placeholder="e.g. React, Node.js, MongoDB"
                startIcon={Code2}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <ValidatedInput
                label="Start Date"
                value={project.start_date}
                type="date"
                onChange={(e) => updateProject(index, "start_date", e.target.value)}
                startIcon={Calendar}
              />

              <div className="space-y-2">
                {!project.is_current && (
                  <ValidatedInput
                    label="End Date"
                    value={project.end_date}
                    type="date"
                    onChange={(e) => updateProject(index, "end_date", e.target.value)}
                    startIcon={Calendar}
                  />
                )}
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer w-fit ml-1 mt-2">
                  <input
                    type="checkbox"
                    checked={project.is_current || false}
                    onChange={(e) => updateProject(index, "is_current", e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Ongoing Project
                </label>
              </div>
            </div>

            <div className="mb-5">
              <ValidatedInput
                label="Project Link"
                value={project.link}
                type="url"
                onChange={(e) => updateProject(index, "link", e.target.value)}
                placeholder="https://github.com/username/project"
                startIcon={LinkIcon}
              />
            </div>

            {/* Summary */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Description</label>
              <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all bg-white">
                <RichTextEditor
                  value={project.description || ""}
                  onChange={(value) => updateProject(index, "description", value)}
                  placeholder="Briefly describe what this project does and your contribution..."
                />
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700">Key Achievements / Features</label>

              {project.bullets.map((bullet, bIndex) => (
                <div key={bIndex} className="flex gap-2 group/bullet">
                  <ValidatedInput
                    value={bullet}
                    onChange={(e) => updateBullet(index, bIndex, e.target.value)}
                    placeholder="• Improved performance by 50%..."
                    className="flex-1"
                  />
                  <button
                    onClick={() => removeBullet(index, bIndex)}
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors self-start mt-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <button
                onClick={() => addBullet(index)}
                className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 mt-2"
              >
                <Plus size={16} /> Add Achievement
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addProject}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 mt-6"
      >
        <Plus size={20} /> Add Another Project
      </button>
    </div>
  );
};

export default ProjectForm;
