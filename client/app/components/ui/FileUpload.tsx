import { useState } from "react";

export default function FileUpload({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [fileName, setFileName] = useState("No file selected");
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="resume-upload"
          className="cursor-pointer border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-600 hover:text-white transition-colors duration-300 ease-in-out"
        >
          Upload Resume
        </label>
        <div className="text-gray-700">{fileName}</div>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input
        id="resume-upload"
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            if (file.size > MAX_FILE_SIZE) {
              setError("File size must be under 2MB.");
              setFileName("No file selected");
              e.target.value = ""; // Reset the input
              return;
            }

            setError("");
            setFileName(file.name);
            onChange(e);
          } else {
            setFileName("No file selected");
            setError("");
          }
        }}
        className="hidden"
      />
    </div>
  );
}