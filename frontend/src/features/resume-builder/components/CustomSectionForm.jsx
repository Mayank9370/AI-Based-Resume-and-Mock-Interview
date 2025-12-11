import React from "react";
import { Plus, Trash } from "lucide-react";

const CustomSectionForm = ({ section, onChange }) => {
  const items = section.data || [];

  const updateItem = (index, key, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    onChange(updated);
  };

  const addItem = () => {
    onChange([...(items || []), { title: "", subtitle: "", description: "" }]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        {section.label || section.type}
      </h3>

      {items.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-4 bg-gray-50 relative"
        >
          <button
            onClick={() => removeItem(index)}
            className="absolute right-2 top-2 text-red-500"
          >
            <Trash size={16} />
          </button>

          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-3"
            value={item.title}
            onChange={(e) => updateItem(index, "title", e.target.value)}
            placeholder="Certificate Name, Language, etc."
          />

          <label className="block text-sm font-medium">Subtitle</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-3"
            value={item.subtitle}
            onChange={(e) => updateItem(index, "subtitle", e.target.value)}
            placeholder="Issuer, Level, Organization"
          />

          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={item.description}
            onChange={(e) => updateItem(index, "description", e.target.value)}
            placeholder="Brief description"
            rows={3}
          />
        </div>
      ))}

      <button
        onClick={addItem}
        className="flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        <Plus size={16} /> Add Item
      </button>
    </div>
  );
};

export default CustomSectionForm;