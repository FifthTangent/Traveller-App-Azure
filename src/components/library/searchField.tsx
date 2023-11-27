"use client"
import { useEffect, useState, FormEvent } from 'react';

export default function SearchBar({ 
    callback, 
    className = '', 
    set=''  // Sets the current search field
} : {
    callback: any
    className?: string
    set?: string
}) {
    const [setSearchField, setsetSearchField] = useState<string | null>(set);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        callback(setSearchField); // Update the parent's state here
    };

    // Trigger Callback when the Searchfield is updated
    useEffect(() => { callback(setSearchField) }, [setSearchField, callback]);
  
    return (
        <form
            onSubmit={handleSubmit}
            className={`${className} border rounded-md`}
        >
            <div
                id="InputField"
                className={`flex flex-row focus:ring-grey-500 focus:border-white`}
            >
                <button
                    className="flex items-center pl-2 pr-1 pointer-events-none"
                    type="submit"
                >
                    <svg
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </button>
                <input
                    type="search"
                    id="search-dropdown"
                    className="text-sm bg-transparent border-none focus:ring-transparent backdrop-blur w-full mr-1 py-1 px-0"
                    placeholder="Search"
                    value={ setSearchField as string }
                    onChange={(e) => { setsetSearchField(e.target.value.trim()) }}
                />
            </div>
        </form>
    );
}