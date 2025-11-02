import React from 'react'
import { NavLink } from 'react-router-dom'

const Match: React.FC = () => {
  return (
    <div>
      <li>
        <NavLink to='/Match' data-tip="Match" className={({ isActive }) =>`transition-colors  mx-3 my-1 hover:text-white tooltip tooltip-right ${isActive ? "text-white " : "text-[#a0a0a0] "}`} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"   fill="#a0a0a0" stroke="none" className=" fill-current transition-colors inline-block size-6 my-1.5"><path d="M 20 6 h -2.18 c 0.11 -0.31 0.18 -0.65 0.18 -1 c 0 -1.66 -1.34 -3 -3 -3 c -1.05 0 -1.96 0.54 -2.5 1.35 l -0.5 0.67 l -0.5 -0.68 C 10.96 2.54 10.05 2 9 2 C 7.34 2 6 3.34 6 5 c 0 0.35 0.07 0.69 0.18 1 H 4 c -1.11 0 -1.99 0.89 -1.99 2 L 2 19 c 0 1.11 0.89 2 2 2 h 16 c 1.11 0 2 -0.89 2 -2 V 8 c 0 -1.11 -0.89 -2 -2 -2 Z m -5 -2 c 0.55 0 1 0.45 1 1 s -0.45 1 -1 1 s -1 -0.45 -1 -1 s 0.45 -1 1 -1 Z M 9 4 c 0.55 0 1 0.45 1 1 s -0.45 1 -1 1 s -1 -0.45 -1 -1 s 0.45 -1 1 -1 Z"></path></svg>
          <span className="hidden text-white px-3">Match</span>
        </NavLink>
      </li>
    </div>
  )
}

export default Match
