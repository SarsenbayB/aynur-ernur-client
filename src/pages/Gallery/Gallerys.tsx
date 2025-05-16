import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";


interface Image {
  _id: string;
  imageUrl: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isAuth = useSelector(selectIsAuth);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/images");
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Ошибка при загрузке изображений!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      await axios.delete(`/api/images/${id}`);
      setImages((prevImages) => prevImages.filter((img) => img._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Ошибка при удалении изображения!");
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (showModal) {
      if (event.key === "ArrowLeft") {
        handlePrevImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      } else if (event.key === "Escape") {
        setShowModal(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, showModal]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Container>
        {isAuth && (
          <Link to="/addImage">
            <Button variant="primary" className="mt-2">
              <h2 className="title-4">Сурет қосу</h2>
            </Button>
          </Link>
        )}
        <h1 className="my-4">Галерея</h1>
        <Row>
          {images.map((image, index) => (
            <Col key={image._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="position-relative">
                <img
                  src={`${import.meta.env.VITE_API_URL}${image.imageUrl}`}
                  alt={`Image ${image._id}`}
                  className="img-fluid rounded"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  onClick={() => handleImageClick(index)}
                />
                {isAuth && (
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2"
                    onClick={() => handleDeleteImage(image._id)}
                  >
                    Өшіру
                  </Button>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Суреттерді қарау</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {images.length > 0 && (
            <img
              src={`${import.meta.env.VITE_API_URL}${images[selectedImageIndex].imageUrl}`}
              alt={`Image ${images[selectedImageIndex]._id}`}
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
              }}
            />
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={handlePrevImage}>
            Алдыңғы
          </Button>
          <Button variant="secondary" onClick={handleNextImage}>
            Келесі
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Gallery;

