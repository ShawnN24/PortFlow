export default function ProfileContainer({ formData, githubData, themeColor, isDarkMode, mode, edit }) {
  const bgColor = isDarkMode ? '#f9fafb' : '#0f172a';

  return (
    <div className={`${edit ? `opacity-5` : `cursor-pointer drag-handle`}`}>
      <div className='flex flex-col items-center'>
        <div className='relative w-full h-full rounded-2xl p-2'>
          {/* Glowing Gradient Background */}
          <div
            className="absolute inset-0 rounded-2xl opacity-40 z-[-1]"
            style={{background: `linear-gradient(135deg, ${themeColor}, ${bgColor})`}}
          />
          {/* Profile Image */}
          <div className="relative w-full h-full rounded-2xl border-0 overflow-hidden z-[1]">
            {formData.profile_image ? 
              <img src={formData.profile_image} className="object-cover w-full h-full" />
            : 
              <img src={githubData.avatar_url} className="object-cover w-full h-full" />
            }
          </div>
        </div>

        {/* Name and Bio */}
        <div>
          <p className='font-bold text-3xl px-5 pt-5'>
            {formData.name}
          </p>
          <p className='text-lg px-7 pt-2 leading-tight' style={{ color: mode.accent }}>
            {formData.experiences[0].job_title}<br />@ {formData.experiences[0].company}
          </p>
          <p className='text-sm px-5 py-2 whitespace-pre-line leading-snug' style={{ color: mode.text_secondary }}>
            {formData.bio ? 
              <strong>{formData.bio}</strong>
            :
              <strong>{githubData.bio}</strong>
            }
          </p>
        </div>
      </div>
    </div>
  );
}