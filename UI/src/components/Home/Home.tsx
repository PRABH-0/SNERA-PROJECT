import React from 'react'
import { NavLink } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div>
      <li>
        <NavLink to='/Home' data-tip="Home" className={({ isActive }) =>`transition-colors  mx-3 my-1 hover:text-white tooltip tooltip-right ${isActive ? "text-white " : "text-[#a0a0a0] "}`} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"    fill="#a0a0a0" stroke="none" className="fill-current transition-colors inline-block size-6 my-1.5"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
          <span className="hidden text-white px-3">Home</span>
        </NavLink>
      </li>
    </div>
  )
}

export default Home
