import "./foodmenu.css";
import "./buttons.css";

import image1 from "./../../img/2023ж/Tamak.jpg";
import image2 from "./../../img/icons/arrow-more.svg";
import React from "react";

const FoodMenu: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="about-us">
          <div className="about-us__desc">
            <h3 className="about-us__title">Ас мәзірі</h3>
            <p className="about-us__text">
              Сұрақ: "Сіз не жегенді ұнатасыз?" - балалар: "Пицца, лазанья,
              гамбургер, қуырылған картоп" деп қуана-қуана тізімдейді. Бұл
              қазіргі балаларды тағамға тартады. Оларды түсінуге болады: мүмкін,
              бұл дәмді, бірақ пайдалы ма?
            </p>
            <p className="about-us__text">
              Біздің балабақшада мұндай зиянды тағамдар бермеуге тырысамыз.
              Біздің құрметті аспазымыз балаларға пайдалы және одан да дәмді
              тағам дайындап қана қоймайды, сонымен қатар тағамның сыртқы
              безендірілуі тәбеттің жоғарылауына ықпал етеді және ұсынылғанның
              бәрін жеуге деген ықыласты тудырады. Біздің мәзір балалар
              диетологтарының ұсыныстарын ескере отырып және мектеп жасына
              дейінгі балалардың тамақтану нормаларына сәйкес жасалады.
            </p>
            <p className="about-us__text">
              Тамақтанудың теңгерімділігі, әр түрлі мәзір және жоғары сапалы
              өнімдер – бұл үш қағиданы біздің аспаздарымыз үнемі қадағалап
              отырады. Егер сіздің балаңызда аллергия немесе өнімге
              төзбеушілік болса, біз жеке мәзірді ұсынамыз.
            </p>
            <div className="about-us__btn">
              <a href="#" className="button-more">
                Read more <img src={image2} alt="Arrow" />
              </a>
            </div>
          </div>
          <img src={image1} alt="Балалар тағамы" className="about-us__img" />
        </div>
      </div>
    </section>
  );
};

export default FoodMenu;
