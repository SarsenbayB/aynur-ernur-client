import "./promo.css";

import promoImg from "./../../img/2023ж/aynurernur1.jpg";

const Promo = () => {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__content">
          <div className="promo__title">
            <h1 className="header-heading">
              ЖШС «Айнұр-Ернұр» <br /> <span>бөбекжай – балабақшасы!</span>
            </h1>
            <p>
              Балабақша – барлық тәр­бие мен білімнің ең алғаш­қы баспалдағы.
            </p>
          </div>
          <div className="promo__img">
            <img src={promoImg} alt="PromoImg"></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promo;
