import React, { useState, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";

interface FormData {
  title: string;
  fileUrl: string;
}

const DocuCrud: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    fileUrl: "",
  });

  const isEditing = Boolean(id);

  // Handle file change
  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const { data } = await axios.post("/upload/file", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });


        setFormData((prev) => ({
          ...prev,
          fileUrl: data.url,
          title: file.name,
        }));
      } catch (err) {
        console.error("Error uploading file:", err);
        alert("Error occurred while uploading the file!");
      }
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleViewFile = (fileUrl: string) => {
    const decodedUrl = decodeURIComponent(fileUrl);
    window.open(decodedUrl, "_blank");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditing) {
        await axios.patch(`/api/files/${id}`, formData);
      } else {
        await axios.post("/api/files", formData);
      }
      navigate(`/FileTable`);
    } catch (err) {
      console.warn(err);
      alert("Error while creating document!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/files/${id}`)
        .then(({ data }) => {
          setFormData({
            title: data.title,
            fileUrl: data.fileUrl,
          });
        })
        .catch((err) => {
          console.warn(err);
          alert("Error occurred while fetching the document!");
        });
    }
  }, [id]);

  // Redirect if not authenticated
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Card className="mx-auto my-4" style={{ maxWidth: "600px" }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">
          {isEditing ? "Редактирование документа" : "Создание документа"}
        </Card.Title>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              Файл
            </label>
            <input
              className="form-control"
              ref={inputFileRef}
              type="file"
              onChange={handleChangeFile}
              required={!isEditing && !formData.fileUrl}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Документтің аты
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Введите название документа"
              required
            />
          </div>
          {formData.fileUrl && (
            <div className="mb-3">
              <label className="form-label">Текущий файл:</label>
              <div>
                <button
                  type="button"
                  className="btn btn-primary me-2"
                  onClick={() => handleViewFile(formData.fileUrl)}
                >
                  Қарау
                </button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : isEditing ? "Сохранить" : "Создать"}
          </Button>
          <Link to="/FileTable">
            <Button size="lg" variant="secondary" className="m-3">
              Отмена
            </Button>
          </Link>
        </form>
      </Card.Body>
    </Card>
  );
};

export default DocuCrud;
