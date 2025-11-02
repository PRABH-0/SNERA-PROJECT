import React from 'react'
import { NavLink } from 'react-router-dom'
const More: React.FC = () => {
  return (
    <div>
      <li>
              <NavLink to='/More' data-tip="More" className={({ isActive }) =>`transition-colors  mx-3 my-1 hover:text-white tooltip tooltip-right ${isActive ? "text-white " : "text-[#a0a0a0] "}`} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#a0a0a0" stroke="none" className=" fill-current transition-colors inline-block size-6 my-1.5"><path d="M 4 13 h 6 c 0.55 0 1 -0.45 1 -1 V 4 c 0 -0.55 -0.45 -1 -1 -1 H 4 c -0.55 0 -1 0.45 -1 1 v 8 c 0 0.55 0.45 1 1 1 Z m 0 8 h 6 c 0.55 0 1 -0.45 1 -1 v -4 c 0 -0.55 -0.45 -1 -1 -1 H 4 c -0.55 0 -1 0.45 -1 1 v 4 c 0 0.55 0.45 1 1 1 Z m 10 0 h 6 c 0.55 0 1 -0.45 1 -1 v -8 c 0 -0.55 -0.45 -1 -1 -1 h -6 c -0.55 0 -1 0.45 -1 1 v 8 c 0 0.55 0.45 1 1 1 Z M 13 4 v 4 c 0 0.55 0.45 1 1 1 h 6 c 0.55 0 1 -0.45 1 -1 V 4 c 0 -0.55 -0.45 -1 -1 -1 h -6 c -0.55 0 -1 0.45 -1 1 Z"></path></svg>
                <span className=" hidden text-white px-3">More</span>
              </NavLink>
            </li>
    </div>
  )
}

export default More
