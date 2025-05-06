import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";

// Define types for the state
interface TeamData {
  name: string;
  role: string;
  imageUrl: string;
}

const AddTeam: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Params are typed to include 'id'
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement | null>(null); // Typing ref
  const [imageUrl, setImageUrl] = useState<string>("");

  const isEditing = Boolean(id);

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0]; // Type safety for file
      if (!file) return;
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/image", formData);
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
      const fields: TeamData = { name, imageUrl, role };
      if (isEditing) {
        await axios.patch(`/api/team/${id}`, fields);
      } else {
        await axios.post("/api/team/add", fields);
      }
      navigate(`/OurTeam`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при сохранении участника команды!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/team/${id}`)
        .then(({ data }) => {
          setName(data.name);
          setImageUrl(data.imageUrl);
          setRole(data.role);
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при загрузке данных участника команды!");
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
          Загрузить изображение
        </Button>
        <input
          ref={inputFileRef}
          type="file"
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
              Удалить
            </Button>
            <img
              className="img-fluid"
              src={`baseURL${imageUrl}`}
              alt="Uploaded"
            />
          </>
        )}
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Имя участника..."
            className="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Роль участника..."
            className="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Form.Group>
        <div className="buttons mt-3">
          <Button onClick={onSubmit} size="lg" variant="primary">
            {isEditing ? "Сохранить" : "Опубликовать"}
          </Button>
          <Link to="/OurTeam">
            <Button size="lg" variant="secondary" className="m-3">
              Отмена
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default AddTeam;
