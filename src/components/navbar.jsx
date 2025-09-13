import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (widgetId) => {
  const element = document.getElementById(`widget-${widgetId}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  setOpen(false);
  setSearchTerm(""); // clear search box
};

  
  const extractWidgets = (data) => {
    return data.flatMap((category) =>
      category.widgets.map((widget) => ({
        title: widget.title,
        category: category.name,
      }))
    );
  };

  const widgets = extractWidgets(data);

  const filteredWidgets = widgets.filter((widget) =>
    widget.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFocus = () => setOpen(true);
  const handleBlur = () => setTimeout(() => setOpen(false), 200);

  return (
    <nav className="bg-white border-b p-4 h-14 w-full flex justify-between items-center relative">
      <h1 className="text-gray-800 text-base font-bold">Dashboard</h1>

      {/* 🔹 Search */}
      <div className="flex flex-col w-80">
        <div className="relative">
          <FaSearch className="absolute h-3.5 w-3.5 left-2 top-2.5 text-gray-400" />
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search widget"
            className="px-6 py-1.5 w-full bg-gray-50 rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {/* 🔹 Dropdown */}
        {open && searchTerm.length > 0 && (
          <ul className="absolute right-0 top-12 w-80 bg-white rounded-md shadow-lg border max-h-64 overflow-y-auto z-50">
            <li className="text-xs text-gray-400 px-3 py-2 border-b">
              Search Results
            </li>

            {filteredWidgets.length > 0 ? (
              filteredWidgets.map((widget, index) => (
  <li
    key={index}
    onClick={() => handleSelect(widget.id)}
    className="px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer"
  >
    <span className="font-medium">{widget.title}</span>
    <span className="text-xs text-gray-400 ml-2">
      ({widget.category})
    </span>
  </li>
))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
