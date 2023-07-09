import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  type PokemonGameState,
  PokemonGameContext,
} from "./pokemon-game.context";
import {
  type PokemonListState,
  PokemonListContext,
} from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    isPokemonVisible: true,
    showBackImage: false,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
    isFinalPage: false,
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    // TODO: Leer del local storage
    if (localStorage.getItem("pokemon-game")) {
      const {
        pokemonId = 10,
        isPokemonVisible = true,
        showBackImage = false,
      }: PokemonGameState = JSON.parse(localStorage.getItem("pokemon-game")!);

      pokemonGame.pokemonId = pokemonId;
      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isPokemonVisible,
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
    ]);

    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
