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

export default function generateStaticMarkup({ formData, githubData, components, themeColor, isDarkMode }) {
  const mode = isDarkMode ? darkTheme : lightTheme;

  const baseLayout = [
    { i: 'navbar', x: 0, y: 0, w: 16, h: 4, static: true },
    { i: 'profile', x: 2, y: 2, w: 4, h: 52 },
    { i: 'experience', x: 6, y: 1, w: 4, h: 29 },
    { i: 'projects', x: 10, y: 1, w: 4, h: 52 },
    { i: 'skills', x: 6, y: 6, w: 4, h: 23 },
    { i: 'history', x: 2, y: 10, w: 12, h: 14 },
  ];

  const getActiveLayout = () => {
    return baseLayout
      .filter(item => components[item.i]) //filter only active components
      .map(item => ({ ...item })); // preserve static flag if present
  };

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
      <div className={`flex-1 overflow-hidden`} style={{ height: '100vh' }}>
        <GridLayout
          className=''
          style={{ backgroundColor: mode.bg, color: mode.text_primary}}
          layout={getActiveLayout()}
          cols={16}
          rowHeight={5}
          width={1000}
          isResizable={false}
          isDraggable={false}
          onLayoutChange={() => {}}
          draggableHandle=".drag-handle"
        >
          {getActiveLayout().map(item => (
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
    <title>Static Grid Layout</title>
    <style>
      /* Basic CSS reset and styles here */
      body, html { margin: 0; padding: 0; font-family: sans-serif; }
      .flex { display: flex; }
      .shadow { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .rounded-xl { border-radius: 1rem; }
      .overflow-hidden { overflow: hidden; }
      .flex-1 { flex: 1; }
      /* Add any additional styles your GridLayout needs */
    </style>
  </head>
  <body>
    <div id="root">${htmlString}</div>
  </body>
  </html>
  `;

  return fullHtml;
}