// import {Plus, X } from 'lucide-react'
// import React, { useState } from 'react'
// import toast from 'react-hot-toast'

// const SkillsForm = ({ data, onChange }) => {

//   const [newSkill, setNewSkill] = useState("")

//   const addSkill = () => {
//     try {
//       if (newSkill.trim() && !data.includes(newSkill.trim())) {
//         onChange([...data, newSkill.trim()])
//         setNewSkill("")          // FIXED
//       } else {
//         toast.error("Skill already exists or is empty")
//       }
//     } catch (error) {
//       toast.error("Something went wrong")
//     }
//   }

//   const deleSkill = (indexToDelete) => {
//     try {
//       onChange(data.filter((_, index) => index !== indexToDelete))
//       toast.success('Skill deleted')
//     } catch (error) {
//       toast.error("Something went wrong")
//     }
//   }

//   const handlePressKey = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       addSkill();
//     }
//   }

//   return (
//     <div className='space-y-4'>
//       <h1 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
//         Skills Section
//       </h1>

//       <p className='text-sm text-gray-500'>
//         Add your technical abilities and personal strengths
//       </p>

//       <div className='flex flex-col gap-1'>
//         <label className='text-sm font-semibold'>Enter Your Skills</label>

//         <input
//           onChange={(e) => setNewSkill(e.target.value)}   // FIXED
//           value={newSkill}
//           type='text'
//           placeholder='e.g Frontend - HTML, CSS, JS, React'
//           className='w-full p-1 text-sm'
//           onKeyDown={handlePressKey}
//         />

//         <div className='flex item-center justify-center'>
//           <button
//             onClick={addSkill}
//             disabled={!newSkill.trim()}
//             className='flex items-center mt-2 gap-2 px-4 py-2 text-sm w-20 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
//           >
//             <Plus className="size-6" /> Add
//           </button>
//         </div>
//       </div>

//       {data.length > 0 && (
//         <div className='flex flex-wrap gap-2'>
//           {data.map((skill, index) => (
//             <span key={index} className='flex items-center justify-center cursor-pointer  px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
//               <button onClick={() => deleSkill(index)}>
//                 <X className='w-5 h-5 text-red-600' />
//               </button>

//               {skill}
//             </span>
//           ))}
//         </div>
//       )}

//     </div>
//   )
// }

// export default SkillsForm


import React from "react";
import { Plus, X, GripVertical } from "lucide-react";
import ValidatedInput from "./ValidatedInput";

const SkillsForm = ({ data = [], onChange }) => {
  const handleChange = (index, value) => {
    const newData = [...data];
    newData[index] = value;
    onChange(newData);
  };

  const addSkill = () => {
    onChange([...data, ""]);
  };

  const removeSkill = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="border-b border-slate-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800">Skills</h2>
        <p className="text-slate-500 mt-1">Highlight your technical strengths and core competencies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((skill, index) => (
          <div key={index} className="relative group flex items-center gap-2">
            <ValidatedInput
              value={skill}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="e.g. React.js"
              className="flex-1"
            />
            <button
              onClick={() => removeSkill(index)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addSkill}
        className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100"
      >
        <Plus size={18} />
        Add Skill
      </button>
    </div>
  );
};

export default SkillsForm;
