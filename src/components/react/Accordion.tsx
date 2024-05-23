import React, {
  useState,
  useEffect,
  useRef,
  type PropsWithChildren,
} from "react";
import { ReactSVG } from "react-svg";
import Checkbox from "./Checkbox";

interface AccordionMenuItem {
  title: string;
  checked: boolean;
  type: string;
}

const Accordion: React.FC<PropsWithChildren<{ title: string }>> = ({
  children,
  title,
}) => {
  const [open, setOpen] = useState(true);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div className="accordion" role="presentation">
      <div className="accordion-item group bg-cream-light border-b border-x border-sage">
        <button
          className="flex items-center space-x-2 gap-2 focus:bg-cream hover:bg-cream cursor-pointer rounded-lg px-2 py-3 w-full"
          onClick={handleToggle}
        >
          <div className="w-24 flex items-center justify-between">
            <span className="text-darkgreen text-left text-lg leading-4 font-medium">
              <span className="group-open:font-bold">{title}</span>
            </span>
            <ReactSVG
              src="/icons/chevron.svg"
              width={24}
              height={24}
              className={`shrink-0 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
        {open && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Accordion;
