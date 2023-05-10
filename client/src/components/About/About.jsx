import React from "react";
import "./About.css";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from '../Footer/Footer.jsx';
import ClipboardJS from "clipboard";
import { TfiLinkedin } from 'react-icons/tfi';
import { BsGithub } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { AiFillCheckCircle } from 'react-icons/ai';

const About = () => {
  const emailRef = React.useRef(null);
  const [copied, setCopied] = React.useState(false);


  React.useEffect(() => {
    new ClipboardJS(".btn-email");
  }, []);


  const handleCopy = () => {
    const email = emailRef.current.dataset.clipboardText;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  

  return (
    <div className="about-container">
      <div>
        <NavBar />
      </div>
      <div className="about-container-text ">
        <p>
          ¡Hola! 👋 Mi nombre es Gastón, y como <span className="full-stack-about">FullStack Web Developer</span>, me
          complace presentarles mi proyecto personal. 🤩
        </p>

        <p>

        He creado una <span className="spa-about">SPA</span> que extrae datos de la <span className="api-about">API PokeAPI</span> y los almacena en mi <span className="db-about">base de datos</span> personalizada. Además, permito a los usuarios crear sus propios Pokémon personalizados con la ayuda de la <span className="ia-about">inteligencia artificial</span>.
        </p>

        <p>
        Mi proyecto cuenta con múltiples filtros y ordenamientos en capas para una mejor búsqueda. También, incluí un buscador en tiempo real para encontrar lo que necesitan de manera más rápida y fácil.
        </p>

        <p className="p-tech-usadas">Tecnologías usadas:</p>
        <ul className="lista-tech">
          <li>Base de datos: 
              <span className="tech-span postgres-span">PostgreSQL <AiFillCheckCircle /> </span></li>
          <li>
            Back-end: 
              <span className="tech-span node-span">NodeJs <AiFillCheckCircle /> </span>
              <span className="tech-span express-span">Express <AiFillCheckCircle /> </span>
              <span className="tech-span sequelize-span">Sequelize <AiFillCheckCircle /> </span>
          </li>
          <li>Front-end:
              <span className="tech-span javascript-span">JavaScript <AiFillCheckCircle /> </span>
              <span className="tech-span react-span">React <AiFillCheckCircle /> </span>
              <span className="tech-span redux-span">Redux <AiFillCheckCircle /> </span>
              <span className="tech-span css-span">CSS <AiFillCheckCircle /> </span>
              <span className="tech-span html-span">HTML <AiFillCheckCircle /> </span>
          </li>
        </ul>

        <p>
          Espero que disfruten tanto mi proyecto como yo disfruté creándolo.
          También, si tenes algún comentario o sugerencia, no dudes en
          contactarme a través de mis redes sociales. Siempre estoy dispuesto a
          recibir feedback y mejorar. ¡Gracias por tu interés! 😊
        </p>

        <div className="buttons-about">
          <a
            className="linkedin"
            href="https://www.linkedin.com/in/gast%C3%B3n-nieto-68a4b5222/"
            target="_blank"
          >
            <i className="icon-linkedin-about"> <TfiLinkedin /> </i>
          </a>
          <a
            className="github"
            href="https://github.com/G4s70n"
            target="_blank"
          >
            <i className="icon-github-about"> <BsGithub /> </i>
          </a>

          <a className="btn-email"
            data-clipboard-text="gastonnietoarte@gmail.com"
            onClick={handleCopy}
            ref={emailRef}
          >
          <i className="icon-gmail-about"> <IoIosMail /> </i>
          <span className={`msj-copiar-email ${copied ? 'email-copiado' : ''}`}> {copied ?'E-mail copiado' :'Haz click para copiar el E-mail'}</span>
        </a>


        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
