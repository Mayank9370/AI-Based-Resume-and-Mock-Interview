import React from "react";
import RichTextEditor from './RichTextEditor';
import { Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";

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
      <div className="space-y-4">
        {section.title && <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>}
        <div className="flex flex-wrap gap-2">
          {safeData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg shadow-sm">
              <input
                type="text"
                value={item || ""}
                onChange={(e) => {
                  const updated = [...safeData];
                  updated[index] = e.target.value;
                  onChange(updated);
                }}
                className="bg-transparent outline-none min-w-[100px]"
                placeholder={`e.g. ${type === 'languages' ? 'English' : 'Java'}`}
              />
              <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={() => onChange([...safeData, ""])}
            className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Section Title Configuration (for Custom Sections) */}
      {type === "custom" && onTitleChange && (
        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
          <label className="block text-sm font-semibold text-blue-900 mb-2">
            Section Title
          </label>
          <input
            type="text"
            value={section.title || ""}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full border border-blue-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-medium"
            placeholder="e.g., Certifications, Languages, Awards"
          />
          <p className="text-xs text-blue-600 mt-2 opacity-80">
            This will be the heading on your resume.
          </p>
        </div>
      )}

      {/* List of Items */}
      {safeData.map((item, index) => (
        <div key={index} className="bg-white border text-card-foreground shadow-sm rounded-xl p-6 relative group transition-all hover:shadow-md">
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button onClick={() => moveItem(index, -1)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md" disabled={index === 0} title="Move Up">
              <ArrowUp size={16} />
            </button>
            <button onClick={() => moveItem(index, 1)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md" disabled={index === safeData.length - 1} title="Move Down">
              <ArrowDown size={16} />
            </button>
            <button onClick={() => removeItem(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md" title="Delete Item">
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid gap-5">
            {Object.entries(config).map(([key, field]) => {
              // Checkbox special handling
              if (field.type === "checkbox") {
                return (
                  <label key={key} className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer w-fit select-none">
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
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">{field.label}</label>
                    <RichTextEditor
                      value={Array.isArray(item[key]) ? item[key].join('\n') : (item[key] || "")}
                      onChange={(val) => handleItemChange(index, key, val)}
                      placeholder={field.placeholder}
                    />
                  </div>
                );
              }

              // Standard Inputs
              return (
                <div key={key}>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    value={item[key] || ""}
                    onChange={(e) => handleItemChange(index, key, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400"
                    placeholder={field.placeholder}
                    disabled={field.type === "month" && key === "end_date" && item.is_current}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={addNewItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={18} /> Add {type === 'custom' ? 'Item' : (type.charAt(0).toUpperCase() + type.slice(1))}
      </button>
    </div>
  );
};

export default DynamicSectionForm;
