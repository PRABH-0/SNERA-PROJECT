import React from 'react'
import Searchbar from '../ResponsiveSearch/searchbar'
import HamBurger from '../Hamburger/HamBurger'
import logo from '../../assets/synera-2.png';
import ThemeToggle from '../Theme/ThemeToggle';


const Navbar: React.FC = () => {
    console.log("Navbar Rendered");

    return (
        <div>
            <div className="fixed top-0 left-0 w-full bg-[#2c2c2c]  flex items-center justify-between  z-50 h-14 px-2">

                <HamBurger />
                <div className=" text-[#f2ffff] mx-2 text-lg font-medium md:absolute left-0   "><img className='min-w-25 max-w-25' src={logo} alt="" /></div>
                <div className='flex justify-between items-center md:w-[73vw] '>
                    <ThemeToggle/>
                    <Searchbar />
                    <div className="  flex justify-end items-center ">
                        <div className="dropdown ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="#ffffff" stroke="none" className="inline-block size-5.5 my-1.5  cursor-pointer"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                        </div>
                        <div className="dropdown ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="#ffffff" stroke="none" className="inline-block size-5.5 my-1.5 w-12 cursor-pointer"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
                        </div>
                        <div className="dropdown">
                            <div className="relative group w-10">
                                {/* Profile Avatar */}
                                <div className="btn btn-ghost btn-circle avatar cursor-pointer">
                                    <div className="w-10 rounded-full overflow-hidden">
                                        <img
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                            alt="Profile"
                                        />
                                    </div>
                                </div>

                                {/* Hover Box */}

                                <div
                                    className="absolute right-2 top-12 outline-[.5px] outline-[#777777]  w-60 bg-[#2c2c2c] text-white rounded    opacity-0 invisible 
                                group-hover:opacity-100 group-hover:visible
                                 transition-all duration-200 z-10"
                                >
                                    <div >
                                        <div className="flex gap-5 h-16  p-2  m-3">

                                            <img className='w-12 rounded-full'
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                alt="Profile"
                                            />

                                            <div className="flex flex-col">
                                                <div className="">Alex Smith</div>
                                                <div className="text-[12px] text-[#999999]">alex.smith@example.com</div>
                                            </div>
                                        </div>
                                        <div className="h-px  bg-[#777777] w-full" ></div>

                                        <div className="flex flex-col gap-3 m-3 ">
                                            <div className="flex justify-between">
                                                <div className=" text-[#999999] text-sm">Projects</div>
                                                <div className=" text-[12px] font-semibold">12</div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className=" text-[#999999] text-sm">Connections</div>
                                                <div className=" text-[12px] font-semibold">24</div>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <div className=" text-[#999999]">Teams</div>
                                                <div className=" text-[12px] font-semibold">8</div>
                                            </div>

                                        </div>

                                        <div className="h-1px  bg-[#777777] w-full" ></div>
                                        <div className="flex flex-col  ">
                                            <div className="flex gap-3 items-center h-10 hover:bg-[#3a3a3a] transition-[.2s] p-3 mt-1.5">
                                                <svg className="size-4" viewBox="0 0 24 24" fill='#a0a0a0'>
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                                <p>My Profile</p>
                                            </div>

                                            <div className="flex gap-3 items-center h-10 hover:bg-[#3a3a3a] transition-[.2s] p-3">
                                                <svg className="size-4" viewBox="0 0 24 24" fill='#a0a0a0'>
                                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                                </svg>
                                                <p>Create New</p>
                                            </div>
                                            <div className="flex gap-3 items-center h-10 hover:bg-[#3a3a3a] transition-[.2s] p-3">
                                                <svg className="size-4" viewBox="0 0 24 24" fill='#a0a0a0'> <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                                                </svg>
                                                <p>Settings</p>
                                            </div>
                                            <div className=" btn box-shadow-none bg-black hover:bg-[#404040] border-none outline-none text-white p-3 m-3">View Full Profile</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
