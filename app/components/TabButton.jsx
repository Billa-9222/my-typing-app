
const TabButton = ({ selected, selectTab, children }) => {
  const buttonClasses = selected
    ? "text-white border-b-2 border-purple-500"
    : "text-gray-200 border-b-2 border-transparent hover:border-[#C7FF00]";
  return (
    <button
      onClick={selectTab}
      className={`mx-4 pb-2 transition-all duration-300 ${buttonClasses}`} style={selected ? { borderColor: "#C7FF00"} : {}}
    >
      {children}
    </button>
  );
};

export default TabButton