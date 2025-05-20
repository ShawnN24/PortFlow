export default function RepoLangBar({ languages, mode }) {
  const totalBytes = Object.values(languages || {}).reduce(
    (sum, lang) => sum + (lang.bytes || 0),
    0
  );

  return (
    <div>
      <div className="w-full h-2 my-2 flex rounded-full overflow-hidden">
        {Object.entries(languages).map(([lang, {name, bytes, color}], i) => {
          const percentage = ((bytes / totalBytes) * 100).toFixed(1);
          const langColor = color || "#999";

          return (
            <div
              key={i}
              style={{
                width: `${percentage}%`,
                backgroundColor: langColor,
              }}
              title={`${name}: ${percentage}%`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 mb-1 text-sm">
        {Object.entries(languages).map(([lang, {name, bytes, color}], i) => {
          const percentage = ((bytes / totalBytes) * 100).toFixed(1);
          const langColor = color || mode.accent;

          return (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full border"
              style={{
                borderColor: langColor,
                color: mode.text_secondary,
              }}
            >
              <strong>{name}:</strong> {percentage}%
            </span>
          );
        })}
      </div>
    </div>
  );
}