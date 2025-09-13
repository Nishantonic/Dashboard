import { useState } from "react";
import CustomWidgetForm from "./customWidgetForm";
import axios from "axios";

function WidgetTabs({ data }) {
  
  const [activeTab, setActiveTab] = useState(0);
  
  const [checkedTabs, setCheckedTabs] = useState(() => {
    if (!data) return {};
    const initialCheckedTabs = {};
    data.forEach((category) => {
      category.widgets.forEach((tab) => {
        initialCheckedTabs[tab.id] = true;
      });
    });

    return initialCheckedTabs;
  });

  
  const handleCheckboxChange = (id, tabActive) => {
    setCheckedTabs(async (prevCheckedTabs) => {
      
      const updatedCheckedTabs = {
        ...prevCheckedTabs,
        [id]: !prevCheckedTabs[id],
      };
      
      if (!updatedCheckedTabs[id]) {
        try {
          
          const response = await axios.get(
            `http://localhost:8000/categories/${tabActive}`
          );
          const category = response.data;

          
          const updatedWidgets = category.widgets.filter(
            (widget) => widget.id !== id
          );


          await axios.put(`http://localhost:8000/categories/${tabActive}`, {
            ...category,
            widgets: updatedWidgets,
          });

          console.log(`Deleted widget with id: ${id}`);
          window.location.reload();
        } catch (error) {
          console.error(`Error deleting widget with uniqueKey: ${id}`, error);
        }
      }

      return updatedCheckedTabs;
    });
  };

  return (
    <>
      {" "}
      <div className="w-full h-full flex flex-col mx-auto">

        <div className="flex border-b  border-gray-200">
          {data &&
            data.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex-1 py-2 px-4 text-center ${
                  activeTab === index
                    ? "border-b-2 border-gray-700 text-gray-700"
                    : "text-gray-400"
                } focus:outline-none`}
              >
                {tab.id}
              </button>
            ))}
        </div>
       
        <div className=" h-56 flex gap-3 my-5 mx-5 flex-col w-full overflow-y-scroll">
          {data &&
            data[activeTab].widgets.map((widget) => (
              <div key={widget.id} className="flex">
                <input
                  id="checkbox"
                  checked={!!checkedTabs[widget.id]}
                  onChange={() =>
                    handleCheckboxChange(widget.id, data[activeTab].id)
                  }
                  type="checkbox"
                  value={widget.id}
                  className="w-4 h-4 bg-gray-100 accent-gray-700 border-gray-300 rounded "
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  {widget.title}
                </label>
              </div>
            ))}
        </div>

        <CustomWidgetForm category={data && data[activeTab].id} />
      </div>{" "}
    </>
  );
}

export default WidgetTabs;
