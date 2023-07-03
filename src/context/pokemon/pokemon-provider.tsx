import {
  Slot,
  component$,
  useContextProvider,
  useStore,
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
    pokemonId: 4,
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

  return <Slot />;
});
