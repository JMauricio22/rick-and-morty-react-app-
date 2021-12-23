export const getAllCharacters = () =>
  Promise.resolve([
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth (C-137)",
      },
      location: {
        name: "Citadel of Ricks",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "unknown",
      },
      location: {
        name: "Citadel of Ricks",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    },
  ]);
