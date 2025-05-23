import { IconPropsType } from ".";
import { cls } from "../../helpers/styles";

const MinusIcon = (props?: IconPropsType) => {
  const {
    className,
    width = 20,
    height = 20,
    fill = "currentColor",
  } = props || {};
  return (
    <svg
      className={cls(className)}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 9.75C4 9.33579 4.33579 9 4.75 9L15.25 9C15.6642 9 16 9.33579 16 9.75C16 10.1642 15.6642 10.5 15.25 10.5H4.75C4.33579 10.5 4 10.1642 4 9.75Z"
        fill={fill}
      />
    </svg>
  );
};

export default MinusIcon;
