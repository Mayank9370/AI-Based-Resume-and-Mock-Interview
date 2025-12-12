// import { GraduationCap, Plus, Trash2 } from 'lucide-react';
// import React from 'react'

// const EducationForm = ({ data, onChange }) => {

// const addEducation = () =>{
//     const newEducation = {
//         institution: "",
//         degree: "",
//         field: "",
//         graduation_date: "",
//         gpa: ""
//     };
//     onChange([...data, newEducation])
// }

// const removeEducation = (index)=>{
//     const updated = data.filter((_, i)=> i !== index);
//     onChange(updated)
// }

// const updateEducation = (index, field, value)=>{
//     const updated = [...data];
//     updated[index] = {...updated[index], [field]: value}
//     onChange(updated)
// }

//   return (
//     <div className='space-y-6'>
//       <div className='flex items-center justify-between'>
//         <div>
//             <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Education </h3>
//             <p className='text-sm text-gray-500'>Add your education details</p>
//         </div>
//         <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
//             <Plus className="size-4"/>
//             Add Education
//         </button>
//       </div>

//       {data.length === 0 ? (
//         <div className='text-center py-8 text-gray-500'>
//             <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
//             <p>No education added yet.</p>
//             <p className="text-sm">Click "Add Education" to get started.</p>
//         </div>
//       ): (
//         <div className='space-y-4'>
//             {data.map((education, index)=>(
//                 <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
//                     <div className='flex justify-between items-start'>
//                         <h4>Education #{index + 1}</h4>
//                         <button onClick={()=> removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors'>
//                             <Trash2 className="size-4"/>
//                         </button>
//                     </div>

//                     <div className='grid md:grid-cols-2 gap-3'>

//                         <input value={education.institution || ""} onChange={(e)=>updateEducation(index, "institution", e.target.value)} type="text" placeholder="Institution Name" className="px-3 py-2 text-sm"/>

//                         <input value={education.degree || ""} onChange={(e)=>updateEducation(index, "degree", e.target.value)} type="text" placeholder="Degree (e.g., Bachelor's, Master's)" className="px-3 py-2 text-sm"/>

//                         <input value={education.field || ""} onChange={(e)=>updateEducation(index, "field", e.target.value)} type="text" className="px-3 py-2 text-sm" placeholder="Field of Study"/>

//                         <input value={education.graduation_date || ""} onChange={(e)=>updateEducation(index, "graduation_date", e.target.value)} type="month" className="px-3 py-2 text-sm"/>
//                     </div>

//                     <input value={education.gpa || ""} onChange={(e)=>updateEducation(index, "gpa", e.target.value)} type="text" className="px-3 py-2 text-sm" placeholder="GPA (optional)"/>

//                 </div>
//             ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default EducationForm


import { GraduationCap, Plus, Trash2, Calendar, BookOpen } from 'lucide-react';
import ValidatedInput from './ValidatedInput';

const EducationForm = ({ data = [], onChange }) => {

  const addEducation = () => {
    onChange([
      ...data,
      {
        institution: "",
        degree: "",
        field: "",
        graduation_date: "",
        gpa: ""
      }
    ]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className='space-y-8 animate-in fade-in duration-500'>
      <div className='border-b border-slate-100 pb-6'>
        <h3 className='text-2xl font-bold text-slate-800'>Education</h3>
        <p className='text-slate-500 mt-1'>Add your academic background and qualifications.</p>
      </div>

      <div className='space-y-6'>
        {data.map((education, index) => (
          <div key={index} className='border border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:border-blue-200 hover:shadow-sm transition-all group'>
            <div className='flex justify-between items-center mb-6'>
              <h4 className='font-bold text-slate-700 flex items-center gap-2'>
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                {education.institution || "New Education"}
              </h4>
              <button
                onClick={() => removeEducation(index)}
                className='text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors'
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className='grid md:grid-cols-2 gap-5 mb-5'>
              <ValidatedInput
                label="Institution/University"
                placeholder='e.g. Stanford University'
                value={education.institution}
                onChange={(e) => updateEducation(index, "institution", e.target.value)}
                startIcon={GraduationCap}
              />

              <ValidatedInput
                label="Degree"
                placeholder="e.g. Bachelor's of Science"
                value={education.degree}
                onChange={(e) => updateEducation(index, "degree", e.target.value)}
                startIcon={BookOpen}
              />

              <ValidatedInput
                label="Field of Study"
                placeholder='e.g. Computer Science'
                value={education.field}
                onChange={(e) => updateEducation(index, "field", e.target.value)}
              />

              <ValidatedInput
                label="Graduation Date"
                type='month'
                value={education.graduation_date}
                onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                startIcon={Calendar}
              />
            </div>

            <ValidatedInput
              label="GPA (Optional)"
              placeholder='e.g. 3.8/4.0'
              value={education.gpa}
              onChange={(e) => updateEducation(index, "gpa", e.target.value)}
            />
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className='text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200'>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-300">
            <GraduationCap className="size-8" />
          </div>
          <p className="text-slate-500 font-medium">No education added yet</p>
        </div>
      )}

      <button
        onClick={addEducation}
        className='w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-semibold hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2'
      >
        <Plus size={20} /> Add Education
      </button>
    </div>
  );
};

export default EducationForm;
