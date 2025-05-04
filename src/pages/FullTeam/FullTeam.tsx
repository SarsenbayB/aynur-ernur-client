import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { Container } from "react-bootstrap";
import { Team } from "../../components/Team";

interface TeamData {
  _id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  role: string;
}

export const FullTeam: React.FC = () => {
  const [data, setData] = useState<TeamData | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios
        .get(`/team/${id}`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.warn(err);
          alert("Ошибка при получении статьи");
          setLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return <Team isLoading={isLoading} isFullTeam id="" name="" role="" />;
  }

  if (!data) {
    return <div>Данные не найдены</div>;
  }

  return (
    <div className="fullTeam">
      <Container>
        <Team
          id={data._id}
          name={data.name}
          imageUrl={data.imageUrl ? `http://localhost:9999${data.imageUrl}` : ""}
          createdAt={data.createdAt}
          role={data.role}
          isEditing={true}
          isFullTeam
          style={{
            width: "500px",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </Container>
    </div>
  );
};
