import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchTeam } from "../../redux/slices/teams";
import { Link } from "react-router-dom";
import "./ourteam.css";
import { Team } from "../../components/Team";
import { Button } from "react-bootstrap";

interface TeamMember {
  _id: string;
  name: string;
  imageUrl?: string;
  createdAt: string;
  role: string;
}

const OurTeam: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { team } = useSelector((state: RootState) => state.team);
  const isAuth = useSelector(selectIsAuth);
  const isTeamsLoading = team.status === "loading";

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  return (
    <>
      {isAuth && (
        <Link to="/AddTeam">
          <Button variant="primary" className="m-4">
            <h2 className="title-4">Қосу</h2>
          </Button>
        </Link>
      )}
      <main className="section">
        <div className="container">
          <h2 className="title-1">Біздің Ұжым</h2>
          <ul className="projects1">
            {(isTeamsLoading ? [...Array(5)] : team.items).map(
              (member: TeamMember | undefined, index: number) =>
                isTeamsLoading || !member ? (
                  <Team key={index} isLoading={true} id="" name="" role="" />
                ) : (
                  <li className="project1" key={member._id}>
                    <Team
                      id={member._id}
                      name={member.name}
                      imageUrl={
                        member.imageUrl
                          ? `${import.meta.env.VITE_API_URL}${member.imageUrl}`
                          : ""
                      }
                      createdAt={member.createdAt}
                      role={member.role}
                      isEditable
                    />
                  </li>
                )
            )}
          </ul>
        </div>
      </main>
    </>
  );
};

export default OurTeam;