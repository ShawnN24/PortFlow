export type ExperienceType = {
  job_title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  bullets: string[];
};

export default function ExperienceForm({ experiences, setExperiences }: {
  experiences: ExperienceType[];
  setExperiences: (exps: ExperienceType[]) => void;
}) {
  const addExperience = () => {
    const newExperience = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      bullets: [""],
    };

    setExperiences([...experiences, newExperience]);
  };

  const deleteExperience = (index: number) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    setExperiences(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <label className="font-semibold text-lg">Experiences <span className="text-red-500">*</span></label>
        <button
          onClick={addExperience}
          disabled={experiences.length >= 10}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Experience
        </button>
      </div>
      {experiences.map((exp, idx) => (
        <div key={idx} className="p-4 border rounded my-2 space-y-2">
          <div className="flex justify-between gap-2">
            <input
              className="w-full p-2 border rounded"
              placeholder="Job Title"
              value={exp.job_title ?? ""}
              onChange={e => {
                const newExp = [...experiences];
                newExp[idx].job_title = e.target.value;
                setExperiences(newExp);
              }}
            />
            {idx !== 0 && (
              <button
                onClick={() => deleteExperience(idx)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            )}
          </div>
          <input
            className="w-full p-2 border rounded"
            placeholder="Company"
            value={exp.company ?? ""}
            onChange={e => {
              const newExp = [...experiences];
              newExp[idx].company = e.target.value;
              setExperiences(newExp);
            }}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Location"
            value={exp.location ?? ""}
            onChange={e => {
              const newExp = [...experiences];
              newExp[idx].location = e.target.value;
              setExperiences(newExp);
            }}
          />
          <div className="flex gap-2">
            <input
              className="w-1/2 p-2 border rounded"
              placeholder="Start Date"
              value={exp.start_date ?? ""}
              onChange={e => {
                const newExp = [...experiences];
                newExp[idx].start_date = e.target.value;
                setExperiences(newExp);
              }}
            />
            <input
              className="w-1/2 p-2 border rounded"
              placeholder="End Date"
              value={exp.end_date ?? ""}
              onChange={e => {
                const newExp = [...experiences];
                newExp[idx].end_date = e.target.value;
                setExperiences(newExp);
              }}
            />
          </div>
          <textarea
            className="w-full p-2 border rounded my-1"
            value={exp.bullets.join("\n")}
            onChange={e => {
              const newExp = [...experiences];
              newExp[idx].bullets = e.target.value.split("\n").filter(line => line.trim() !== "");
              setExperiences(newExp);
            }}
          />
        </div>
      ))}
    </div>
  );
}