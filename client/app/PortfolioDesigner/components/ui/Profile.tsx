export default function ProfileContainer({ formData, githubData, themeColor, isDarkMode, edit }) {
  const bgColor = isDarkMode ? '#f9fafb' : '#0f172a';

  return (
    <div className={`${edit && `opacity-5`}`}>
      <div className='flex flex-col items-center'>
        <div className='relative w-full h-full rounded-2xl p-2'>
          {/* Glowing Gradient Background */}
          <div
            className="absolute inset-0 rounded-2xl blur opacity-40 animate-pulse"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, ${bgColor})`,
              zIndex: -1
            }}
          />
          {/* Profile Image */}
          <div
            className="w-full h-full rounded-2xl border-0 overflow-hidden"
            style={{
              borderColor: themeColor,
              backgroundColor: themeColor,
            }}
          >
            <img src={githubData.avatar_url} className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Name and Bio */}
        <div>
          <p className='font-bold text-3xl pl-5 pt-5'>
            {formData.name}
          </p>
          <p className='text-xl text-gray-500 pl-5 pt-2'>
            {githubData.bio}
          </p>
        </div>
      </div>
    </div>
  );
}