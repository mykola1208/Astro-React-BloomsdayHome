import React, { useState, useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { clsx } from "clsx/lite";
import { ReactSVG } from "react-svg";
import type { ITask } from ".";
import { statusNames, statuses } from "./statuses";
import Dropdown from "./Dropdown";
import ColoredSVG from "../ColoredSVG";
import { taskCategories } from "../../../data/data";
import Dialog from "../Dialog";
import DocumentUploader from "../DocumentUploader";
import DatePicker from "./DatePicker";
import { createApolloClient } from "../../../apollo/client";
import { GET_FILE_DOWNLOAD_LINK } from "../../../apollo/queries/getFileDownloadLink";
import DocumentViewer from "../../documents/DocumentViewer"; // Import a PDF viewer component or similar

interface TaskCardProps {
  id: any;
  task: ITask;
  position: number;
  onStatusChange: (id: number, newStatus: ITask["state"]) => void;
  currentUser: any;
}

const buttonClasses = {
  not_started: "bg-alert-light text-alert",
  in_progress: "bg-warning-light text-darkgreen",
  completed: "bg-completed-light text-darkgreen",
  hidden: "bg-gray-20 text-gray-50",
};

const TaskCard = ({
  id,
  task,
  position,
  onStatusChange,
  currentUser,
}: TaskCardProps) => {
  const { createClient } = createApolloClient();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getDownloadUrl = async () => {
      const client = await createClient();
      const { data } = await client.query({
        query: GET_FILE_DOWNLOAD_LINK,
        variables: {
          filename: task?.documents_tasks[0]?.document?.filename,
        },
      });
      setUrl(data.getS3SignedUrlForDownload.url);
    };
    getDownloadUrl();
  }, []);

  const [open, setOpen] = useState(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [date, setDate] = useState("Due Date");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State for preview modal

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleStatusChange = (newStatus: ITask["state"]) => {
    onStatusChange(task.id, newStatus);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const showDocumentUploaderDialog = () => {
    setShowDialog(true);
  };

  const hideDocumentUploaderDialog = () => {
    setShowDialog(false);
  };

  const handleToggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handlePreview = (title) => {
    localStorage.setItem("activeAccordionContent", title);
    setIsPreviewOpen(true);
  };

  const handleDownload = () => {
    const fileType = url.slice(-3);
    const fileName = `document.${fileType}`;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch((error) =>
        console.error(`Error downloading ${fileType} file:`, error)
      );
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
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
              "min-w-full bg-white border-l-4 shadow-inner pt-3 pr-2 pb-4 pl-4",
              task.state == "not_started" && "border-l-alert",
              task.state == "in_progress" && "border-l-warning",
              task.state == "completed" && "border-l-completed",
              task.state == "hidden" && "border-l-gray-50"
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
                      src={`/icons/${task.state}.svg`}
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                    <span
                      className={clsx(
                        "text-left text-lg leading-4 font-medium",
                        task.state == "hidden"
                          ? "text-gray-50"
                          : "text-darkgreen"
                      )}
                    >
                      <span className="text-sm font-medium">
                        {taskCategories[task.task_category].header}
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
              <div
                className={clsx(
                  "ml-10 flex flex-col gap-2",
                  task.state == "hidden" ? "text-gray-50" : "text-darkgreen"
                )}
              >
                <p className="text-xl font-medium">{task.title}</p>
                {open && (
                  <p className="font-normal text-base">{task.description}</p>
                )}
              </div>
            </div>
            <div className="relative mt-5">
              <button
                className={clsx(
                  `ml-10 py-3 px-4 rounded-lg`,
                  task.state == "not_started" && "bg-alert-light text-alert",
                  task.state == "in_progress" &&
                    "bg-warning-light text-darkgreen",
                  task.state == "completed" &&
                    "bg-completed-light text-darkgreen",
                  task.state == "hidden" && "bg-gray-20 text-gray-50"
                )}
                type="button"
                onClick={handleToggleDropdown}
              >
                <p className="px-4 font-medium">
                  {statusNames[task.state] == "Hide"
                    ? "Hidden"
                    : statusNames[task.state] == "Work On It"
                    ? "Working On It"
                    : statusNames[task.state]}
                </p>
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
                            <p className="px-3 text-base font-medium">
                              {statusNames[status]}
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Dropdown>
                </div>
              )}
            </div>
            <div className="flex mt-5 gap-7">
              <div className="flex gap-5">
                <button onClick={() => handlePreview(task.title)}>
                  <ColoredSVG
                    src="/icons/view.svg"
                    color={`${clsx(
                      task.state == "not_started" && "#9FBCAD",
                      task.state == "in_progress" &&
                        task?.documents_tasks?.length > 0 &&
                        "#1C4835",
                      task.state == "in_progress" &&
                        task?.documents_tasks?.length == 0 &&
                        "#9FBCAD",
                      task.state == "completed" && "#1C4835",
                      task.state == "hidden" && "#C1C7CD"
                    )}`}
                  />
                </button>
                <button
                  className={`${
                    task.state == "not_started" || task.state == "hidden"
                      ? "pointer-events-none"
                      : ""
                  }`}
                  onClick={showDocumentUploaderDialog}
                >
                  <ColoredSVG
                    src="/icons/upload.svg"
                    color={`${clsx(
                      task.state == "not_started" && "#9FBCAD",
                      task.state == "hidden" && "#C1C7CD",
                      (task.state == "completed" ||
                        task.state == "in_progress") &&
                        "#1C4835"
                    )}`}
                  />
                </button>
                <button onClick={handleDownload}>
                  <ColoredSVG
                    src="/icons/download.svg"
                    color={`${clsx(
                      task.state == "not_started" && "#9FBCAD",
                      task.state == "in_progress" &&
                        task?.documents_tasks?.length > 0 &&
                        "#1C4835",
                      task.state == "in_progress" &&
                        task?.documents_tasks?.length == 0 &&
                        "#9FBCAD",
                      task.state == "completed" && "#1C4835",
                      task.state == "hidden" && "#C1C7CD"
                    )}`}
                  />
                </button>
                <button>
                  <ColoredSVG
                    src="/icons/share.svg"
                    color={`${clsx(
                      task.state == "not_started" && "#9FBCAD",
                      task.state == "in_progress" &&
                        task?.documents_tasks?.length > 0 &&
                        "#1C4835",
                      task.state == "in_progress" &&
                        task?.documents_tasks?.length == 0 &&
                        "#9FBCAD",
                      task.state == "completed" && "#1C4835",
                      task.state == "hidden" && "#C1C7CD"
                    )}`}
                  />
                </button>
                <button>
                  <ColoredSVG
                    src="/icons/trash.svg"
                    color={`${clsx(
                      task.state == "not_started" && "#9FBCAD",
                      task.state == "in_progress" &&
                        task?.documents_tasks?.length > 0 &&
                        "#1C4835",
                      task.state == "in_progress" &&
                        task?.documents_tasks?.length == 0 &&
                        "#9FBCAD",
                      task.state == "completed" && "#1C4835",
                      task.state == "hidden" && "#C1C7CD"
                    )}`}
                  />
                </button>
              </div>
              <div className="group relative whitespace-nowrap">
                <button
                  disabled={task.state == "hidden"}
                  className="flex items-center gap-1"
                  onClick={handleToggleDatePicker}
                >
                  <ColoredSVG
                    src="/icons/calendar.svg"
                    color={`${clsx(
                      (task.state == "not_started" ||
                        task.state == "in_progress" ||
                        task.state == "completed") &&
                        "#1C4835",
                      task.state == "hidden" && "#C1C7CD"
                    )}`}
                  />
                  <p
                    className={`text-base font-medium ${clsx(
                      task.state == "hidden" && "text-gray-30",
                      task.state != "hidden" && "text-darkgreen"
                    )}`}
                  >
                    {date}
                  </p>
                </button>
                {isDatePickerOpen && (
                  <DatePicker
                    id={task.id}
                    isDatePickerOpen={isDatePickerOpen}
                    setDate={setDate}
                    handleToggleDatePicker={handleToggleDatePicker}
                  />
                )}
              </div>
            </div>
          </div>
          {showDialog && (
            <div className="taskID" id={String(task.id)}>
              <Dialog
                width="449px"
                height="590px"
                hideDialog={hideDocumentUploaderDialog}
                mode={task.documents_tasks.length > 0 ? "replace" : "upload"}
              >
                <DocumentUploader
                  id={id}
                  currentUser={currentUser}
                  mode={task.documents_tasks.length > 0 ? "replace" : "upload"}
                />
              </Dialog>
            </div>
          )}
          {isPreviewOpen && (
            <Dialog
              hideDialog={handleClosePreview}
              width="1000px"
              height="900px"
              mode="preview"
            >
              <DocumentViewer
                id={id}
                docUrl={url}
                user={currentUser}
                mode="preview"
                allTask={[]}
                handleClosePreview={handleClosePreview}
              />
            </Dialog>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
