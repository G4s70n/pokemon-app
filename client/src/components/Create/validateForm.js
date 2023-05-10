export const validateForm = (form, allPokemons, description, setErrors) => {
    const newErrors = {};
  
    if (!/^[a-zA-Z]{3,15}$/.test(form.name)) newErrors.inputName = "El nombre solo puede contener letras, entre 3 y 15 caracteres";
    if (allPokemons.some(p => p.name === form.name))  newErrors.inputName = "El nombre ya existe, debe ser único";
  
    if (!/^[a-zA-Z,.\s]{10,100}$/.test(description)) newErrors.inputTextarea = "La descripción solo debe contener letras, entre 10 y 100 caracteres";
  
    setErrors(newErrors);
  };
  