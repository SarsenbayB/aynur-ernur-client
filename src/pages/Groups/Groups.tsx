import React from "react";
import { Link } from "react-router-dom";
import "./groups.css";

import tauelsizdikimg from "../../img/galery/Tauelsizdik.jpg";
import janajyl2img from "../../img/galery/jana jyl2.jpg";
import nauryzimg from "../../img/galery/8 nauryz.jpg";

const Groups: React.FC = () => {
  return (
    <div className="group">
      <div className="text">
        <h1>«АЙНҰР-ЕРНҰР БӨБЕКЖАЙ БАЛАБАҚШАСЫНЫҢ» Топтары!</h1>
      </div>
      <div className="container">
        <div className="items">
          <div className="img img1">
            <img src={tauelsizdikimg} alt="Tauelsizdik" />
          </div>
          <Link to={"/Akbota"}>
            <div className="name">Ақбота тобы</div>
            <p className="info">4-5 жас аралығы.</p>
          </Link>
        </div>

        <div className="items">
          <div className="img img2">
            <img src={janajyl2img} alt="Jana Jyl" />
          </div>
          <Link to={"/Kulynshak"}>
            <div className="name">Құлыншақ тобы</div>
            <p className="info">3-4 жас аралығы.</p>
          </Link>
        </div>

        <div className="items">
          <div className="img img1">
            <img src={nauryzimg} alt="Nauryz" />
          </div>
          <Link to={"/Erketay"}>
            <div className="name">Еркетай тобы</div>
            <p className="info">2-3 жас аралығы</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Groups;
