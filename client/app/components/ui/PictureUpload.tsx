import { useState } from "react";

export default function PictureUpload({ formData, setPicture }: {
  formData: { profile_image?: string };
  setPicture: (field: string, value: any) => void;
}) {
  const [fileName, setFileName] = useState("No file selected");

  return(
    <div>
      <label className="block font-semibold">Upload Profile Picture <span className="text-gray-400">(optional)</span></label>
      <div className="flex items-center gap-4">
      <label
        htmlFor="image-upload"
        className="cursor-pointer border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-600 hover:text-white transition-colors duration-300 ease-in-out"
      >
        Upload Image
      </label>
      <div className="text-gray-700">{fileName}</div>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files?.[0]) {
              setFileName(e.target.files[0].name);
              const reader = new FileReader();
              reader.onloadend = () => {
                setPicture("profile_image", reader.result);
              };
              reader.readAsDataURL(e.target.files?.[0]); // convert to base64
            } else {
              setFileName("No file selected");
              return;
            }
          }}
          className="hidden"
        />
      </div>

      {formData.profile_image && (
        <img
          src={formData.profile_image}
          alt="Profile Preview"
          className="mt-2 w-24 h-24 object-cover rounded-2xl"
        />
      )}
    </div>
  );
}