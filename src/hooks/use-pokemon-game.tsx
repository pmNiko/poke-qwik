import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return;

    pokemonGame.pokemonId += value;
  });

  const previusPokemon = $(() => changePokemonId(-1));
  const nextPokemon = $(() => changePokemonId(+1));

  const toggleShowBackImage = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });

  const toggleVisible = $(() => {
    pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible;
  });

  return {
    id: useComputed$(() => pokemonGame.pokemonId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isVisible: useComputed$(() => pokemonGame.isPokemonVisible),

    previus: previusPokemon,
    next: nextPokemon,
    toggleShowBackImage: toggleShowBackImage,
    toggleVisible: toggleVisible,
  };
};
