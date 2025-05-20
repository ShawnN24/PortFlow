import { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { skillToIconClass } from "@/public/skillToIcon";

const ItemType = "SKILL";

function DraggableSkill({ icon, index, moveSkill, deleteSkill, draggable }) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current || !draggable || item.index === index) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveSkill(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: ItemType,
    item: { index },
    canDrag: () => draggable,
  });

  drag(drop(ref));

  const iconClass = `${icon}${skillToIconClass[icon]}`;

  return (
    <div
      ref={ref}
      title={icon}
      className={`w-12 ${draggable ? "cursor-pointer" : "cursor-default"}`}
      onDoubleClick={() => draggable && deleteSkill(index)}
    >
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${iconClass}.svg`}
        alt={icon}
      />
    </div>
  );
}

export default function SkillsContainer({ formData, githubData, themeColor, mode, edit, onSkillsChange }) {
  const [skills, setSkills] = useState(formData.skills);

  const updateSkills = (updated) => {
    setSkills(updated);
    onSkillsChange?.(updated); // propagate up
  };

  const moveSkill = (from, to) => {
    const updated = [...skills];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    updateSkills(updated);
  };

  const deleteSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    updateSkills(updated);
  };

  return (
    <div className="flex-1">
      <div className={`${!edit && "cursor-pointer drag-handle"}`}>
        <p
          className="text-xl flex justify-between font-bold px-3 pt-2"
          style={{ backgroundColor: mode.accent }}
        >
          Technological Skills
        </p>
        <div
          className="text-sm px-5 pb-2 flex items-center gap-1"
          style={{ backgroundColor: mode.accent, color: mode.text_secondary }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-small"
          >
            <circle cx="12" cy="12" r="6" />
          </svg>
          <p>{skills.length} Skills</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-3 py-3">
        {skills.map((icon, index) => (
          <DraggableSkill
            key={index}
            icon={icon}
            index={index}
            moveSkill={moveSkill}
            deleteSkill={deleteSkill}
            draggable={edit}
          />
        ))}
      </div>
    </div>
  );
}
