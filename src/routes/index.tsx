import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";

export default component$(() => {
  const pokemonId = useSignal(1); // primitivos
  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(false);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;

    pokemonId.value += value;
  });

  const toggleShowBackImage = $(
    () => (showBackImage.value = !showBackImage.value)
  );

  const toggleVisible = $(
    () => (isPokemonVisible.value = !isPokemonVisible.value)
  );

  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      <span class="text-9xl"> {pokemonId} </span>

      <PokemonImage
        id={pokemonId.value}
        backImage={showBackImage.value}
        isVisible={isPokemonVisible.value}
      />

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
