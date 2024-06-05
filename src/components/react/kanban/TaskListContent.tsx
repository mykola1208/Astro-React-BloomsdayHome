import { DragDropContext } from "@hello-pangea/dnd";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import { getTasksByStatus, statuses, type TasksByStatus } from "./statuses";
import type { ITask } from ".";

const unorderedTasks: ITask[] = [
  {
    id: 1,
    title: "Task 1",
    content: "Content 1",
    category: "Debt",
    status: "not-started",
    index: 0,
  },
  {
    id: 2,
    title: "Task 2",
    content: "Content 2",
    category: "Assets",
    status: "not-started",
    index: 1,
  },
  {
    id: 3,
    title: "Task 3",
    content: "Content 3",
    category: "Debt",
    status: "not-started",
    index: 2,
  },
  {
    id: 4,
    title: "Task 4",
    content: "Content 4",
    category: "Assets",
    status: "working-on-it",
    index: 0,
  },
  {
    id: 5,
    title: "Task 5",
    content: "Content 5",
    category: "Debt",
    status: "working-on-it",
    index: 1,
  },
  {
    id: 6,
    title: "Task 6",
    content: "Content 6",
    category: "Assets",
    status: "completed",
    index: 0,
  },
  {
    id: 7,
    title: "Task 7",
    content: "Content 7",
    category: "Debt",
    status: "hidden",
    index: 0,
  },
];

const TaskListContent = () => {
  const [tasksByStatus, setTasksByStatus] = useState<TasksByStatus>(
    getTasksByStatus([])
  );

  useEffect(() => {
    const newTasksByStatus = getTasksByStatus(unorderedTasks);
    setTasksByStatus(newTasksByStatus);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || isEqual(source, destination)) return; // Return early if source and destination are the same

    const sourceTasks = [...tasksByStatus[source.droppableId]];
    const destTasks = [...tasksByStatus[destination.droppableId]];

    const movedTask = sourceTasks[source.index];
    movedTask.status = destination.droppableId;

    sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    const newTasksByStatus = {
      ...tasksByStatus,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    };

    setTasksByStatus(newTasksByStatus);
  };

  const handleStatusChange = (id: number, newStatus: ITask["status"]) => {
    const updatedTasks = unorderedTasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasksByStatus(getTasksByStatus(updatedTasks));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {statuses.map((status) => (
          <TaskColumn
            status={status}
            tasks={tasksByStatus[status]}
            key={status}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskListContent;
