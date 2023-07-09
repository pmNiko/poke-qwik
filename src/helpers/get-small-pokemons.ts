import type { PokemonListResponse, SmallPokemon } from "~/interface";

export const getSamllPokemons = async (
  offset: number = 0,
  limit: number = 10
): Promise<SmallPokemon[]> => {
  const resp = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  const data = (await resp.json()) as PokemonListResponse;

  return data.results.map(({ url, name }) => {
    const id = url.split("/").at(-2)!;

    return {
      id,
      name,
    };
  });
};
