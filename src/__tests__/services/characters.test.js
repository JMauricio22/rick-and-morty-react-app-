import { getAllCharacters, getCharacterById } from "../../services/characters";
import config from "../../services/config";

jest.mock("../../services/config.js", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("Get all characters", () => {
  test("Should returns an array with data if the API request succeeds", async () => {
    config.get.mockResolvedValue({
      data: {
        results: [
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
        ],
      },
    });

    // Get data from API
    const data = await getAllCharacters();

    // Check if data is array
    expect(Array.isArray(data)).toBeTruthy();

    expect(data).toHaveLength(2);
  });

  test("Should throw an error if the API request fails", async () => {
    config.get.mockRejectedValue(new Error("Api Error!!!"));

    await expect(getAllCharacters()).rejects.toThrow("Api Error!!");
  });
});

describe("Get character by id", () => {
  test("Should returns an array with data if the API request succeeds", async () => {
    const character = {
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
    };

    config.get.mockResolvedValue({
      data: character,
    });

    // Check if data is array
    await expect(getCharacterById()).resolves.toBe(character);
  });

  test("Should throw an error if the API request fails", async () => {
    config.get.mockRejectedValue(new Error("Api Error!!!"));

    await expect(getCharacterById()).rejects.toThrow("Api Error!!");
  });
});
