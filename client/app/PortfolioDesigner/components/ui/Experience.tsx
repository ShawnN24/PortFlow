import { useState } from 'react';

export default function ExperienceContainer({ formData, themeColor, mode, edit }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className={`flex flex-col h-full ${edit && `opacity-5`}`}>
      <div className={`${!edit && "cursor-pointer drag-handle"}`}>
        <p className="text-xl font-bold px-3 pt-2" style={{ backgroundColor: mode.accent }}>
          Professional Experience
        </p>
        <div className="text-sm px-5 pb-2 flex items-center gap-1" style={{ backgroundColor: mode.accent, color: mode.text_secondary }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-small-icon lucide-circle-small"><circle cx="12" cy="12" r="6"/></svg>
          <p>{formData.experiences.length} Experiences</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {formData.experiences.map((exp, idx) => (
          <div
            key={idx}
            className="pb-3 cursor-pointer"
            onClick={() => toggleExpand(idx)}
          >
            <div className="flex items-center gap-3">
              <p style={{ color: mode.accent }}>{idx+1}</p>
              <div className="flex-1 pl-2 border-l" style={{ borderColor: mode.accent }}>
                <p className="font-bold" style={{ color: themeColor }}>{exp.company}</p>
                <p className="font-bold text-lg leading-tight">{exp.job_title}</p>
                <p className="text-sm" style={{ color: mode.accent }}>
                  {exp.start_date} - {exp.end_date}
                </p>
              </div>
            </div>
            {expandedIndex === idx && (
              <div className="pl-8 pr-5 pt-2 text-sm leading-tight" style={{ color: mode.text_secondary }}>
                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}