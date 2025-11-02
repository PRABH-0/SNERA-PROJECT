import React from 'react'
import { NavLink } from 'react-router-dom'
const Chat: React.FC = () => {
  return (
    <div>
      <li>
        <NavLink to='/Chat'  data-tip="Chat" className={({ isActive }) =>`transition-colors  mx-3 my-1.5 hover:text-white tooltip tooltip-right ${isActive ? "text-white " : "text-[#a0a0a0] "}`} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="#a0a0a0" stroke="none" className=" fill-current transition-colors inline-block size-6 my-1.5"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
          <span className=" hidden text-white px-3">Chat</span>
        </NavLink>
      </li>
    </div>
  )
}

export default Chat
