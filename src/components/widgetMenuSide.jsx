import { useRef } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import WidgetTabs from "./widgetTabs";

const SidebarComponent = ({ data }) => {
  const modalRef = useRef(null);

  const hideModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = "none";
    }
  };

  const showModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = "flex"; // flex so content centers nicely
    }
  };

  return (
    <div>
      {/* 🔹 Button */}
      <button
        onClick={showModal}
        type="button"
        className="flex h-auto w-auto items-center justify-center gap-x-1 text-gray-500 text-sm bg-white border px-4 py-2 rounded-md hover:scale-95 duration-150 ease-in"
      >
        <IoMdAdd className="h-5 w-5 " /> Add Widget
      </button>

      {/* 🔹 Modal Overlay */}
      <div
        style={{ display: "none" }}
        ref={modalRef}
        className="fixed inset-0 z-10 bg-black bg-opacity-40 flex justify-end"
        onClick={hideModal} // close if clicked outside
      >
        {/* 🔹 Modal Content */}
        <div
          className="h-full w-96 bg-white overflow-y-scroll"
          onClick={(e) => e.stopPropagation()} // prevent close if clicked inside
        >
          {/* Header */}
          <nav className="flex items-center justify-between px-6 h-10 w-auto bg-gray-700 text-white font-semibold">
            <h2>Add Widget</h2>
            <button onClick={hideModal} type="button">
              <IoMdClose className="h-5 w-5" />
            </button>
          </nav>

          <h2 className="px-4 py-4 text-base">
            Personalise your Dashboard by adding the following widget
          </h2>

          {/* Body */}
          <div className="flex flex-col justify-between gap-y-4 px-4 pb-6">
            <WidgetTabs data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
