import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import axios from "../../axios";
import Toolbar from "./Toolbar";
import { Link } from "react-router-dom";
import { FaPenFancy, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { paginate } from "../../utils/paginate";
import Pagination from "../pagination";

interface FileItem {
  _id: string;
  title: string;
  fileUrl?: string;
  createdAt: string;
  status: "Active" | "Blocked";
}
const FileTable: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const isAuth = useSelector(selectIsAuth);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data } = await axios.get("/files");
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedFiles(files.map((file) => file._id));
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]
    );
  };

  const handleAction = async (action: "delete" | "block" | "unblock") => {
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedFiles.map((fileId) =>
          axios({
            method: action === "delete" ? "delete" : "put",
            url: `/files/${action === "delete" ? "" : action + "/"}${fileId}`,
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      if (action === "delete") {
        setFiles((prevFiles) =>
          prevFiles.filter((file) => !selectedFiles.includes(file._id))
        );
      } else {
        const newStatus = action === "block" ? "Blocked" : "Active";
        setFiles((prevUsers) =>
          prevUsers.map((file) =>
            selectedFiles.includes(file._id)
              ? { ...file, status: newStatus }
              : file
          )
        );
      }

      setSelectedFiles([]);
      fetchFiles();
    } catch (error) {
      console.error(`Error ${action}ing files:`, error);
    }
  };

  const handleDownload = async (fileUrl: string) => {
    try {
      const urlParts = fileUrl.split("/");
      const encodedFilename = urlParts[urlParts.length - 1];
      const filename = decodeURIComponent(encodedFilename);

      const token = localStorage.getItem("token");
      const response = await axios({
        url: `/api/download/${encodeURIComponent(filename)}`,
        method: "GET",
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Файлды жүктеу кезінде қате пайда болды!");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedFiles = paginate(files, currentPage, pageSize);

  return (
    <>
      {isAuth ? (
        <>
          <div className="d-flex justify-content-between me-4 ms-4">
            <Link to={"/DocuCrud"}>
              <Button variant="success gap-2 m-2" size="sm">
                <FaPlus className="me-1" /> Қосу
              </Button>
            </Link>
            <Toolbar
              selectedFiles={selectedFiles}
              onDelete={() => handleAction("delete")}
              onBlock={() => handleAction("block")}
              onUnblock={() => handleAction("unblock")}
            />
          </div>
        </>
      ) : null}
      <Table className="file-table" striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedFiles.length === files.length && files.length > 0}
              />
            </th>
            <th>Құжаттың атауы</th>
            {isAuth && <th>Құжаттың өңдеу</th>}
            <th>Құжаттың жүктелген уақыты</th>
            <th>Статус</th>
            <th>Құжатты қарау</th>
            <th>Құжатты жүктеу</th>
          </tr>
        </thead>
        <tbody>
          {paginatedFiles.map((file) => (
            <tr key={file._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedFiles.includes(file._id)}
                  onChange={() => handleSelect(file._id)}
                />
              </td>
              <td>{file.title}</td>
              {isAuth && (
                <td>
                  <Link to={`/files/${file._id}/edit`}>
                    <Button variant="primary" className="me-1">
                      <FaPenFancy /> Өңдеу
                    </Button>
                  </Link>
                </td>
              )}
              <td>{new Date(file.createdAt).toLocaleString()}</td>
              <td>{file.status}</td>
              <td>
                {file.fileUrl && file.status !== "Blocked" ? (
                  <Link to={file.fileUrl} target="_blank" rel="noopener noreferrer">
                    Құжатты қарау
                  </Link>
                ) : (
                  <span>Қарауға болмайды</span>
                )}
              </td>
              <td>
                {file.fileUrl && file.status !== "Blocked" ? (
                  <Button onClick={() => handleDownload(file.fileUrl!)}>
                    Жүктеу
                  </Button>
                ) : (
                  <span>Жүктеуге болмайды</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination
          itemsCount={files.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default FileTable;

