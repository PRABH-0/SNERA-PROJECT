import React from 'react'
import { NavLink } from 'react-router-dom'

const Profile: React.FC = () => {
  return (
    <div>
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
    </div>
  )
}

export default Profile
