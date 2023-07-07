import { $, component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { usePokemonGame } from "~/hooks";

export default component$(() => {
  const pokemon = usePokemonGame();
  const nav = useNavigate();

  const goToPokemon = $(() => nav(`/pokemon/${pokemon.id.value}`));

  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      <span class="text-9xl"> {pokemon.id.value} </span>

      <div onClick$={goToPokemon} class="custom-navlink">
        <PokemonImage
          id={pokemon.id.value}
          backImage={pokemon.showBackImage.value}
          isVisible={pokemon.isVisible.value}
        />
      </div>

      <div mt-2>
        <button class="btn btn-primary mr-2 " onClick$={pokemon.previus}>
          Anterior
        </button>
        <button
          class="btn btn-primary mr-2"
          onClick$={pokemon.toggleShowBackImage}
        >
          Voltear
        </button>
        <button class="btn btn-primary mr-2" onClick$={pokemon.toggleVisible}>
          Revelar
        </button>
        <button class="btn btn-primary" onClick$={pokemon.next}>
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
