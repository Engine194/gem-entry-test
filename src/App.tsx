import { useCallback, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "./components/icons";
import Tooltip from "./components/Tooltip";
import { cls } from "./helpers/styles";

const App = () => {
  const [unit, setUnit] = useState(0);
  const [size, setSize] = useState("1.0");
  const sizeRef = useRef<string>("1.0");
  const unitList: [number, string][] = [
    [0, "%"],
    [1, "px"],
  ];

  const handleValidateSize = useCallback((currentVal: string) => {
    let nextValue = currentVal.match(/[\d,.]/g)?.join("") || "";
    nextValue = nextValue.replace(",", ".")?.replace(/^0+/, "") || "0";
    setSize(nextValue);
  }, []);

  const handleBlur = useCallback(
    (val: string) => {
      if (+val > 100 && unit === 0) {
        setSize(sizeRef.current);
      } else {
        sizeRef.current = val;
      }
    },
    [unit]
  );

  const handleChangeUnitFactory = useCallback(
    (val: number) => {
      return () => {
        if (val === 0 && +size > 100) {
          sizeRef.current = "100";
          handleValidateSize("100");
        }
        setUnit(val);
      };
    },
    [size, handleValidateSize]
  );

  const handleMinus = useCallback(() => {
    setSize((prev) => {
      const nextSize = +prev - 1;
      if (prev === "0" || nextSize < 0) {
        sizeRef.current = "0";
        return prev;
      }
      const nextVal = nextSize.toString();
      sizeRef.current = nextVal;
      return nextVal;
    });
  }, []);

  const handlePlus = useCallback(() => {
    setSize((prev) => {
      const nextSize = +prev + 1;
      if ((prev === "100" && unit === 0) || nextSize > 100) {
        sizeRef.current = "100";
        return "100";
      }
      const nextVal = nextSize.toString();
      sizeRef.current = nextVal;
      return nextVal;
    });
  }, [unit]);

  const isDisabledMinus = +size === 0;
  const isDisabledPlus = +size >= 100 && unit === 0;

  return (
    <div className="text-xs w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100 text-[#aaa]">
      <div className="w-[17.5rem] min-h-[7.5rem] bg-[#151515]-800 p-4">
        <div className="flex items-center gap-x-2">
          <p className="min-w-[6.25rem]">{"Unit"}</p>
          <div className="flex-1 flex items-center rounded-[0.5rem] bg-[#212121] p-0.5 gap-x-0.5">
            {unitList.map(([val, label]) => (
              <button
                key={val}
                type="button"
                className={cls(
                  "cursor-pointer flex min-h-8 items-center px-2 justify-center min-w-[4.1875rem]",
                  unit === val
                    ? "text-[#f9f9f9] rounded-[0.375rem] bg-[#424242]"
                    : "text-[#aaa]"
                )}
                onClick={handleChangeUnitFactory(val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-x-2">
          <p className="min-w-[6.25rem]">{"Value"}</p>
          <div className="flex-1 text-[#f9f9f9] rounded-[0.5rem] flex items-center justify-between min-h-9 border border-transparent has-[input:focus-visible]:border-[#3C67FF] has-[input:hover]:bg-[#3b3b3b]">
            <Tooltip
              className="shrink-0"
              message="Value must greater than 0"
              show={isDisabledMinus}
            >
              <button
                className="p-2 not-disabled:cursor-pointer disabled:text-[#aaa] hover:not-disabled:bg-[#3b3b3b] rounded-s-[0.5rem]"
                type="button"
                disabled={isDisabledMinus}
                onClick={handleMinus}
              >
                <MinusIcon />
              </button>
            </Tooltip>
            <input
              className="flex-1 h-full p-2 max-w-[4.25rem] outline-none text-center"
              value={size}
              type="text"
              onChange={(e) => handleValidateSize(e.target.value)}
              onBlur={(e) => handleBlur(e.target.value)}
            />
            <Tooltip
              className="shrink-0"
              message="Value must smaller than 100"
              show={isDisabledPlus}
            >
              <button
                className="p-2 not-disabled:cursor-pointer disabled:text-[#aaa] hover:not-disabled:bg-[#3b3b3b] rounded-e-[0.5rem]"
                type="button"
                disabled={isDisabledPlus}
                onClick={handlePlus}
              >
                <PlusIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
