import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import WidgetCard from "./widgetCard";
import SidebarComponent from "./widgetMenuSide";

const Dashboard = () => {
  const [Open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Base_URL = "http://localhost:8000/categories";

  const toggle = () => setOpen(!Open);

  useEffect(() => {
    axios
      .get(Base_URL)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-screen text-3xl font-bold justify-center items-center animate-pulse text-blue-600">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-screen text-2xl font-semibold justify-center items-center text-red-600">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <Navbar data={data} />

      <div className="w-full bg-gray-100 border-b px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          CNAPP Dashboard
        </h1>
        <SidebarComponent onClick={toggle} data={data} />
      </div>

      <div className="w-full px-8 py-6 bg-gray-50 min-h-screen">
        {data &&
          data.map((category) => (
            <div
              key={category.id}
              className="w-full mb-10 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                {category.name}
              </h2>

              <div className="flex flex-wrap gap-4">
                {category.widgets.length > 0 ? (
                  category.widgets.map((widget) => (
                    <div id={`widget-${widget.id}`} key={widget.id}>
                      <WidgetCard
                        categoryId={category.id}
                        uniqueKey={widget.id}
                        widgetTitle={widget.title}
                        widgetText={widget.text}
                        widgetImage={widget.image}
                        error={error}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">
                    No widgets available in this category.
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Dashboard;
