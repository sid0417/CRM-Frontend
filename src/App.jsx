import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { setColor, setMode, setThemeSettings } from "./themeSlice";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import "./App.css";

// Lazy loading for better performance
const Ecommerce = lazy(() => import("./pages/Ecommerce"));
const Orders = lazy(() => import("./pages/Orders"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Employees = lazy(() => import("./pages/Employees"));
const Customers = lazy(() => import("./pages/Customers"));
const Kanban = lazy(() => import("./pages/Kanban"));
const Editor = lazy(() => import("./pages/Editor"));
const ColorPicker = lazy(() => import("./pages/ColorPicker"));
const Line = lazy(() => import("./pages/Charts/Line"));
const Area = lazy(() => import("./pages/Charts/Area"));
const Bar = lazy(() => import("./pages/Charts/Bar"));
const Pie = lazy(() => import("./pages/Charts/Pie"));
const Financial = lazy(() => import("./pages/Charts/Financial"));
const ColorMapping = lazy(() => import("./pages/Charts/ColorMapping"));
const Pyramid = lazy(() => import("./pages/Charts/Pyramid"));
const Stacked = lazy(() => import("./pages/Charts/Stacked"));

// Loading Component
const Loading = () => (
  <div className="text-center p-5 text-xl">
    <div className="loadingio-spinner-bean-eater-2by998twmg8">
      <div className="ldio-yzaezf3dcmj">
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const { activeMenu, themeSettings, currentColor, currentMode } = useSelector(
    (state) => state.theme
  );

  useEffect(() => {
    const savedThemeColor = localStorage.getItem("themeColor");
    const savedThemeMode = localStorage.getItem("themeMode");

    if (savedThemeColor) dispatch(setColor(savedThemeColor));
    if (savedThemeMode) dispatch(setMode(savedThemeMode));
  }, [dispatch]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* Settings Button */}
          <div className="fixed right-4 bottom-4 z-50">
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                onClick={() => dispatch(setThemeSettings(true))}
                style={{ background: currentColor, borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Sidebar */}
          <div
            className={`fixed ${
              activeMenu ? "w-72" : "w-0"
            } sidebar dark:bg-secondary-dark-bg bg-white transition-all duration-300`}
          >
            <Sidebar />
          </div>

          {/* Main Content */}
          <div
            className={`min-h-screen w-full transition-all duration-300 ${
              activeMenu ? "md:ml-72" : "flex-1"
            } bg-main-bg dark:bg-main-dark-bg`}
          >
            {/* Navbar */}
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            {/* Theme Settings */}
            {themeSettings && <ThemeSettings />}

            {/* Page Routes */}
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* Pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* Charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </Suspense>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
