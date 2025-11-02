import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sign from "../Signin/Sign";
import Register from "../Register/Register";
import { ThemeToggle } from "../Theme/ThemeToggle";


const Hero: React.FC = () => {
  
  
    return (<>

        <div>
            <nav>
                <div className="navbar bg-white shadow-sm fixed top-0 h-22 " >
                    <div className="flex-1 flex justify-between ">
                        <Link to='/Home' className=" text-[#2c2c2c]  mx-5 text-2xl font-bold">Synera</Link>
                        <div className="flex gap-5">
                            <ThemeToggle/>
                            <Sign/>
                            <Register/>

                        </div>
                    </div>
                </div>
            </nav>

        </div>
    </>
    )
};


export default Hero
