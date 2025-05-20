import ReactDOMServer from 'react-dom/server';
import NavbarContainer from './ui/Navbar';
import ProfileContainer from './ui/Profile';
import ExperienceContainer from './ui/Experience';
import ProjectsContainer from './ui/Projects';
import HistoryContainer from './ui/History';
import SkillsContainer from './ui/Skills';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GridLayout from 'react-grid-layout';

const lightTheme = {
  bg: "#F9FAFB",
  card_bg: "#F9F9F9",
  text_primary: "#1F2937",
  text_secondary: "#4B5563",
  border_color: "#E5E7EB",
  accent: "#D1D1D1",
};

const darkTheme = {
  bg: "#121212",
  card_bg: "#1E1E1E",
  text_primary: "#E5E7EB",
  text_secondary: "#9CA3AF",
  border_color: "#2D2D2D",
  accent: "#3E3E3E",
};

export default function generateStaticMarkup({ formData, githubData, activeLayout, components, themeColor, isDarkMode }) {
  const mode = isDarkMode ? darkTheme : lightTheme;

   const filteredLayout = activeLayout
    .filter(item => components[item.i]) // show only enabled components
    .map(item => ({ ...item }));

  const renderComponent = (id) => {
    switch (id) {
      case 'navbar':
        return (
          <NavbarContainer formData={formData} githubData={githubData} edit={false} />
        );
      case 'profile':
        return (
          <ProfileContainer formData={formData} githubData={githubData.user} themeColor={themeColor} isDarkMode={isDarkMode} mode={mode} edit={false} />
        );
      case 'experience':
        return (
          <ExperienceContainer formData={formData} githubData={githubData} themeColor={themeColor} mode={mode} edit={false} />
        );
      case 'projects':
        return (
          <ProjectsContainer formData={formData} githubData={githubData} themeColor={themeColor} mode={mode} edit={false} />
        );
      case 'skills':
        return (
          <SkillsContainer formData={formData} githubData={githubData} themeColor={themeColor} mode={mode} edit={false} />
        );
      case 'history':
        return (
          <HistoryContainer formData={formData} githubData={githubData.user} themeColor={themeColor.slice(1)} edit={false} />
        );
      default:
        return null;
    }
  };

  const StaticGrid = () => (
    <DndProvider backend={HTML5Backend}>
      <div className={`flex-1 overflow-hidden pb-[5%]`} style={{ backgroundColor: mode.bg }}>
        <GridLayout
          style={{ backgroundColor: mode.bg, color: mode.text_primary}}
          layout={filteredLayout}
          cols={16}
          rowHeight={5}
          width={window.innerWidth}
          isResizable={false}
          isDraggable={false}
          draggableHandle=".drag-handle"
        >
          {filteredLayout.map(item => (
            <div key={item.i} className={`flex shadow rounded-xl overflow-hidden`}
            style={{ backgroundColor: mode.card_bg, borderColor: mode.border_color}}
            >
              {renderComponent(item.i)}
            </div>
          ))}
        </GridLayout>
      </div>
    </DndProvider>
  );

  const htmlString = ReactDOMServer.renderToStaticMarkup(<StaticGrid />);

  const fullHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${formData.name}'s PortFlow</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body>
    <div id="root" className={"pb-[5%]"} style={{ backgroundColor: ${mode.bg} }}>${htmlString}</div>
  </body>
  </html>
  `;

  return fullHtml;
}