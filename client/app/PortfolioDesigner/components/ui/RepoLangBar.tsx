import { useEffect, useState } from "react";

export default function RepoLangBar({ languages, mode }) {
  const [languageMeta, setLanguageMeta] = useState({});

  useEffect(() => {
    const loadColors = async () => {
      try {
        const res = await fetch('/colors.json');
        const data = await res.json();
        setLanguageMeta(data);
      } catch (err) {
        console.error("Failed to load colors.json", err);
      }
    };

    loadColors();
  }, []);

  const totalBytes = Object.values(languages || {}).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  return (
    <div>
      <div className="w-full h-2 my-2 flex rounded-full overflow-hidden">
        {Object.entries(languages).map(([lang, bytes], i) => {
          const percentage = (bytes / totalBytes) * 100;
          const color = languageMeta?.[lang]?.color || "#999";

          return (
            <div
              key={i}
              style={{
                width: `${percentage}%`,
                backgroundColor: color,
              }}
              title={`${lang}: ${percentage.toFixed(1)}%`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 mb-1 text-sm">
        {Object.entries(languages).map(([lang, bytes], i) => {
          const percentage = ((bytes / totalBytes) * 100).toFixed(1);
          const color = languageMeta?.[lang]?.color || mode.accent;

          return (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full border"
              style={{
                borderColor: color,
                color: mode.text_secondary,
              }}
            >
              <strong>{lang}:</strong> {percentage}%
            </span>
          );
        })}
      </div>
    </div>
  );
}