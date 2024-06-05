import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { ReactSVG } from "react-svg";
import type { ITask } from ".";
import { statusNames } from "./statuses";
import TaskCard from "./TaskCard";
import Dropdown from "./Dropdown";

interface TaskColumnProps {
  status: ITask["status"];
  tasks: ITask[];
  onStatusChange: (id: number, newStatus: ITask["status"]) => void;
}

const sorts = ["Sort by Category", "Sort A-Z", "Sort Z-A"];

const TaskColumn = ({ status, tasks, onStatusChange }: TaskColumnProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="basis-1/4 border rounded-lg border-sage p-3 flex flex-col h-[787px]">
      <div className="flex justify-between text-darkgreen text-xl font-bold">
        <p className="text-xl font-bold">
          {statusNames[status]} / {tasks.length}
        </p>
        <div className="relative">
          <button onClick={handleDropdownToggle}>
            <ReactSVG src="/icons/3dots.svg" width={25} height={25} />
          </button>
          {dropdownOpen && (
            <div className="absolute ml-[-150px]">
              <Dropdown dropdownClassName="sort-dropdown">
                <ul className="py-2 text-sm text-gray-700 flex flex-col  gap-3">
                  {sorts.map((sort, index) => (
                    <li
                      key={`sort-dropdown-${status}-${index}`}
                      className="w-full"
                    >
                      <button className="py-3 px-4 w-full">
                        <p className="text-darkgreen font-medium text-sm text-left">
                          {sort}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </Dropdown>
            </div>
          )}
        </div>
      </div>
      <Droppable droppableId={status}>
        {(droppableProvided, snapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className={`flex flex-col rounded-md p-1 scrollbar-hide overflow-auto ${
              snapshot.isDraggingOver ? "bg-[#dadadf]" : ""
            }`}
          >
            {tasks.map((task, position) => (
              <div className="mt-2" key={`${task.id}-${position}`}>
                <TaskCard
                  task={task}
                  position={position}
                  onStatusChange={onStatusChange}
                />
              </div>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
