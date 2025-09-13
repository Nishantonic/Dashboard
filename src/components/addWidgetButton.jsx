import { IoMdAdd } from "react-icons/io";

const AddWidgetButton = () => {
  return (
    <>
     

      <div>
        <button
          type="button"
          className="flex h-auto w-auto items-center justify-center gap-x-1 text-gray-500 text-sm bg-white border px-4 py-2 rounded-md hover:scale-95 duration-150 ease-in"
        >
          {" "}
          <IoMdAdd className="h-5 w-5" /> Add Widget{" "}
        </button>
      </div>
    </>
  );
};

export default AddWidgetButton;
