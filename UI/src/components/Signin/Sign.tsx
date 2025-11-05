import React,{useState} from 'react'
interface SignProps {
  onSwitch: () => void;
}
const Sign:React.FC<SignProps> = ({ onSwitch }) =>{
      const [Open, setOpen] = useState(false)
  return (
    <div>
      <button
                                onClick={() => setOpen(true)}
                                className="text-[var(--text-primary)] btn border-[var(--accent-color)] py-4 h-8 bg-[var(--bg-primary)]  "
                            >
                                Sign In
                            </button>

                            {Open && (
                                <form className=" fixed inset-0  backdrop-blur bg-[#000c]  m-auto flex justify-center items-center">
                                    <div className="bg-[var(--bg-primary)] p-6 rounded-xl w-[70vw] h-130 shadow-sm"> 
                                        <button onClick={() => setOpen(false)} className="cursor-pointer mt-6 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl relative left-220 bottom-10 ">&times;</button>
                                        <h1 className="text-[var(--text-primary)] text-3xl font-bold mb-6 text-center">Welcome Back</h1>
                                        <h4 className=" text-[var(--text-primary)] text-sm mt-6 font-medium">Email Address</h4>
                                        <input className="border w-full p-2  rounded-lg my-1 mb-4 placeholder:text-[#9999a6]" placeholder="Email" />
                                        <h4 className="text-[var(--text-primary)] my-1  text-sm font-medium ">Password</h4>
                                        <input className="border w-full p-2 mb-4 rounded-lg placeholder:text-[#9999a6]" placeholder="Password" type="password" />
                                        <button className=" text-[var(--button-text)] w-full p-2 mt-8 rounded-lg bg-[var(--accent-color)]">Sign In</button>
                                         
                                         <div className='border-t border-[var(--border-color)] mt-10'>
                                        <div className="text-[#9999a6] text-center">Don't have an account?  <button onClick={onSwitch} className="mt-6 underline text-[var(--text-primary)] font-bold cursor-pointer">Sign up here </button></div></div>
                                    </div>
                                </form>
                            )}
    </div>
  )
}

export default Sign
