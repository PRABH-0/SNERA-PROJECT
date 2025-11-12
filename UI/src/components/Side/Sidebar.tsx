import React from "react";
import Home from "../Home/Home";
import Match from "../Match/Match";
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile";
import About from "../About/About";
import Projects from "../Projects/Projects"; 
import Teams from "../Teams/Teams";
import Feedback from "../Feedback/Feedback";

interface SidebarProps {
  show: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, setShowSidebar }) => {
  return (
    <> 
      {show && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed md:hidden"
        ></div>
      )}

      <div
        className={`fixed top-16 bottom-0 left-0 w-13  bg-[var(--bg-secondary)] z-50 transform border-r border-[var(--border-color)] 
        transition-transform duration-300 
        ${show ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:w-13 `}
      >
        <ul className="flex flex-col gap-3 mt-4">
          <Home />
          <Match />
          <Chat />
          <Profile />
          <Projects />
          <Teams />
          <Feedback />
          <About />
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
