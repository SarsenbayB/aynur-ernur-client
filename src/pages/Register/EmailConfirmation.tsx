import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../axios";
import "./forgot.css";


type ConfirmationStatus = "confirming" | "success" | "error";

export const EmailConfirmation: React.FC = () => {
  const { token } = useParams<{ token?: string }>();
  const [status, setStatus] = useState<ConfirmationStatus>("confirming");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        await axios.get(`/auth/confirm/${token}`);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <div className="confirmation">
      {status === "confirming" && <p>Email мекенжайын растау...</p>}

      {status === "success" && (
        <div>
          <p>Email мекенжайы расталды!</p>
          <Link to="/login">Кіру</Link>
        </div>
      )}

      {status === "error" && (
        <div>
          <p>Растау сәтсіз аяқталды. Қайтадан көріңіз.</p>
          <Link to="/register">Тіркелуге оралу</Link>
        </div>
      )}
    </div>
  );
};