import { useEffect, useState } from "react";

export default function SkillSelector({ skills, setSkills }: {
  skills: string[];
  setSkills: (skills: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const [allSkills, setAllSkills] = useState<string[]>([]);

  useEffect(() => {
    fetch("/skills.json")
      .then(res => res.json())
      .then((data: string[]) => setAllSkills(data))
      .catch(err => console.error("Failed to load skills:", err));
  }, []);

  const filteredSkills = allSkills.filter(
    skill => skill.toLowerCase().includes(input.toLowerCase()) && !skills.includes(skill)
  );

  const addSkill = (skill: string) => {
    setSkills([...skills, skill]);
    setInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div>
      <label className="block font-semibold">Skills <span className="text-red-500">*</span></label>
      
      {/* Selected skills */}
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map(skill => (
          <div key={skill} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
            {skill}
            <button onClick={() => removeSkill(skill)} className="ml-2 text-sm font-bold hover:text-red-600">
              X
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type to add a skill"
        className="w-full p-2 border rounded mb-2"
      />

      {/* Suggestions */}
      {input && filteredSkills.length > 0 && (
        <ul className="border rounded bg-white shadow max-h-40 overflow-y-auto">
          {filteredSkills.map(skill => (
            <li
              key={skill}
              onClick={() => addSkill(skill)}
              className="cursor-pointer px-4 py-2 hover:bg-purple-100"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}