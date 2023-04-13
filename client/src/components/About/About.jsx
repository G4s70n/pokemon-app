import React from "react";
import "./About.css";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from '../Footer/Footer.jsx';
import ClipboardJS from "clipboard";

const About = () => {
  const emailRef = React.useRef(null);

  React.useEffect(() => {
    new ClipboardJS(".gmail");
  }, []);

  const handleCopy = () => {
    const email = emailRef.current.dataset.clipboardText;
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="about-container ">
        <p>
          ¡Hola! 👋 Mi nombre es Gastón, y como FullStack Web Developer, me
          complace presentarles mi proyecto personal. 🤩
        </p>

        <p>
          He creado una SPA que extrae datos de la API PokeAPI y los almacena en
          mi base de datos personalizada. Además, permite a los usuarios crear
          sus propios Pokémon personalizados con la ayuda de la inteligencia
          artificial para generar imágenes a partir de texto.
        </p>

        <p>
          El proyecto cuenta con múltiples filtros y ordenamientos en capas para
          una mejor búsqueda. Los usuarios pueden ordenar y filtrar por tipo de
          Pokémon, Pokémon originales y creados, fuerza de ataque y nombres.
          Además, tiene un buscador en tiempo real para encontrar lo que
          necesitas de manera más rápida y fácil.
        </p>

        <p>Tecnologías usadas:</p>
        <ul>
          <li>Base de datos: PostgreSQL.</li>
          <li>Back-end: NodeJs, Express, Sequelize.</li>
          <li>Front-end: React, Redux, CSS, HTML.</li>
        </ul>

        <p>
          Espero que disfruten tanto mi proyecto como yo disfruté creándolo.
          También, si tienes algún comentario o sugerencia, no dudes en
          contactarme a través de mis redes sociales. Siempre estoy dispuesto a
          recibir feedback y mejorar. ¡Gracias por tu interés! 😊
        </p>

        <div className="buttons">
          <a
            className="linkedin"
            href="https://www.linkedin.com/in/gast%C3%B3n-nieto-68a4b5222/"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a
            className="github"
            href="https://github.com/G4s70n"
            target="_blank"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            title="Haz click para copiar el e-mail"
            className="gmail"
            data-clipboard-text="gastonnietoarte@gmail.com"
            onClick={handleCopy}
            ref={emailRef}
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
