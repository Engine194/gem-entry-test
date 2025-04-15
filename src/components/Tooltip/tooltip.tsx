import { cls } from "../../helpers/styles";
import classes from "./tooltip.module.css";

const Tooltip = (props: {
  message: string;
  className?: string;
  children: React.ReactNode;
  show: boolean;
}) => {
  const { message, className, children, show } = props;
  return (
    <div className={cls(className, "relative")}>
      {show ? (
        <div
          className={cls(
            "absolute bottom-[calc(100%_+_0.75rem)] left-[50%] translate-x-[-50%] bg-[#3b3b3b] py-[0.3125rem] px-2 rounded-[0.5rem] w-auto whitespace-nowrap",
            classes.tooltip
          )}
        >
          {message}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Tooltip;
