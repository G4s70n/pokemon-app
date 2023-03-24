# pokemon-api
En construcción


GET
    request all pokemons:        http://localhost:3001/pokemons

    request by name:            http://localhost:3001/pokemons?name=pedo

    request by ID:              http://localhost:3001/pokemons/:id

    request types:           http://localhost:3001/pokemons/types

    request evolutions by ID: http://localhost:3001/pokemons/evolutions/:id



POST
    created:    http://localhost:3001/pokemons
    {
      "name": "pedo",
      "image": "http://caca.com",
      "species": "dfs",
      "hp":43,
      "attack":545 ,
      "defense":45 ,
      "speed":54 ,
      "specialAttack": 656,
      "specialDefense": 565,
      "weight":656 ,
      "height": 656,
      "types": ["tierra", "aire"]
    }