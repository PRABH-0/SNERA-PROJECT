import React, { useState } from "react";
import { Search } from "lucide-react"; // lucide-react icon lib

const Searchbar: React.FC = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="flex items-center ">
            {/* Desktop Search */}

            <input type="text" placeholder='Search resources...' className="text-[var(--text-primary)] bg-[var(--bg-tertiary)] border border-[var(--border-color)] w-120  p-2 pl-3 rounded-lg placeholder:text-[var(--text-secondary)] text-[16px] hidden md:flex " />

            {/* Mobile Icon */}
            <button
                className="block md:hidden p-2 rounded hover:bg-gray-700 transition"
                onClick={() => setShowSearch(!showSearch)}
            >
                 <Search className="text-[var(accent-color)] size-5.5 font-bold mx-2" />
            </button>

            {/* Mobile Search Bar */}
            {showSearch && (
                <input
                    type="text"
                    placeholder="Search..."
                    className="absolute  top-15  right-2 border border-white outline px-3 py-2 rounded text-[var(--text-primary)] bg-[var(--bg-tertiary)] border border-[var(--border-color)] placeholder:text-[var(--text-secondary)]  transition-all md:hidden"
                    autoFocus
                />
            )}
        </div>
    );
};

export default Searchbar;
