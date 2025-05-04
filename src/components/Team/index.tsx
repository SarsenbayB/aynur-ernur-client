import React from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Button, Image } from "react-bootstrap";
import { FaTrash, FaPenFancy } from "react-icons/fa";
import { PostSkeleton } from "./Skeleton";
import { Link } from "react-router-dom";
import { fetchRemoveTeam } from "../../redux/slices/teams";
import { selectIsAuth } from "../../redux/slices/auth";
import { AppDispatch } from "../../redux/store";
import type { UserData } from "../../redux/slices/auth";

interface TeamProps {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  user?: UserData;
  isFullTeam?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
  isEditing?: boolean;
  createdAt?: string;
  style?: React.CSSProperties;
}

export const Team: React.FC<TeamProps> = ({
  id,
  name,
  role,
  imageUrl,
  isFullTeam = false,
  isLoading = false,
  isEditable = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(selectIsAuth);

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить статью?")) {
      dispatch(fetchRemoveTeam(id));
    }
  };

  return (
    <div className={clsx("card", { "card-full": isFullTeam })}>
      {isEditable && isAuth && (
        <div className="position-absolute top-0 end-0 p-2 bg-white rounded-3">
          <Link to={`/team/${id}/edit`}>
            <Button variant="primary" className="me-1">
              <FaPenFancy />
            </Button>
          </Link>
          <Button onClick={onClickRemove} variant="danger" className="me-1">
            <span className="button-icon">
              <FaTrash className="icon" />
            </span>
          </Button>
        </div>
      )}
      {imageUrl && (
        <Image
          className={clsx("card-img-top", {
            "img-fluid": isFullTeam,
          })}
          src={imageUrl}
          alt={name}
          style={{
            width: isFullTeam ? "900px" : "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      )}
      <div className="card-body">
        <h3 className={clsx("card-title", { "fs-1": isFullTeam })}>
          {isFullTeam ? (
            name
          ) : (
            <Link to={`/team/${id}`} className="text-decoration-none text-dark">
              {name}
            </Link>
          )}
        </h3>
        <h3>{role}</h3>
      </div>
    </div>
  );
};
