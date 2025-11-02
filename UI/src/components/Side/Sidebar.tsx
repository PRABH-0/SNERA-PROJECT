import React from "react";
import Home from "../Home/Home";
import Match from "../Match/Match";
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile";
import About from "../About/About";
import More from "../More/More";

interface SidebarProps {
  show: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, setShowSidebar }) => {
  return (
    <>
    
      {/* Overlay for mobile */}
      {show && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed md:hidden"
        ></div>
      )}

      <div
        className={`fixed top-14 bottom-0 left-0 w-12 bg-[#2c2c2c] z-50 transform 
        transition-transform duration-300 
        ${show ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:w-12`}
      >
        <ul className="flex flex-col gap-3 mt-4">
          <More />
          <Home />
          <Match />
          <Chat />
          <Profile />
          <About />
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
