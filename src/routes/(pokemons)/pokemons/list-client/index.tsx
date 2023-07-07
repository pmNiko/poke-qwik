import {
  $,
  component$,
  useContext,
  useOnDocument,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { PokemonListContext } from "~/context";
import { getSamllPokemons } from "~/helpers/get-small-pokemons";

// interface PokemonPageState {
//   currentPage: number;
//   pokemons: SmallPokemon[];
//   isLoading: boolean;
//   finalPage: boolean;
// }

export default component$(() => {
  const pokemonList = useContext(PokemonListContext);
  // const pokemonState = useStore<PokemonPageState>({
  //   currentPage: 0,
  //   pokemons: [],
  //   isLoading: false,
  //   finalPage: false,
  // });

  const nextPage = $(() => {
    if (!pokemonList.isFinalPage && !pokemonList.isLoading) {
      pokemonList.currentPage++;
    }
  });

  useTask$(async ({ track }) => {
    track(() => pokemonList.currentPage);

    pokemonList.isLoading = true;

    const pokemons = await getSamllPokemons(pokemonList.currentPage * 10, 30);

    if (pokemons.length === 0) pokemonList.isFinalPage = true;

    pokemonList.pokemons = [...pokemonList.pokemons, ...pokemons];

    pokemonList.isLoading = false;
  });

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
        <span>Página actual: {pokemonList.currentPage} </span>
        <span>Esta cargando: </span>
      </div>

      <div class="mt-10">
        <button
          class="btn btn-primary mr-2"
          onClick$={() => pokemonList.currentPage++}
        >
          Siguientes
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {pokemonList.pokemons.map(({ name, id }, i) => (
          <div
            key={name + id + i}
            class="m-5 flex flex-col justify-center items-center"
          >
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
