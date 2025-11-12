import React from 'react'
import { NavLink } from 'react-router-dom'
const Projects: React.FC = () => {
  return (
    <div>
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
    </div>
  )
}

export default Projects
