import { useState } from "react";

const Search = () => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <form className="relative">
      <input
        type="text"
        className={`rounded-l ${
          !active ? "bg-primary" : "bg-white"
        } border-none`}
        onFocus={() => setActive((prev) => !prev)}
      />
      {!active && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 absolute left-2 top-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      )}
      <button className="bg-secondary text-center p-2 rounded-r">
        Filters
      </button>
    </form>
  );
};

export default Search;
