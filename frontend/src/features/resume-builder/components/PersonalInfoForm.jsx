import React from "react";
import ValidatedInput from "./ValidatedInput";
import { User, Briefcase, Phone, Mail, MapPin, Linkedin, Globe } from "lucide-react";

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
  const update = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-100 pb-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Contacts</h2>
        <p className="text-slate-500 mt-1">Add your up-to-date contact information so employers and recruiters can easily reach you.</p>
      </div>

      <div className="flex items-start gap-6">
        {/* Image Upload */}
        <div className="shrink-0 group relative">
          <div className={`w-28 h-28 rounded-2xl overflow-hidden border-2 ${data.image ? 'border-blue-500' : 'border-dashed border-slate-300'} bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors shadow-sm`}>
            {data?.image ? (
              <img
                src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-2">
                <span className="text-xs text-slate-400 font-medium">Add Photo</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => update("image", e.target.files[0])}
            />
          </div>

          {data?.image && (
            <label className="flex items-center gap-2 mt-3 text-xs font-medium text-slate-600 cursor-pointer hover:text-blue-600 justify-center">
              <input
                type="checkbox"
                checked={removeBackground}
                onChange={(e) => setRemoveBackground(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Remove Background
            </label>
          )}
        </div>

        {/* Name & Title */}
        <div className="grid md:grid-cols-2 gap-6 w-full">
          <ValidatedInput
            label="Full Name"
            value={data?.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            placeholder="e.g. Mayank Kumar"
            startIcon={User}
          />
          <ValidatedInput
            label="Job Title"
            value={data?.profession}
            onChange={(e) => update("profession", e.target.value)}
            placeholder="e.g. Full Stack Developer"
            startIcon={Briefcase}
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <ValidatedInput
          label="Phone"
          value={data?.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="e.g. +91 7011300316"
          type="tel"
          startIcon={Phone}
        />
        <ValidatedInput
          label="Email"
          value={data?.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="e.g. mayank@example.com"
          type="email"
          startIcon={Mail}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ValidatedInput
          label="Location"
          value={data?.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="e.g. New Delhi, India"
          startIcon={MapPin}
        />
        <ValidatedInput
          label="LinkedIn (Optional)"
          value={data?.linkedin}
          onChange={(e) => update("linkedin", e.target.value)}
          placeholder="linkedin.com/in/username"
          startIcon={Linkedin}
        />
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        <ValidatedInput
          label="Personal Website (Optional)"
          value={data?.website}
          onChange={(e) => update("website", e.target.value)}
          placeholder="https://yourwebsite.com"
          startIcon={Globe}
        />
      </div>

      <div className="pt-2">
        {/* Accordion for Additional Info could go here if needed */}
      </div>

    </div>
  );
};

export default PersonalInfoForm;