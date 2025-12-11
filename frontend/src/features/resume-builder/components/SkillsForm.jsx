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


import React, { useState } from "react";

const SkillsForm = ({ data = [], onChange }) => {
  const [skill, setSkill] = useState("");

  const addSkill = () => {
    if (!skill.trim()) return;
    onChange([...data, skill]);
    setSkill("");
  };

  const removeSkill = (i) => {
    onChange(data.filter((_, idx) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Add Skill</label>
        <div className="flex gap-2 mt-2">
          <input
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="flex-1 border px-3 py-2 rounded text-sm"
            placeholder="e.g. React"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
          >
            Add
          </button>
        </div>
      </div>

      {/* Skill List */}
      <div className="flex flex-wrap gap-2">
        {data.map((s, i) => (
          <div
            key={i}
            className="bg-blue-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {s}
            <button onClick={() => removeSkill(i)} className="text-red-500">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
