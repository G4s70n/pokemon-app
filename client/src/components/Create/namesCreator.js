export const namesCreator = () => {

  let primeraSilaba = ["ana", "be", "ce", "de", "e", "fe", "ga", "he", "i", "je", "ka", "la", "me", "ne", "o", "pa", "que", "re", "se", "te", "u", "ve", "we", "xe", "ye", "za"];

  let segundaSilaba = ["ba", "bo", "ca", "co", "da", "de", "do", "fa", "fi", "ge", "go", "ha", "hi", "ja", "jo", "ka", "ke", "ko", "la", "le", "li", "lo", "ma", "me", "mi", "mo", "na", "ne", "no", "pa", "pe", "pi", "po", "qua", "ra", "re", "ri", "ro", "sa", "se", "si", "so", "ta", "te", "ti", "to", "va", "ve", "vi", "vo", "wa", "wi", "xa", "xe", "xi", "xo", "ya", "ye", "yo", "za", "ze", "zi", "zo"];

  let terceraSilaba = ["ba", "bo", "ca", "co", "da", "de", "do", "fa", "fi", "ge", "go", "ha", "hi", "ja", "jo", "ka", "ke", "ko", "la", "le", "li", "lo", "ma", "me", "mi", "mo", "na", "ne", "no", "pa", "pe", "pi", "po", "qua", "ra", "re", "ri", "ro", "sa", "se", "si", "so", "ta", "te", "ti", "to", "va", "ve", "vi", "vo", "wa", "wi", "xa", "xe", "xi", "xo", "ya", "ye", "yo", "za", "ze", "zi", "zo"];


  let nombreAleatorio = primeraSilaba[Math.floor(Math.random() * primeraSilaba.length)] + 
                       segundaSilaba[Math.floor(Math.random() * segundaSilaba.length)] +
                       terceraSilaba[Math.floor(Math.random() * terceraSilaba.length)];


  return nombreAleatorio;
  };
  