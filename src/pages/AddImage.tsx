import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";
import axios from "../axios";

type Params = {
  id?: string;
};

const AddImage: React.FC = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const isEditing = Boolean(id);

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (!file) return;

      formData.append("image", file);
      const { data } = await axios.post<{ url: string }>("/upload/image", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = { imageUrl };
      if (isEditing) {
        await axios.patch(`/api/images/${id}`, fields);
      } else {
        await axios.post("/api/images/add", fields);
      }
      navigate("/gallerys");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при сохранении изображения!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get<{ imageUrl: string }>(`/api/images/${id}`)
        .then(({ data }) => {
          setImageUrl(data.imageUrl);
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при загрузке изображения!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Container>
      <div className="p-5 border rounded">
        <Button
          className="mb-2 me-2"
          onClick={() => inputFileRef.current?.click()}
          variant="outline-primary"
          size="lg"
        >
          Суретті жүктеу
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              className="mb-2"
              variant="danger"
              onClick={onClickRemoveImage}
            >
              Өшіру
            </Button>
            <img
              className="img-fluid"
              src={`http://localhost:9999${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
        <div className="buttons mt-3">
          <Button
            onClick={onSubmit}
            size="lg"
            variant="primary"
            className="m-3"
          >
            {isEditing ? "Сақтау" : "Жүктеу"}
          </Button>
          <Link to="/gallerys">
            <Button size="lg" variant="secondary" className="m-3">
              Қайтару
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default AddImage;
