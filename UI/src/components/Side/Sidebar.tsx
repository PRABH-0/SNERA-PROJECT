import React from "react";
import { NavLink } from 'react-router-dom'
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
          <li>
            <NavLink
              to="/Home"
              data-tip="Home"
              className={({ isActive }) => `
                    transition-colors mx-3 my-1 tooltip tooltip-right  
                    ${isActive ? "text-[var(--icon-hover)]" : ""}
                  `}
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className={`${isActive
                      ? "fill-[var(--icon-hover)]"
                      : "fill-[var(--icon-color)] hover:fill-[var(--icon-hover)]"
                      } transition-all duration-300 hover:scale-110 inline-block size-7 mt-1.2`}
                  ><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
                  <span className="hidden text-white px-3">Home</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Match"
              data-tip="Match"
              className={({ isActive }) => `
                        transition-colors mx-3 my-1 tooltip tooltip-right  
                        ${isActive ? "text-[var(--icon-hover)]" : ""}
                      `}
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className={`${isActive
                      ? "fill-[var(--icon-hover)]"
                      : "fill-[var(--icon-color)] hover:fill-[var(--icon-hover)]"
                      } transition-all duration-300 hover:scale-110 inline-block size-7 mt-1.2`}
                  ><path d="M 20 6 h -2.18 c 0.11 -0.31 0.18 -0.65 0.18 -1 c 0 -1.66 -1.34 -3 -3 -3 c -1.05 0 -1.96 0.54 -2.5 1.35 l -0.5 0.67 l -0.5 -0.68 C 10.96 2.54 10.05 2 9 2 C 7.34 2 6 3.34 6 5 c 0 0.35 0.07 0.69 0.18 1 H 4 c -1.11 0 -1.99 0.89 -1.99 2 L 2 19 c 0 1.11 0.89 2 2 2 h 16 c 1.11 0 2 -0.89 2 -2 V 8 c 0 -1.11 -0.89 -2 -2 -2 Z m -5 -2 c 0.55 0 1 0.45 1 1 s -0.45 1 -1 1 s -1 -0.45 -1 -1 s 0.45 -1 1 -1 Z M 9 4 c 0.55 0 1 0.45 1 1 s -0.45 1 -1 1 s -1 -0.45 -1 -1 s 0.45 -1 1 -1 Z"></path></svg>
                  <span className="hidden text-white px-3">Match</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Chat"
              data-tip="Chat"
              className={({ isActive }) => `
            transition-colors mx-3 my-1 tooltip tooltip-right  
            ${isActive ? "text-[var(--icon-hover)]" : ""}
          `}
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className={`${isActive
                      ? "fill-[var(--icon-hover)]"
                      : "fill-[var(--icon-color)] hover:fill-[var(--icon-hover)]"
                      } transition-all duration-300 hover:scale-110 inline-block size-7 mt-1.2`}
                  ><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" /></svg>
                  <span className=" hidden text-white px-3">Chat</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Profile"
              data-tip="Profile"
              className={({ isActive }) => `
                        transition-colors mx-3 my-1 tooltip tooltip-right  
                        ${isActive ? "text-[var(--icon-hover)]" : ""}
                      `}
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className={`${isActive
                      ? "fill-[var(--icon-hover)]"
                      : "fill-[var(--icon-color)] hover:fill-[var(--icon-hover)]"
                      } transition-all duration-300 hover:scale-110 inline-block size-7 mt-1.2`}
                  ><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                  <span className=" hidden text-white px-3">Profile</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Projects"
              data-tip="Projects"
              className={({ isActive }) => `
                          transition-colors mx-3 my-1 tooltip tooltip-right  
                          ${isActive ? "text-[var(--icon-hover)]" : ""}
                        `}
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className={`${isActive
                      ? "fill-[var(--icon-hover)]"
                      : "fill-[var(--icon-color)] hover:fill-[var(--icon-hover)]"
                      } transition-all duration-300 hover:scale-110 inline-block size-7 mt-1.2`}
                  >
                    <path
                      d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                  </svg>

                  <span className="hidden text-white px-3">Projects</span>
                </>
              )}
            </NavLink>

          </li>
          <li>
            <NavLink
              to="/Teams"
              data-tip="Teams"
              className={({ isActive }) => `
                            transition-colors mx-3 my-1 tooltip tooltip-right  
                            ${isActive ? "text-[var(--icon-hover)]" : ""}
                          `}
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className={`${isActive
                      ? "fill-[var(--icon-hover)]"
                      : "fill-[var(--icon-color)] hover:fill-[var(--icon-hover)]"
                      } transition-all duration-300 hover:scale-110 inline-block size-7 mt-1.2`}
                  >
                    <path
                      d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>

                  <span className="hidden text-white px-3">Teams</span>
                </>
              )}
            </NavLink>

          </li>
          <li>
            <NavLink
              to="/Feedback"
              data-tip="Feedback"
              className={({ isActive }) => `
                        transition-colors mx-3 my-1 tooltip tooltip-right  
                        ${isActive ? "text-[var(--icon-hover)]" : ""}
                      `}
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className={`${isActive
                      ? "fill-[var(--icon-hover)]"
                      : "fill-[var(--icon-color)] hover:fill-[var(--icon-hover)]"
                      } transition-all duration-300 hover:scale-110 inline-block size-7 mt-1.2`}
                  >
                    <path
                      d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
                  </svg>

                  <span className="hidden text-white px-3">Feedback</span>
                </>
              )}
            </NavLink>

          </li>
          <li>
            <NavLink
              to="/About"
              data-tip="About"
              className={({ isActive }) => `
                        transition-colors mx-3 my-1 tooltip tooltip-right  
                        ${isActive ? "text-[var(--icon-hover)]" : ""}
                      `}
            >
              {({ isActive }) => (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="none"
                    className={`${isActive
                      ? "fill-[var(--icon-hover)]"
                      : "fill-[var(--icon-color)] hover:fill-[var(--icon-hover)]"
                      } transition-all duration-300 hover:scale-110 inline-block size-7 mt-1.5`}
                  ><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                  <span className="hidden text-white px-3">About</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
