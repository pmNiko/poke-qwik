import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { usePokemonGame } from "~/hooks";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id) || id <= 0 || id > 1000) redirect(301, "/");

  return id;
});

export default component$(() => {
  const id = usePokemonId();
  const pokemon = usePokemonGame();

  return (
    <>
      <span class="text-xl-5"> Pokemon id: {id} </span>

      <PokemonImage
        id={id.value}
        backImage={pokemon.showBackImage.value}
        isVisible={pokemon.isVisible.value}
      />

      <div mt-2>
        <button
          class="btn btn-primary mr-2"
          onClick$={pokemon.toggleShowBackImage}
        >
          Voltear
        </button>
        <button class="btn btn-primary mr-2" onClick$={pokemon.toggleVisible}>
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon Detail",
};
