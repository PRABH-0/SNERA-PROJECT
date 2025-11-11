import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
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
    </div>
  )
}

export default Home
