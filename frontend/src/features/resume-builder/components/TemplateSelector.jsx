import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'
import { templates } from '../constants/templates'

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  /* import { templates } from '../constants/templates' - importing at top of file */
  /* Using imported templates instead of local definition */

  return (
    <div className='relative'>
      <button onClick={() => setIsOpen(!isOpen)} className='text-blue-600 text-sm font-bold hover:underline flex items-center gap-1'>
        <Layout size={16} /> <span>Change Template</span>
      </button>
      {isOpen && (
        <div className='absolute top-full right-0 w-80 p-3 mt-2 space-y-3 z-50 bg-white rounded-xl border border-slate-200 shadow-xl max-h-96 overflow-y-auto custom-scrollbar transform origin-top-right transition-all'>
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => { onChange(template.id); setIsOpen(false) }}
              className={`relative p-3 border rounded-xl cursor-pointer transition-all ${selectedTemplate === template.id ?
                "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className='w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm'>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className='font-bold text-slate-800 text-sm'>{template.name}</h4>
                <p className='text-xs text-slate-500 leading-relaxed'>{template.preview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TemplateSelector