import { createContextId } from "@builder.io/qwik";
import { SmallPokemon } from "~/interface";

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
  isFinalPage: boolean;
}

export const PokemonListContext = createContextId<PokemonListState>(
  "pokemon.list-context"
);
