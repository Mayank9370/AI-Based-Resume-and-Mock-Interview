import React from "react";
import RichTextEditor from './RichTextEditor';
import { Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";
import ValidatedInput from "./ValidatedInput";

const fieldConfig = {
  experience: {
    company: { label: "Company Name", placeholder: "e.g. Google" },
    position: { label: "Job Title", placeholder: "e.g. Senior Software Engineer" },
    start_date: { label: "Start Date", type: "month" },
    end_date: { label: "End Date", type: "month" },
    is_current: { label: "I currently work here", type: "checkbox" },
    description: { label: "Description", type: "richtext" }
  },
  project: {
    name: { label: "Project Name", placeholder: "e.g. E-commerce Platform" },
    tech: { label: "Technologies Used", placeholder: "e.g. React, Node.js, MongoDB" },
    link: { label: "Project Link", placeholder: "https://..." },
    description: { label: "Description", type: "richtext" }
  },
  education: {
    institution: { label: "Institution / University", placeholder: "e.g. Stanford University" },
    degree: { label: "Degree", placeholder: "e.g. Bachelor of Science" },
    field: { label: "Field of Study", placeholder: "e.g. Computer Science" },
    graduation_date: { label: "Graduation Date", type: "month" }
  },
  certifications: {
    name: { label: "Certification Name", placeholder: "e.g. AWS Certified Solutions Architect" },
    issuer: { label: "Issuing Organization", placeholder: "e.g. Amazon Web Services" },
    issue_date: { label: "Issue Date", type: "month" },
    credential_id: { label: "Credential ID", placeholder: "Optional" }
  },
  achievements: {
    title: { label: "Achievement Title", placeholder: "e.g. Hackathon Winner" },
    description: { label: "Description", type: "richtext" }
  },
  publications: {
    title: { label: "Publication Title", placeholder: "e.g. Advanced AI Algorithms" },
    publisher: { label: "Publisher", placeholder: "e.g. IEEE Journal" },
    year: { label: "Year", placeholder: "e.g. 2023" },
    link: { label: "Link", placeholder: "https://..." }
  },
  custom: {
    title: { label: "Item Title", placeholder: "e.g. Workshop on AI" },
    subtitle: { label: "Subtitle / Role / Organization", placeholder: "e.g. Speaker" },
    date: { label: "Date / Period", placeholder: "e.g. Jan 2023 - Present" },
    description: { label: "Description", type: "richtext" }
  },
};

const DynamicSectionForm = ({ section, onChange, onTitleChange }) => {
  if (!section) return null;

  const data = section.data || [];
  const type = section.type;
  const config = fieldConfig[type] || fieldConfig.custom;

  // Ensure data is always an array of objects
  const safeData = data.map((item) => {
    if (typeof item !== "object" || item === null) {
      return {}; // convert strings/nulls to objects
    }
    return item;
  });

  const handleItemChange = (index, key, value) => {
    const updated = [...safeData];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const addNewItem = () => {
    if (["skills", "languages", "interests"].includes(type)) {
      onChange([...safeData, ""]);
    } else {
      // Create empty object based on config
      onChange([...safeData, {}]);
    }
  };

  const removeItem = (index) => {
    const updated = safeData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveItem = (index, direction) => {
    const updated = [...safeData];
    const target = index + direction;
    if (target < 0 || target >= safeData.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    onChange(updated);
  };

  // Special handling for simple list types (Skills, etc.)
  if (["skills", "languages", "interests"].includes(type)) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-bold text-slate-800">{section.title || type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <p className="text-slate-500 mt-1">List your {type} here.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {safeData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm hover:border-blue-300 transition-all">
              <input
                type="text"
                value={item || ""}
                onChange={(e) => {
                  const updated = [...safeData];
                  updated[index] = e.target.value;
                  onChange(updated);
                }}
                className="bg-transparent outline-none min-w-[100px] text-slate-700 font-medium"
                placeholder={`e.g. ${type === 'languages' ? 'English' : 'Java'}`}
              />
              <button onClick={() => removeItem(index)} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange([...safeData, ""])}
            className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors font-medium"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Section Title Configuration (for Custom Sections) */}
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          {type === "custom" && onTitleChange ? (
            <input
              type="text"
              value={section.title || ""}
              onChange={(e) => onTitleChange(e.target.value)}
              className="bg-transparent border-b border-dashed border-slate-400 focus:border-blue-500 outline-none w-auto min-w-[200px]"
              placeholder="Custom Section Title"
            />
          ) : (
            section.title || type.charAt(0).toUpperCase() + type.slice(1)
          )}
        </h2>
        <p className="text-slate-500 mt-1">
          {type === "custom" ? "Define the content for this section." : `Add your ${type} details.`}
        </p>
      </div>

      {/* List of Items */}
      <div className="space-y-6">
        {safeData.map((item, index) => (
          <div key={index} className="bg-slate-50/50 border border-slate-200 shadow-sm rounded-2xl p-6 relative group transition-all hover:shadow-md hover:border-blue-200">
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button onClick={() => moveItem(index, -1)} className="p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-lg transition-all" disabled={index === 0} title="Move Up">
                <ArrowUp size={16} />
              </button>
              <button onClick={() => moveItem(index, 1)} className="p-2 text-slate-500 hover:bg-white hover:shadow-sm rounded-lg transition-all" disabled={index === safeData.length - 1} title="Move Down">
                <ArrowDown size={16} />
              </button>
              <button onClick={() => removeItem(index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete Item">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid gap-5">
              {Object.entries(config).map(([key, field]) => {
                // Checkbox special handling
                if (field.type === "checkbox") {
                  return (
                    <label key={key} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer w-fit select-none bg-white px-3 py-2 rounded-lg border border-slate-200">
                      <input
                        type="checkbox"
                        checked={item[key] || false}
                        onChange={(e) => handleItemChange(index, key, e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      {field.label}
                    </label>
                  );
                }

                // Rich Text Editor
                if (field.type === "richtext") {
                  return (
                    <div key={key}>
                      <label className="text-sm font-semibold text-slate-700 mb-2 block">{field.label}</label>
                      <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all bg-white">
                        <RichTextEditor
                          value={Array.isArray(item[key]) ? item[key].join('\n') : (item[key] || "")}
                          onChange={(val) => handleItemChange(index, key, val)}
                          placeholder={field.placeholder}
                        />
                      </div>
                    </div>
                  );
                }

                // Standard Inputs
                return (
                  <ValidatedInput
                    key={key}
                    label={field.label}
                    type={field.type || "text"}
                    value={item[key]}
                    onChange={(e) => handleItemChange(index, key, e.target.value)}
                    placeholder={field.placeholder}
                    className={field.type === "month" && key === "end_date" && item.is_current ? "opacity-50 pointer-events-none" : ""}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addNewItem}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={20} /> Add {type === 'custom' ? 'Item' : (type.charAt(0).toUpperCase() + type.slice(1))}
      </button>
    </div>
  );
};

export default DynamicSectionForm;
