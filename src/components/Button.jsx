/* eslint-disable react/prop-types */


import { useSelector,useDispatch } from 'react-redux';
import { handleClick } from '../themeSlice';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const dispatch = useDispatch();
  const {  initialState } = useSelector((state) => state.theme);

  return (
    <button
      type="button"
      onClick={() => dispatch(handleClick(initialState))}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;