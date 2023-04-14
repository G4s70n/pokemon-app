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
        links = await getImages({ prompt: description});
        links = links.filter(url => !url.endsWith('.gif') && url.endsWith('.webp'));
        setImgs(links)
        return links;
  };

    
  const handleTextarea = (event) => {
    let prompt = event.target.value;
    setDescription(prompt)
  }
  
  const handleTextareaButton = (event) => {
      setImgs([])
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
    <div>
          <div><NavBar/></div>
    <div class="form">

<form>

  {/*  //----------- SECCIÓN A ----------- */}
  {seccion === 1 && (
    <div class="seccion">
      <label htmlFor="name">Nombre:</label>
      <input
        onChange={handlerFormValues}
        onFocus={() => setFocused({...focused, inputName: true})} 
        onBlur={() => setFocused({...focused, inputName: false})}
        type="text"
        id="name"
        name="name"
        placeholder="Ingresa un name"
        value={form.name}
      />
      <button onClick={handleNameGenerator}>Generador nombres</button>
      {focused.inputName && errors.inputName && <span>{errors.inputName}</span>}
      <br />
      <br />

      <label htmlFor="hp">HP:</label>
      <input
        onChange={handlerFormValues}
        type="range"
        id="hp"
        name="hp"
        min="0"
        max="255"
        value={form.hp}
      />
      <output htmlFor="hp">{form.hp}</output>
      <br />
      <br />

      <label htmlFor="attack">Ataque:</label>
      <input
        onChange={handlerFormValues}
        type="range"
        id="attack"
        name="attack"
        min="0"
        max="190"
        value={form.attack}
      />
      <output htmlFor="attack">{form.attack}</output>
      <br />
      <br />

      <label htmlFor="defense">Defensa:</label>
      <input
        onChange={handlerFormValues}
        type="range"
        id="defense"
        name="defense"
        min="0"
        max="230"
        value={form.defense}
      />
      <output htmlFor="defense">{form.defense}</output>
      <br />
      <br />

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
      <br />
      <br />

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
      <br />
      <br />

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
      <br />
      <br />

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
      <br />
      <br />

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
      <br />
      <br />
      <button onClick={handleSeccion}  disabled={errors.inputName} name="siguiente">
        Siguiente
      </button>
    </div>
  )}


  {/* //----------- SECCIÓN B ----------- */}
  {seccion === 2 && (
    <div class="seccion seccion-2">
      <h2>Selecciona los tipos de tu pokemon</h2>

      {
         types.map(e => (
              <div>
               <input onClick={handlerFormValues} class="checkbox" type="checkbox" key={e.id} id={e.name} name="types" value={e.name}/>
              <label htmlFor={e.name} id={`${e.name}-label`} >
              <img src={`src/assets/TypesLogos/${e.name}.webp`} alt={`Logo de tipo ${e.name}`} />
              </label>
              </div>
          ))
      }


      <span>{form.types.length > 2 ? 'Solo puedes seleccionar hasta 2 tipos' :''}</span>
      <button onClick={handleSeccion} name="atras">Atrás</button>
      <button onClick={handleSeccion} disabled={form.types.length > 2 || form.types.length === 0} name="siguiente">Siguiente</button>
    </div>
  )}


  {/* //----------- SECCIÓN C ----------- */}
  {seccion === 3 && (
      <div class="seccion">
        {newPokemon && (
          /* ESTO DEBE SER UNA VENTANA MODAL */
          <div>
            <div>
              <span>Pokemon creado con éxito!</span>
              <a href={`http://127.0.0.1:5173/pokemon/${newPokemon.id}`}>
                Aceptar
              </a>
            </div>
          </div>
        )}
        

        {newPokemon === false && (
          <div>
            <h2>Seccion C</h2>
            <div>
              {/* Acá poner unas imágenes con una pokebola por defecto y cuando se apriete 'generar'
                  cambiar el estilo al div para oscurecerlo y agregar una gif pokebola loading...
               */}
              {imgs.length === 0 && <p>Generando...</p>}
              <div>
                {imgs && imgs.map((img, index) => (
                  <div key={index}>
                    <input type="radio" id={`img-${index}`} name="selectedImage" value={img} onChange={handleImageClick} />
                    <label htmlFor={`img-${index}`}>
                      <img src={img} alt="pokemon" />
                    </label>
                  </div>
                ))}
              </div>
              {imgs.length > 0 && <span>Selecciona una imagen</span>}
              {/* <span>{errors.image}</span> */}
            </div>

            <div>
              <form>
                <textarea onChange={handleTextarea} onFocus={() => setFocused({...focused, inputTextarea: true})} 
                onBlur={() => setFocused({...focused, inputTextarea: false})} name="message" value={description}
                placeholder="Un pokemon de color negro, con forma de canguro y alas doradas..."></textarea>
                <br/>
                {focused.inputTextarea && errors.inputTextarea && <span>{errors.inputTextarea}</span>}
                <input onClick={handleTextareaButton} disabled={errors.inputTextarea} type="button" value="Generar"/>
              </form>
            </div>

            <button onClick={handleSeccion} name="atras">Atrás</button>
            <input onClick={handleCrearButton} disabled={imgs.length === 0} type="submit" value="Crear" />
          </div>
)}
</div>
)}


</form>

</div>
  <Footer />
    </div>
  );
};



export default FormPokemon;



