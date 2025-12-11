import React, { useState } from "react";
import { Plus, Trash, MoveVertical } from "lucide-react";

const SectionManager = ({ sections, onChange }) => {
  const [newSectionName, setNewSectionName] = useState("");

  const addSection = () => {
    if (!newSectionName.trim()) return;
    const id = newSectionName.toLowerCase().replace(/\s+/g, "_");

    const newSection = {
      type: id,
      label: newSectionName,
      data: []
    };

    onChange([...sections, newSection]);
    setNewSectionName("");
  };

  const removeSection = (index) => {
    onChange(sections.filter((_, i) => i !== index));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...sections];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    onChange(updated);
  };

  const moveDown = (index) => {
    if (index === sections.length - 1) return;
    const updated = [...sections];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    onChange(updated);
  };

  return (
    <div className="p-4 bg-white border rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Manage Sections</h3>

      {/* Existing Sections */}
      {sections.map((section, index) => (
        <div
          key={section.type}
          className="flex items-center justify-between border p-2 rounded mb-2 bg-gray-50"
        >
          <span>{section.label || section.type}</span>

          <div className="flex items-center gap-2">
            <button onClick={() => moveUp(index)}>
              <MoveVertical size={16} className="rotate-180" />
            </button>

            <button onClick={() => moveDown(index)}>
              <MoveVertical size={16} />
            </button>

            <button
              onClick={() => removeSection(index)}
              className="text-red-500"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      ))}

      {/* Add New Section */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          placeholder="e.g. Certificates, Languages"
        />

        <button
          onClick={addSection}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} /> Add
        </button>
      </div>
    </div>
  );
};

export default SectionManager;
