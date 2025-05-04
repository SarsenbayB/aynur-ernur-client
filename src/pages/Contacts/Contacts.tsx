import "./contacts.css";

const Contacts: React.FC = () => {
  return (
    <main className="section">
      <div className="container">
        <h1 className="title-1">Бізбен байланысыңыз</h1>

        <ul className="content-list">
          <li className="content-list__item">
            <h2 className="title-2">Мекен жайымыз</h2>
            <p>
              Түркістан Облысы, Мақтаарал Ауданы, Атакент Кенті, Нұрлы әлем
              көшесі, №2 ғим.
            </p>
          </li>
          <li className="content-list__item">
            <h2 className="title-2">Telegram / WhatsApp</h2>
            <p>
              <a href="tel:+77473009392">+7 (747) 300-93-92</a>
            </p>
          </li>
          <li className="content-list__item">
            <h2 className="title-2">Email</h2>
            <a href="mailto:bakbergen.sarsenbay@mail.ru">
              bakbergen.sarsenbay@mail.ru
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Contacts;
