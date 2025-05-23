// Required dependencies:
// npm install @dnd-kit/core @dnd-kit/sortable react-grid-layout

import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ProfileContainer from './ui/Profile';
import NavbarContainer from './ui/Navbar';
import ExperienceContainer from './ui/Experience';
import ProjectsContainer from './ui/Projects';
import SkillsContainer from './ui/Skills';
import HistoryContainer from './ui/History';
import SidebarButton from './ui/SidebarButton';
import ColorPicker from './ui/ColorPicker';
import ThemeToggle from './ui/ThemeToggle';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReloadGithubAuth from './ui/Reload';
import DeployButton from './ui/DeployButton';

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

export default function PortfolioBuilder({formData, githubData}) {
  const [isFormData, setFormData] = useState(formData);
  const [isGithubData, setGithubData] = useState(githubData);
  const [themeColor, setThemeColor] = useState('#9810FA');
  const [isDarkMode, setDarkMode] = useState(false);
  const mode = isDarkMode ? darkTheme : lightTheme;
  const [components, setComponents] = useState({
    navbar: true,
    profile: true,
    experience: true,
    projects: true,
    skills: true,
    history: true,
    edit: false,
  });

  const baseLayout = [
    { i: 'navbar', x: 0, y: 0, w: 16, h: 5, static: true },
    { i: 'profile', x: 2, y: 2, w: 4, h: 54, static: false },
    { i: 'experience', x: 6, y: 1, w: 4, h: 31, static: false },
    { i: 'projects', x: 10, y: 1, w: 4, h: 54, static: false },
    { i: 'skills', x: 6, y: 6, w: 4, h: 23, static: false },
    { i: 'history', x: 2, y: 10, w: 12, h: 16, static: false },
  ];

  const [isLayout, setLayout] = useState(baseLayout);
  const getLayout = () =>
    isLayout.filter(item => components[item.i]);

  const renderComponent = (id) => {
    switch (id) {
      case 'navbar':
        return (
          <NavbarContainer formData={isFormData} githubData={isGithubData} edit={components.edit} />
        );
      case 'profile':
        return (
          <ProfileContainer formData={isFormData} githubData={isGithubData.user} themeColor={themeColor} isDarkMode={isDarkMode} mode={mode} edit={components.edit} />
        );
      case 'experience':
        return (
          <ExperienceContainer formData={isFormData} themeColor={themeColor} mode={mode} edit={components.edit} />
        );
      case 'projects':
        return (
          <ProjectsContainer githubData={isGithubData} themeColor={themeColor} mode={mode} edit={components.edit} onReposChange={(updatedRepos) => setGithubData(prev => ({ ...prev, repos: updatedRepos }))} />
        );
      case 'skills':
        return (
          <SkillsContainer formData={isFormData} mode={mode} edit={components.edit} onSkillsChange={(updatedSkills) => setFormData(prev => ({ ...prev, skills: updatedSkills }))} />
        );
      case 'history':
        return (
          <HistoryContainer githubData={isGithubData.user} themeColor={themeColor.slice(1)} edit={components.edit} />
        );
      default:
        return null;
    }
  };

  const handleToggle = (key) => {
    setComponents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50">
          <div className="flex flex-col p-2 border border-l-0 rounded-r bg-white shadow gap-2">
            <SidebarButton
              title="Toggle Navbar"
              active={components.navbar}
              onClick={() => handleToggle('navbar')}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-app-window-icon lucide-app-window"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/></svg>}
            />
            <SidebarButton
              title="Toggle Profile"
              active={components.profile}
              onClick={() => handleToggle('profile')}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 21a6 6 0 0 0-12 0"/><circle cx="12" cy="11" r="4"/><rect width="18" height="18" x="3" y="3" rx="2"/></svg>}
            />
            <SidebarButton
              title="Toggle Experience"
              active={components.experience}
              onClick={() => handleToggle('experience')}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-business-icon lucide-briefcase-business"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>}
            />
            <SidebarButton
              title="Toggle Projects"
              active={components.projects}
              onClick={() => handleToggle('projects')}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-code-icon lucide-folder-code"><path d="M10 10.5 8 13l2 2.5"/><path d="m14 10.5 2 2.5-2 2.5"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/></svg>}
            />
            <SidebarButton
              title="Toggle Skills"
              active={components.skills}
              onClick={() => handleToggle('skills')}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hammer-icon lucide-hammer"><path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/></svg>}
            />
            <SidebarButton
              title="Toggle Github History"
              active={components.history}
              onClick={() => handleToggle('history')}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days-icon lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>}
            />
            <hr className="my-1" />
            <SidebarButton
              title="Edit"
              active={components.edit}
              onClick={() => handleToggle('edit')}
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>}
            />
            <ColorPicker
              color={themeColor}
              onChange={(newColor) => {
                setThemeColor(newColor);
                // Optionally apply to theme globally or save to state/store
              }}
            />
            <ThemeToggle isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
            <ReloadGithubAuth />
            <hr className="my-1" />
            <DeployButton formData={isFormData} githubData={isGithubData} activeLayout={getLayout()} components={components} themeColor={themeColor} isDarkMode={isDarkMode} />
          </div>
        </div>

        <div className={`flex-1 overflow-hidden pb-[5%]`} style={{ backgroundColor: mode.bg }}>
          <GridLayout
            className=''
            style={{ backgroundColor: mode.bg, color: mode.text_primary}}
            layout={getLayout()}
            onLayoutChange={(newLayout) => {
              // Merge new positions into the full layout
              setLayout((prevLayout) => {
                const updated = prevLayout.map(item => {
                  const updatedItem = newLayout.find(i => i.i === item.i);
                  return updatedItem ? { ...item, ...updatedItem } : item;
                });
                return updated;
              });
            }}
            cols={16}
            rowHeight={5}
            width={window.innerWidth}
            isResizable
            isDraggable={!components.edit}
            draggableHandle=".drag-handle"
          >
            {getLayout().map(item => (
              <div key={item.i} className={`flex shadow rounded-xl overflow-hidden`}
              style={{ backgroundColor: mode.card_bg, borderColor: mode.border_color}}
              >
                {renderComponent(item.i)}
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </DndProvider>
  );
}