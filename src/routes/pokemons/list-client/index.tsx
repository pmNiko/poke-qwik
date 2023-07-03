import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { getSamllPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interface";

interface PokemonPageState {
  currentPage: number;
  pokemons: SmallPokemon[];
  isLoading: boolean;
  finalPage: boolean;
}

export default component$(() => {
  const pokemonState = useStore<PokemonPageState>({
    currentPage: 0,
    pokemons: [],
    isLoading: false,
    finalPage: false,
  });

  const nextPage = $(() => {
    if (!pokemonState.finalPage && !pokemonState.isLoading) {
      pokemonState.currentPage++;
    }
  });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    pokemonState.isLoading = true;

    const pokemons = await getSamllPokemons(pokemonState.currentPage * 10, 30);

    if (pokemons.length === 0) pokemonState.finalPage = true;

    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    pokemonState.isLoading = false;
  });
  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);

  //   const pokemons = await getSamllPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = pokemons;
  // });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      currentScroll + 200 > maxScroll && nextPage();
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Página actual: {pokemonState.currentPage} </span>
        <span>Esta cargando: </span>
      </div>

      <div class="mt-10">
        {/* <button
          class="btn btn-primary mr-2"
          onClick$={() => pokemonState.currentPage--}
        >
          Anteriores
        </button> */}
        <button
          class="btn btn-primary mr-2"
          onClick$={() => pokemonState.currentPage++}
        >
          Siguientes
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemonState.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id} />
            <span class="capitalize"> {name} </span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List Client",
};
