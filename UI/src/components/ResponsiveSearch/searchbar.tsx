import React, { useState } from "react";
import { Search } from "lucide-react"; // lucide-react icon lib

const Searchbar: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="flex items-center ">
            {/* Desktop Search */}

            <input type="text" placeholder='Search resources...' className="text-white bg-[#404040]  w-100  p-1 pl-1.5 rounded placeholder:text-[#a0a0a0] text-[14px] hidden md:flex " />

            {/* Mobile Icon */}
            <button
                className="block md:hidden p-2 rounded hover:bg-gray-700 transition"
                onClick={() => setShowSearch(!showSearch)}
            >
                 <Search className="text-white size-5.5 font-bold mx-2" />
            </button>

            {/* Mobile Search Bar */}
            {showSearch && (
                <input
                    type="text"
                    placeholder="Search..."
                    className="absolute  top-15  right-2 border border-white outline px-3 py-2 rounded bg-white  transition-all md:hidden"
                    autoFocus
                />
            )}
        </div>
    );
};

export default Searchbar;
