import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonTypes, getAllPokemons } from "../../redux/actions";
import { getImages, createPokemon } from "./ApiRequest";
import {validateForm} from "./validateForm";
import {namesCreator} from "./namesCreator";
import NavBar from "../NavBar/NavBar.jsx";
import Footer from '../Footer/Footer.jsx';
import './Create.css';
import { useAuth0 } from "@auth0/auth0-react";
import LoginSingUp from "../LoginSingUp/LoginSingUp.jsx";
import Modal from "../Modal/Modal";



const FormPokemon = () => {

  const [seccion, setSeccion] = useState(1);
  const [imgs, setImgs] = useState([]);
  const [description, setDescription] = useState('');
  const [form, setForm] = useState({
    name: "",
    image: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    specialAttack: 0,
    specialDefense: 0,
    weight: 0,
    height: 0,
    types: [],
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({inputName: false, inputTextarea: false});
  const [newPokemon, setNewPokemon] = useState(false);


  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getPokemonTypes());
    dispatch(getAllPokemons());
  }, []);
  
  useEffect(() => {
    validateForm(form, allPokemons, description, setErrors);
  }, [form, description]);
  
  
  const types = useSelector( (state) => state.types);
  const allPokemons = useSelector( (state) => state.pokemons);


  let links = [];

  const getPokemonsImages = async (description) => {
    try {
      links = await getImages({ prompt: description });
      const linksImgs = links.filter((url) => url.endsWith('.webp'));
      setImgs(linksImgs);
      return linksImgs;
    } catch (error) {
      setImgs('error');
      console.log(error);
      return 'error';
    }
  };
  
  console.log(imgs.length, imgs)

    
  const handleTextarea = (event) => {
    let prompt = event.target.value;
    setDescription(prompt)
  }
  
  const handleTextareaButton = (event) => {
      setImgs(['cargando'])
      getPokemonsImages(description)
      setDescription('')
    };
  
      

  const handleSeccion = (event) => {
    event.target.name === "siguiente" && seccion < 3
      ? setSeccion(seccion + 1)
      : setSeccion(seccion - 1);
  };

  const handlerFormValues = (event) => {
    const { name, value, checked } = event.target;
  
    if (name === "types") {
      setForm((prevValues) => {
        const types = prevValues.types.includes(value)
          ? prevValues.types.filter((type) => type !== value)
          : [...prevValues.types, value];
        return { ...prevValues, types };
      });
    } else {
      setForm((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  
  const handleImageClick = (event) => {
    setForm((prevValues) => ({ ...prevValues, image: event.target.value }));
  };
  
  const handleCrearButton = async (event) => {
    event.preventDefault();
    const newPokemon = await createPokemon(form);
    setNewPokemon(newPokemon);
    event.target.disabled = true;
  };

  const handleNameGenerator = (e) =>{
    e.preventDefault()
    let name = namesCreator();
    console.log(name);
    setForm((prevValues) => ({ ...prevValues, name: name }))
  };




  const {isAuthenticated} = useAuth0();


  if(isAuthenticated === false)return(<LoginSingUp/>)



  return (
    <div className="form-container">
      <div>
        <NavBar />
      </div>
      <h1 className="h1-form">Crea tu pokémon!</h1>
      <div class="formu">
        <form>
          {/*  //----------- SECCIÓN A ----------- */}
          {seccion === 1 && (
            <div class="form-seccion form-seccion-1">
              <p className="titulo-seccion-form">
                Elige un nombre y sus características
              </p>
              <div className="name-container-form">
                <input
                  className={`input-name-form ${
                    focused.inputName && errors.inputName ? "error-form" : ""
                  }`}
                  onChange={handlerFormValues}
                  onFocus={() => setFocused({ ...focused, inputName: true })}
                  onBlur={() => setFocused({ ...focused, inputName: false })}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingresa un nombre"
                  value={form.name}
                />
                {focused.inputName && errors.inputName && (
                  <span className="msj-error-form">{errors.inputName}</span>
                )}
                <button
                  className="btn-generator-form"
                  onClick={handleNameGenerator}
                >
                  Generador nombres
                </button>
              </div>

              <div className="range-form-container">
              <div className="range-form">
                <label htmlFor="hp">HP:</label>
                <input
                  className="hp-range"
                  onChange={handlerFormValues}
                  type="range"
                  id="hp"
                  name="hp"
                  min="0"
                  max="255"
                  value={form.hp}
                />
                <output htmlFor="hp">{form.hp}</output>

                <label htmlFor="attack">Ataque:</label>
                <input
                  className="attack-range"
                  onChange={handlerFormValues}
                  type="range"
                  id="attack"
                  name="attack"
                  min="0"
                  max="190"
                  value={form.attack}
                />
                <output htmlFor="attack">{form.attack}</output>

                <label htmlFor="defense">Defensa:</label>
                <input
                  className="defense-range"
                  onChange={handlerFormValues}
                  type="range"
                  id="defense"
                  name="defense"
                  min="0"
                  max="230"
                  value={form.defense}
                />
                <output htmlFor="defense">{form.defense}</output>

                <label htmlFor="speed">Velocidad:</label>
                <input
                  onChange={handlerFormValues}
                  type="range"
                  id="speed"
                  name="speed"
                  min="0"
                  max="180"
                  value={form.speed}
                />
                <output htmlFor="speed">{form.speed}</output>
              </div>

              <div className="range-form">
                <label htmlFor="specialAttack">Ataque Especial:</label>
                <input
                  onChange={handlerFormValues}
                  type="range"
                  id="specialAttack"
                  name="specialAttack"
                  min="0"
                  max="194"
                  value={form.specialAttack}
                />
                <output htmlFor="specialAttack">{form.specialAttack}</output>

                <label htmlFor="specialDefense">Defensa Especial:</label>
                <input
                  onChange={handlerFormValues}
                  type="range"
                  id="specialDefense"
                  name="specialDefense"
                  min="0"
                  max="230"
                  value={form.specialDefense}
                />
                <output htmlFor="specialDefense">{form.specialDefense}</output>

                <label htmlFor="weight">Peso:</label>
                <input
                  onChange={handlerFormValues}
                  type="range"
                  id="weight"
                  name="weight"
                  min="0"
                  max="999.9"
                  value={form.weight}
                />
                <output htmlFor="weight">{form.weight}</output>

                <label htmlFor="height">Altura:</label>
                <input
                  onChange={handlerFormValues}
                  type="range"
                  id="height"
                  name="height"
                  min="0"
                  max="14.5"
                  value={form.height}
                />
                <output htmlFor="height">{form.height}</output>
              </div>
              </div>

              <button
                className="btn-siguiente-form"
                onClick={handleSeccion}
                disabled={errors.inputName}
                name="siguiente"
              >
                Siguiente
              </button>
            </div>
          )}

          {/* //----------- SECCIÓN B ----------- */}
          {seccion === 2 && (
            <div class="form-seccion form-seccion-2">
              <p className="titulo-seccion-form">
                Selecciona los tipos de tu pokémon
              </p>

              <div className="icons-types-container">
                {types.map((e) => (
                  <div className="icon-types-form">
                    <input
                      onClick={handlerFormValues}
                      class="checkbox"
                      type="checkbox"
                      key={e.id}
                      id={e.name}
                      name="types"
                      value={e.name}
                    />
                    <label htmlFor={e.name} id={`${e.name}-label`}>
                      <img
                        className="img-icon-types"
                        src={`src/assets/TypesLogos/${e.name}.png`}
                        alt={`Logo de tipo ${e.name}`}
                      />
                    </label>
                  </div>
                ))}
              </div>

              <span className="msj-error-seccion-B">
                {form.types.length > 2
                  ? "Solo puedes seleccionar hasta 2 tipos"
                  : ""}
              </span>
              <button
                className="btn-atras-form"
                onClick={handleSeccion}
                name="atras"
              >
                Atrás
              </button>
              <button
                className="btn-siguiente-form"
                onClick={handleSeccion}
                disabled={form.types.length > 2 || form.types.length === 0}
                name="siguiente"
              >
                Siguiente
              </button>
            </div>
          )}

          {/* //----------- SECCIÓN C ----------- */}
          {seccion === 3 && (
            <div class="form-seccion form-seccion-3">
              {newPokemon && (
                <Modal
                  message="Pokémon creado con éxito!"
                  /* onClose={handleCloseModal} */ id={newPokemon.id}
                />
              )}
              <div>
                <p className="titulo-seccion-form">Crea tu pokémon con IA</p>
                <div>
                  {imgs.length < 2  && (
                    <div className="img-vacias-container">
                      {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className={`img-vacia-form ${imgs[0] === 'cargando' ? 'img-vacia-loading' : ''}`}>
                          <img
                            className="logo-img-loading"
                            src="src\assets\Create\loading-card.webp"
                            alt="pokemon logo"
                          />
                          <span className="span-loading">Generando...</span>
                        </div>
                      ))}
                    </div>)}


                  <div className="imgs-generadas-container">
                    {imgs === 'error' ?
                      <p className="error-generar-imgs">Error al generar las imagenes, inténtalo de nuevo más tarde!</p>
                    
                    :imgs.length > 1 &&
                      imgs.map((img, index) => (
                        <div className="img-div-form" key={index}>
                          <input
                            className="input-checkbox"
                            type="radio"
                            id={`img-${index}`}
                            name="selectedImage"
                            value={img}
                            onChange={handleImageClick}
                          />
                          <label htmlFor={`img-${index}`}>
                            <img src={img} alt="pokemon" />
                          </label>
                        </div>
                      ))
                      }
                  </div>


                  {imgs.length > 1 && imgs !== 'error' && <span className="aviso-imgs-form">Selecciona una imagen</span>}
                   <span className="errors-image">{errors.image}</span>
                </div>

                <div className="textarea-container">
                  <form>
                    <textarea
                      className="textarea-form"
                      onChange={handleTextarea}
                      onFocus={() =>
                        setFocused({ ...focused, inputTextarea: true })
                      }
                      onBlur={() =>
                        setFocused({ ...focused, inputTextarea: false })
                      }
                      name="message"
                      value={description}
                      placeholder="Ejemplo: un pokemon con forma de mariposa, de color azul y rojo..."
                    ></textarea>
           
                    {focused.inputTextarea && errors.inputTextarea && (
                      <span className="erros-textarea">{errors.inputTextarea}</span>
                    )}
                    <input
                      className="btn-generar-form"
                      onClick={handleTextareaButton}
                      disabled={errors.inputTextarea}
                      type="button"
                      value="Generar"
                    />
                  </form>
                </div>

                <button className="btn-atras-form" onClick={handleSeccion} name="atras">
                  Atrás
                </button>
                 <input className="btn-crear-form"  onClick={handleCrearButton} disabled={imgs.length < 2 || imgs === 'error'} type="submit" value="Crear" />
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};



export default FormPokemon;



