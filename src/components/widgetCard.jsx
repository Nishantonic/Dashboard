import axios from "axios";
import { IoMdClose } from "react-icons/io";

const WidgetCard = ({
  uniqueKey,
  widgetTitle,
  widgetText,
  widgetImage,
  categoryId,
}) => {

  const handleClick = async () => {
    try {
     
      const response = await axios.get(
        `http://localhost:8000/categories/${categoryId}`
      );
      const category = response.data;

      
      const updatedWidgets = category.widgets.filter(
        (widget) => widget.id !== uniqueKey
      );

    
      await axios.put(`http://localhost:8000/categories/${categoryId}`, {
        ...category,
        widgets: updatedWidgets,
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      key={uniqueKey}
      className="flex flex-col h-auto w-96 p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition duration-300"
    >
      
      <div className="flex justify-between items-start mb-3">
        <h1 className="text-lg font-bold text-gray-900">{widgetTitle}</h1>
        <button onClick={handleClick} className="text-gray-500 hover:text-red-500">
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>

      {widgetImage ? (
        <img
          src={widgetImage}
          alt={widgetTitle}
          className="w-full h-40 object-contain rounded-md mb-3 bg-gray-50"
        />
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-400 text-sm rounded-md mb-3">
          No image available
        </div>
      )}

      {widgetText ? (
        <p className="text-sm text-gray-700">{widgetText}</p>
      ) : (
        <p className="text-sm italic text-gray-500">No text data available</p>
      )}
    </div>
  );
};

export default WidgetCard;
