import { useCallback, useRef, useState, memo } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "PROJECT";

const DraggableProject = memo(function DraggableProject({
  repo,
  index,
  moveProject,
  deleteProject,
  themeColor,
  mode,
  languages,
  draggable,
}) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveProject(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: ItemType,
    item: { id: repo.id, index },
    canDrag: () => draggable,
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      onDoubleClick={() => deleteProject(index)}
      className="p-4 rounded-xl shadow-md cursor-pointer"
      style={{ backgroundColor: mode.background, color: mode.text_primary }}
    >
      <div className="flex items-center">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold flex-1 hover:underline"
          style={{ color: themeColor }}
        >
          {repo.name}
        </a>
        <span className="flex items-center">⭐{repo.stargazers_count}</span>
      </div>
      <p className="text-sm mt-1">{repo.description}</p>

      <div className="flex flex-wrap items-center gap-3 text-sm mt-2">
        {languages?.length > 0 && (
          <span className="text-sm italic">
            Languages: {languages.join(", ")}
          </span>
        )}
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {repo.topics.map((topic, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full"
              style={{
                backgroundColor: mode.accent,
                color: mode.text_secondary,
              }}
            >
              #{topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
});

export default function ProjectsContainer({
  formData,
  githubData,
  themeColor,
  mode,
  edit,
}) {
  const [repos, setRepos] = useState(githubData.repos);
  const [languagesMap, setLanguagesMap] = useState(githubData.languages);

  const moveProject = useCallback((from, to) => {
    setRepos((prevRepos) => {
      const updated = [...prevRepos];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }, []);

  const deleteProject = useCallback((index) => {
    setRepos((prevRepos) => {
      const updated = [...prevRepos];
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div>
        <p
          className="text-xl flex justify-between font-bold px-3 pt-3"
          style={{ backgroundColor: mode.accent }}
        >
          Personal Projects
        </p>
        <div
          className="text-sm pl-5 pb-3 flex items-center gap-1"
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
          <p>{repos.length} Projects</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {repos.map((repo, idx) => (
          <DraggableProject
            key={repo.id}
            repo={repo}
            index={idx}
            moveProject={moveProject}
            deleteProject={deleteProject}
            themeColor={themeColor}
            mode={mode}
            languages={languagesMap[repo.name]}
            draggable={edit}
          />
        ))}
      </div>
    </div>
  );
}
