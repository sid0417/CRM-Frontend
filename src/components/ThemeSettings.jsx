import { MdOutlineCancel } from "react-icons/md";
import { BsCheck } from "react-icons/bs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useSelector, useDispatch } from "react-redux";
import { setColor, setMode, setThemeSettings } from "../themeSlice";
import { themeColors } from "../data/dummy";

const ThemeSettings = () => {
  const dispatch = useDispatch();
  const { currentMode, currentColor } = useSelector((state) => state.theme);

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    dispatch(setMode(newMode));
    localStorage.setItem("themeMode", newMode); // Ensure persistence
    dispatch(setThemeSettings(false));
  };

  const handleColorChange = (color) => {
    dispatch(setColor(color)); // ✅ Redux updates state
    localStorage.setItem("themeColor", color); // ✅ Persist in localStorage
    dispatch(setThemeSettings(false));
  };

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={() => dispatch(setThemeSettings(false))}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>

        {/* Theme Mode Selection */}
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl">Theme Option</p>
          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={handleModeChange}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              className="cursor-pointer"
              onChange={handleModeChange}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>

        {/* Theme Color Selection */}
        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <TooltipComponent
                key={index}
                content={item.name}
                position="TopCenter"
              >
                <div className="relative mt-2 cursor-pointer flex gap-5 items-center">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => handleColorChange(item.color)}
                  >
                    {item.color === currentColor && (
                      <BsCheck className="ml-2 text-2xl text-white" />
                    )}
                  </button>
                </div>
              </TooltipComponent>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
