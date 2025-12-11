import { useEffect, useState } from "react";

const GenericSectionForm = ({ section, onChange }) => {
  const [value, setValue] = useState(section?.data ?? []);
  useEffect(() => setValue(section?.data ?? []), [section?.data]);

  const handleSave = () => onChange(value);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{section?.title || 'Custom Section'}</label>
      <textarea
        rows={8}
        className="w-full border rounded p-2 text-sm mb-4 font-mono"
        value={JSON.stringify(value, null, 2)}
        onChange={(e) => setValue(() => {
          try {
            return JSON.parse(e.target.value);
          } catch (err) {
            // keep as string until valid JSON
            return e.target.value;
          }
        })}
      />
      <div className="flex gap-2">
        <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded">Save Section</button>
        <button onClick={() => { setValue(section?.data ?? []); }} className="border py-2 px-4 rounded">Reset</button>
      </div>
    </div>
  );
};

export default GenericSectionForm;