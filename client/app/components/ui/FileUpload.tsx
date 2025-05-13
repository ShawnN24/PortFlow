import { useState } from "react";

export default function FileUpload({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [fileName, setFileName] = useState("No file selected");

  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor="resume-upload"
        className="cursor-pointer border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-600 hover:text-white transition-colors duration-300 ease-in-out"
      >
        Upload Resume
      </label>
      <div className="text-gray-700">{fileName}</div>
      <input
        id="resume-upload"
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          onChange(e);
          if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
          } else {
            setFileName("No file selected");
          }
        }}
        className="hidden"
      />
    </div>
  );
}