import React from 'react'
import { NavLink } from 'react-router-dom'
const Feedback: React.FC = () => {
  return (
    <div>
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
    </div>
  )
}

export default Feedback
