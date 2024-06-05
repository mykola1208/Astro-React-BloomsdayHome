import React, { useState, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { clsx } from "clsx/lite";
import { ReactSVG } from "react-svg";
import type { ITask } from ".";
import { statusNames, statuses } from "./statuses";
import Dropdown from "./Dropdown";
import ColoredSVG from "../ColoredSVG";

interface TaskCardProps {
  task: ITask;
  position: number;
  onStatusChange: (id: number, newStatus: ITask["status"]) => void;
}

const buttonClasses = {
  "not-started": "bg-alert-light text-alert",
  "working-on-it": "bg-warning-light text-darkgreen",
  completed: "bg-completed-light text-darkgreen",
  hidden: "bg-gray-20 text-gray-50",
};

const TaskCard = ({ task, position, onStatusChange }: TaskCardProps) => {
  const [open, setOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleStatusChange = (newStatus: ITask["status"]) => {
    onStatusChange(task.id, newStatus);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <Draggable draggableId={`${task.id}`} index={position}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className={clsx(
              "max-w-sm bg-white border-l-4 shadow-inner pt-3 pr-2 pb-4 pl-4",
              task.status == "not-started" && "border-l-alert",
              task.status == "working-on-it" && "border-l-warning",
              task.status == "completed" && "border-l-completed",
              task.status == "hidden" && "border-l-gray-50"
            )}
            style={{
              opacity: snapshot.isDragging ? 0.9 : 1,
              transform: snapshot.isDragging ? "rotate(-2deg)" : "",
              borderTop: "1px solid #C1C7CD",
              borderBottom: "1px solid #C1C7CD",
              borderRight: "1px solid #C1C7CD",
            }}
          >
            <div className="accordion-item group flex flex-col gap-3">
              <button
                className="flex items-center cursor-pointer rounded-lg w-full"
                onClick={handleToggle}
              >
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ReactSVG
                      src={`/icons/${task.status}.svg`}
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                    <span className="text-darkgreen text-left text-lg leading-4 font-medium">
                      <span className="text-sm font-medium">
                        {task.category}
                      </span>
                    </span>
                  </div>
                  <ReactSVG
                    src="/icons/chevron.svg"
                    className={`shrink-0 transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              <div className="ml-10 flex flex-col gap-2">
                <p className="text-xl font-medium text-darkgreen">
                  {task.title}
                </p>
                {open && (
                  <p className="font-normal text-base text-darkgreen">
                    {task.content}
                  </p>
                )}
              </div>
            </div>
            <div className="relative mt-5">
              <button
                className={clsx(
                  `ml-10 py-3 px-4 rounded-lg`,
                  task.status == "not-started" && "bg-alert-light text-alert",
                  task.status == "working-on-it" &&
                    "bg-warning-light text-darkgreen",
                  task.status == "completed" &&
                    "bg-completed-light text-darkgreen",
                  task.status == "hidden" && "bg-gray-20 text-gray-50"
                )}
                type="button"
                onClick={handleDropdownToggle}
              >
                <p className="px-4 font-medium">{statusNames[task.status]}</p>
              </button>
              {dropdownOpen && (
                <div className="absolute ml-6">
                  <Dropdown dropdownClassName="status-dropdown">
                    <ul className="py-2 text-sm text-gray-700 flex flex-col items-center justify-center gap-3">
                      {statuses.map((status, index) => (
                        <li
                          key={`status-dropdown-${status}-${index}`}
                          className="w-full"
                        >
                          <button
                            className={`py-3 px-4 rounded-lg ${buttonClasses[status]} w-full`}
                            onClick={() => handleStatusChange(status)}
                          >
                            <p className="px-3">{statusNames[status]}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-5">
              <div className="flex gap-4">
                <button>
                  <ColoredSVG
                    src="/icons/view.svg"
                    color={`${clsx(
                      (task.status == "not-started" ||
                        task.status == "working-on-it") &&
                        "#9FBCAD",
                      task.status == "completed" && "#1C4835",
                      task.status == "hidden" && "#C1C7CD"
                    )}`}
                  />
                </button>
                <button>
                  <ColoredSVG
                    src="/icons/upload.svg"
                    color={`${clsx(
                      task.status == "not-started" && "#9FBCAD",
                      task.status == "hidden" && "#C1C7CD",
                      (task.status == "completed" ||
                        task.status == "working-on-it") &&
                        "#1C4835"
                    )}`}
                  />
                </button>
                <button>
                  <ColoredSVG
                    src="/icons/download.svg"
                    color={`${clsx(
                      (task.status == "not-started" ||
                        task.status == "working-on-it") &&
                        "#9FBCAD",
                      task.status == "completed" && "#1C4835",
                      task.status == "hidden" && "#C1C7CD"
                    )}`}
                  />
                </button>
                <button>
                  <ColoredSVG
                    src="/icons/share.svg"
                    color={`${clsx(
                      (task.status == "not-started" ||
                        task.status == "working-on-it") &&
                        "#9FBCAD",
                      task.status == "completed" && "#1C4835",
                      task.status == "hidden" && "#C1C7CD"
                    )}`}
                  />
                </button>
                <button>
                  <ColoredSVG
                    src="/icons/trash.svg"
                    color={`${clsx(
                      (task.status == "not-started" ||
                        task.status == "working-on-it") &&
                        "#9FBCAD",
                      task.status == "completed" && "#1C4835",
                      task.status == "hidden" && "#C1C7CD"
                    )}`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-1 pr-2">
                <ColoredSVG
                  src="/icons/calendar.svg"
                  color={`${clsx(
                    (task.status == "not-started" ||
                      task.status == "working-on-it" ||
                      task.status == "completed") &&
                      "#1C4835",
                    task.status == "hidden" && "#C1C7CD"
                  )}`}
                />
                <p
                  className={`text-base font-medium ${clsx(
                    task.status == "hidden" && "text-gray-30",
                    task.status != "hidden" && "text-darkgreen"
                  )}`}
                >
                  Due
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
