import { $, component$, useSignal, useContext } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const nav = useNavigate();

  const pokemonGame = useContext(PokemonGameContext);

  /** Se reemplazan por el context */
  // const pokemonId = useSignal(1); // primitivos
  // const showBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(true);

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return;

    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $(() => nav(`/pokemon/${pokemonGame.pokemonId}`));

  const toggleShowBackImage = $(
    () => (pokemonGame.showBackImage = !pokemonGame.showBackImage)
  );

  const toggleVisible = $(
    () => (pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible)
  );

  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      <span class="text-9xl"> {pokemonGame.pokemonId} </span>

      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div onClick$={goToPokemon} class="custom-navlink">
        <PokemonImage
          id={pokemonGame.pokemonId}
          backImage={pokemonGame.showBackImage}
          isVisible={pokemonGame.isPokemonVisible}
        />
      </div>
      {/* </Link> */}

      <div mt-2>
        <button
          class="btn btn-primary mr-2 "
          onClick$={() => changePokemonId(-1)}
        >
          Anterior
        </button>
        <button class="btn btn-primary mr-2" onClick$={toggleShowBackImage}>
          Voltear
        </button>
        <button class="btn btn-primary mr-2" onClick$={toggleVisible}>
          Revelar
        </button>
        <button class="btn btn-primary" onClick$={() => changePokemonId(1)}>
          Siguiente
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Poke-Qwik",
    },
  ],
};
