import React from 'react'
import { NavLink } from 'react-router-dom'

const About: React.FC = () => {
  return (
    <div>
      <li>
        <NavLink to='/About' data-tip="About" className={({ isActive }) =>`transition-colors  mx-3 my-1 hover:text-white tooltip tooltip-right ${isActive ? "text-white " : "text-[#a0a0a0] "}`} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#a0a0a0" stroke="none" className=" fill-current transition-colors inline-block size-6 my-1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          <span className="hidden text-white px-3">About</span>
        </NavLink>
      </li>
    </div>
  )
}

export default About 