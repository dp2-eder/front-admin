export const SearchBar = () => {
  return (
    <div className="relative w-full">
      <input
        type="search"
        placeholder="Buscar en el menú..."
        className="w-full h-14 px-5 pr-12 py-3 text-xl bg-white rounded-[10px] border-[0.5px] border-solid border-[#ecf1f4] text-onyx placeholder-onyx focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="absolute inset-y-0 right-0 w-6 h-6 text-onyx mr-5 my-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  );
};
