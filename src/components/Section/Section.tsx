import React from "react";
import "./section.css";

import tauelsizdikimg from "../../img/galery/Tauelsizdik.jpg";
import janajyl2img from "../../img/galery/jana jyl2.jpg";
import nauryzimg from "../../img/galery/8 nauryz.jpg";
import img3 from "../../img/galery/ustazben3.jpg";
import img4 from "../../img/2023ж/Tamak.jpg";
import img5 from "../../img/galery/dalada2.jpg";
import img6 from "../../img/galery/Mereke.jpg";
import img7 from "../../img/galery/Tauelsizdik.jpg";

const Section: React.FC = () => {
  return (
    <div className="section2">
      <div className="text">
        <h1>
          «АЙНҰР-ЕРНҰР БӨБЕКЖАЙ БАЛАБАҚШАСЫ» Сіздерді көргенімізге қуаныштымыз!
        </h1>
      </div>
      <div className="container">
        <div className="items">
          <div className="img img1"><img src={tauelsizdikimg} alt="" /></div>
          <div className="name">БIЗДІҢ БАҒЫТЫМЫЗ</div>
          <p className="info">
            «АЙНҰР-ЕРНҰР БӨБЕКЖАЙ БАЛАБАҚШАСЫ» балалардың табиғи дамуына қажетті қолдауды қамтамасыз ету.
          </p>
        </div>

        <div className="items">
          <div className="img img2"><img src={janajyl2img} alt="" /></div>
          <div className="name">БIЗДІҢ МАҚСАТЫМЫЗ</div>
          <p className="info">
            Мектепке дейінгі жастағы балаларды тәрбиелеу және оқыту үшін қолайлы қауіпсіз білім беру.
          </p>
        </div>

        <div className="items">
          <div className="img img1"><img src={nauryzimg} alt="" /></div>
          <div className="name">БАЛАЛАРМЕН ЖҰМЫС ЖАСАУ</div>
          <p className="info">
            Бізде барлық іс-шаралар балаларды жан-жақты дамытатындай етіп жасалған: эмоционалдық, интеллектуалдық және физикалық.
          </p>
        </div>

        <div className="items">
          <div className="img img3"><img src={img3} alt="" /></div>
          <div className="name">БАЛАҒА МҰҚИЯТ КҮТІМ ЖАСАУ</div>
          <p className="info">
            Біздің қызметкерлер балабақшадағы тазалықты, тәрбиеленушілеріміздің ұқыптылығын қадағалайды.
          </p>
        </div>

        <div className="items">
          <div className="img img1"><img src={img4} alt="" /></div>
          <div className="name">САЛАУАТТЫ ТАМАҚТАНУ</div>
          <p className="info">
            Сатып алынатын тағамның сапасын және сәбилерге арналған тағамды дайындауды қатаң қадағалаймыз.
          </p>
        </div>

        <div className="items">
          <div className="img img1"><img src={img5} alt="" /></div>
          <div className="name">БАЛАЛАРДЫ БЕЛСЕНДІ ОҚЫТУ</div>
          <p className="info">
            Біз балаларымызды бастауыш сыныпқа арналған мектепке дейінгі бағдарламада дамытуға тырысамыз.
          </p>
        </div>

        <div className="items">
          <div className="img img1"><img src={img6} alt="" /></div>
          <div className="name">БАЛАЛАРДЫҢ КӨҢІЛ КҮЙІ</div>
          <p className="info">
            Балаға өзінің көңіл күйін анықтап бағалай отырып өгелердің көңіл күйіне назар аудара білуге үйрету.
          </p>
        </div>

        <div className="items">
          <div className="img img1"><img src={img7} alt="" /></div>
          <div className="name">ҚАРЫМ-ҚАТЫНАС ОРНАТУ</div>
          <p className="info">
            Балалардың бір-бірімен достық қарым-қатынас орнатуға үйрету, рухани-адамгершілік құндылықтарын қалыптастыру.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section;