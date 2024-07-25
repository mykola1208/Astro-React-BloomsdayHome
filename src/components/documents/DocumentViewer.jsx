import { useState, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { clsx } from "clsx/lite";
import DocumentUploader from "../react/DocumentUploader";
import Dialog from "../react/Dialog";
import "pdfjs-dist/build/pdf.worker.min.mjs";
import Browse from "./Browse";
import ColoredSVG from "../react/ColoredSVG";
import moment from "moment";

GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.js";

const DocumentViewer = ({
  id,
  docUrl,
  user,
  allTask,
  mode = "view",
  handleClosePreview,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const hideDocumentUploaderDialog = () => {
    setIsDialogOpen(false);
  };
  const url = docUrl;
  const folder = localStorage.getItem("activeAccordionContent");
  const [extension, setExtension] = useState();
  const [tasks, setTasks] = useState(allTask);
  const [task_id, setTaskId] = useState();
  const [taskDate, setTaskDate] = useState();
  const [pdfDoc, setPdfDoc] = useState(null);
  const [scale, setScale] = useState(1);
  const [page, setPage] = useState(1);
  const [rendering, setRendering] = useState(false);
  const [pagePending, setPagePending] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const canvasRef = useRef(null);
  const pdfViewerRef = useRef(null);

  useEffect(() => {
    const loadDocument = async () => {
      if (url) {
        const fileType = getFileType(url);
        setExtension(fileType);

        if (fileType === "pdf")
          try {
            const loadingTask = getDocument(url);
            loadingTask.promise
              .then((loadedPdfDoc) => {
                setPdfDoc(loadedPdfDoc);
                setPage(1); // Reset to the first page when loading a new document
              })
              .catch((error) => {
                console.error("Error loading PDF document:", error);
              });
          } catch (error) {
            console.error("Error loading PDF document:", error);
          }
      }
    };
    loadDocument();
  }, [url]);

  useEffect(() => {
    if (pdfDoc) {
      queueRenderPage(page);
    }
  }, [pdfDoc, page, scale]);

  useEffect(() => {
    tasks?.forEach((task) => {
      compare(task, folder);
    });
  }, [folder, tasks]);

  useEffect(() => {
    if (mode == "preview") handleToggleFullscreen();
  }, []);

  const compare = (task, folder) => {
    if (task.title === folder?.trim()) {
      setTaskId(task.id);

      const formattedDate = moment(
        task.documents_tasks[0]?.document.updated_at
      ).format("M/D/YY");
      setTaskDate(formattedDate);
    }
  };

  const getFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase().slice(0, 3);
    return extension;
  };

  const renderPage = (pdfDoc, num, scale = 1) => {
    setRendering(true);
    pdfDoc
      .getPage(num)
      .then((page) => {
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: canvas.getContext("2d"),
          viewport,
        };

        page
          .render(renderContext)
          .promise.then(() => {
            setRendering(false);
            if (pagePending !== null) {
              renderPage(pdfDoc, pagePending, scale);
              setPagePending(null);
            }
          })
          .catch((error) => {
            console.error("Error rendering page:", error);
            setRendering(false);
          });
      })
      .catch((error) => {
        console.error("Error getting page:", error);
        setRendering(false);
      });
  };

  const queueRenderPage = (num) => {
    if (rendering) {
      setPagePending(num);
    } else {
      renderPage(pdfDoc, num, scale);
    }
  };

  const handlePrev = () => {
    if (page <= 1) {
      return;
    }
    const prevPage = page - 1;
    setPage(prevPage);
  };

  const handleNext = () => {
    if (page >= pdfDoc.numPages) {
      return;
    }
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => (prevScale > 0.6 ? prevScale - 0.1 : prevScale));
  };

  const handleDownloadFile = () => {
    const fileType = getFileType(url);
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

  const handleToggleFullscreen = () => {
    setIsFullScreen(!isFullScreen);
    if (pdfViewerRef.current) {
      if (!document.fullscreenElement) {
        pdfViewerRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      {url !== undefined ? (
        <>
          <div className="p-2" id="pdf-viewer" ref={pdfViewerRef}>
            <div className="flex justify-center gap-14 p-4">
              <div
                className={`basis-1/3 ${clsx(
                  isFullScreen ? "text-white" : "text-darkgreen"
                )}`}
              >
                <p className="text-xl font-bold" id="kind">
                  {folder}
                </p>
                <p className="text-sm font-normal">Uploaded on {taskDate}</p>
              </div>
              <div className="basis-1/3 flex justify-center items-center gap-2">
                <button type="button" className="prev" onClick={handlePrev}>
                  {isFullScreen ? (
                    <ColoredSVG
                      src="/icons/arrow-left.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                      color="white"
                      mode="fill"
                    />
                  ) : (
                    <ReactSVG
                      src="/icons/arrow-left.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  )}
                </button>
                <span
                  className={`text-sm font-normal ${clsx(
                    isFullScreen ? "text-white" : "text-darkgreen"
                  )}`}
                >
                  Page: <span id="page_num">{page}</span> /{" "}
                  <span id="page_count">{pdfDoc?.numPages}</span>
                </span>
                <button type="button" className="next" onClick={handleNext}>
                  {isFullScreen ? (
                    <ColoredSVG
                      src="/icons/arrow-right.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                      color="white"
                      mode="fill"
                    />
                  ) : (
                    <ReactSVG
                      src="/icons/arrow-right.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  )}
                </button>
              </div>
              <div className="basis-1/3 justify-end flex gap-3">
                <button
                  type="button"
                  className="zoom-in"
                  onClick={handleZoomIn}
                >
                  {isFullScreen ? (
                    <ColoredSVG
                      src="/icons/zoom-in.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                      color="white"
                      mode="stroke"
                    />
                  ) : (
                    <ReactSVG
                      src="/icons/zoom-in.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  )}
                </button>
                <button
                  type="button"
                  className="zoom-out"
                  onClick={handleZoomOut}
                >
                  {isFullScreen ? (
                    <ColoredSVG
                      src="/icons/zoom-out.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                      color="white"
                      mode="stroke"
                    />
                  ) : (
                    <ReactSVG
                      src="/icons/zoom-out.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  )}
                </button>
                {!isFullScreen && (
                  <button
                    type="button"
                    className="expand"
                    onClick={handleToggleFullscreen}
                  >
                    <ReactSVG
                      src="/icons/expand.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  </button>
                )}
                <button
                  type="button"
                  className="download"
                  onClick={handleDownloadFile}
                >
                  {isFullScreen ? (
                    <ColoredSVG
                      src="/icons/download.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                      color="white"
                      mode="stroke"
                    />
                  ) : (
                    <ReactSVG
                      src="/icons/download.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  )}
                </button>
                {!isFullScreen && (
                  <button
                    type="button"
                    className="upload"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <ReactSVG
                      src="/icons/upload.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  </button>
                )}
                {!isFullScreen && (
                  <button type="button" className="trash">
                    <ReactSVG
                      src="/icons/trash.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                  </button>
                )}

                {isFullScreen && (
                  <button
                    type="button"
                    className="shrink"
                    onClick={() => {
                      handleToggleFullscreen();
                      if (mode == "preview") handleClosePreview();
                    }}
                  >
                    <ColoredSVG
                      src="/icons/minimize.svg"
                      width={24}
                      height={24}
                      className="shrink-0"
                      color="white"
                      mode="stroke"
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center overflow-auto h-full">
              {extension == "pdf" && (
                <canvas ref={canvasRef} className="z-[-1]"></canvas>
              )}
              {(extension == "png" ||
                extension == "jpg" ||
                extension == "gif") && (
                <img
                  src={url}
                  style={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.3s ease-in-out",
                    transformOrigin: "center center",
                    display: "block",
                  }}
                />
              )}
            </div>
          </div>
          <div id="replace-file">
            {isDialogOpen && (
              <Dialog
                width="449px"
                height="590px"
                hideDialog={hideDocumentUploaderDialog}
              >
                <DocumentUploader id={id} currentUser={user} mode="replace" />
              </Dialog>
            )}
          </div>
        </>
      ) : (
        <div className="taskID h-full" id={task_id}>
          <Browse id={id} currentUser={user} />
        </div>
      )}
    </>
  );
};

export default DocumentViewer;
