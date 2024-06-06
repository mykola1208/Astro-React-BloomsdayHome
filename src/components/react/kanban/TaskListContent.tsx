import { DragDropContext } from "@hello-pangea/dnd";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import TaskColumn from "./TaskColumn";
import { getTasksByStatus, statuses, type TasksByStatus } from "./statuses";
import { GET_TASKS } from "../../../apollo/queries/getTasks";
import { createApolloClient } from "../../../apollo/client";
import type { ITask } from ".";

const TaskListContent = () => {
  const [tasksByStatus, setTasksByStatus] = useState<TasksByStatus>(
    getTasksByStatus([])
  );

  const [tasks, setTasks] = useState<any>([]);

  const { createClient } = createApolloClient();

  
  useEffect(() => {
    async function getTasks () {
      const client = await createClient();
      const { data } = await client.query({
        query: GET_TASKS,
      });

      setTasks(data.tasks.map(item => ({...item})))
    }
    getTasks()
  }, []);

  useEffect(() => {
    if(tasks && tasks.length!==0){
      setTasksByStatus(getTasksByStatus(tasks));
    }
  }, [tasks]);
  

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || isEqual(source, destination)) return; // Return early if source and destination are the same

    const sourceTasks = [...tasksByStatus[source.droppableId]];
    const destTasks = [...tasksByStatus[destination.droppableId]];

    const movedTask = sourceTasks[source.index];
    movedTask.state = destination.droppableId;

    sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    const newTasksByStatus = {
      ...tasksByStatus,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    };

    setTasksByStatus(newTasksByStatus);
  };

  const handleStatusChange = (id: number, newStatus: ITask["state"]) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, state: newStatus } : task
    );
    setTasksByStatus(getTasksByStatus(updatedTasks));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {statuses.map((status) => (
          <TaskColumn
            state={status}
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
