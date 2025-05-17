import React from 'react';

interface SidebarButtonProps {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ title, icon, active, onClick }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`p-2 rounded ${active ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-300'} text-white`}
    >
      {icon}
    </button>
  );
};

export default SidebarButton;