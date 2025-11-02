import React,{useState} from 'react'

const Sign:React.FC = () => {
      const [Open, setOpen] = useState(false)
  return (
    <div>
      <button
                                onClick={() => setOpen(true)}
                                className="text-[#2c2c2c] btn border-[#2c2c2c] rounded h-8 bg-white"
                            >
                                Sign In
                            </button>

                            {Open && (
                                <form className=" fixed inset-0  backdrop-blur bg-[#000c] flex justify-center items-center">
                                    <div className="bg-white p-6 rounded-xl w-180 h-110"> 
                                        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>
                                        <h4 className=" text-sm mt-6 font-medium">Email Address</h4>
                                        <input className="border w-full p-2  rounded-lg my-1 mb-4 placeholder:text-[#9999a6]" placeholder="Email" />
                                        <h4 className="my-1  text-sm font-medium">Password</h4>
                                        <input className="border w-full p-2 mb-4 rounded-lg placeholder:text-[#9999a6]" placeholder="Password" type="password" />
                                        <button className="  text-white w-full p-2 mt-8 rounded-lg bg-[#2c2c2c]">Sign In</button>
                                        <button onClick={() => setOpen(false)} className="mt-6 text-gray-600">Close</button>
                                        <div className="text-[#9999a6] text-center">Don't have an account?  <button className="underline text-[#2c2c2c] font-bold cursor-pointer">Sign up here </button></div>
                                    </div>
                                </form>
                            )}
    </div>
  )
}

export default Sign
