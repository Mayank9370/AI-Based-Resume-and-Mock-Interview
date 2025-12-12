import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const ValidatedInput = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    className = "",
    startIcon: StartIcon
}) => {
    const hasValue = value && value.toString().length > 0;

    return (
        <div className={className}>
            {label && <label className="text-sm font-semibold text-slate-700 mb-2 block">{label}</label>}
            <div className="relative group">
                {StartIcon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                        <StartIcon size={18} />
                    </div>
                )}

                <input
                    type={type}
                    value={value || ""}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full ${StartIcon ? 'pl-11' : 'px-5'} pr-10 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium bg-slate-50/30 focus:bg-white`}
                />

                <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${hasValue ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <CheckCircle2 className="text-green-500 bg-white rounded-full" size={20} fill="white" />
                </div>
            </div>
        </div>
    );
};

export default ValidatedInput;
