import { $, component$, useSignal } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";

export default component$(() => {
  const nav = useNavigate();
  const pokemonId = useSignal(1); // primitivos
  const showBackImage = useSignal(false);
  const isPokemonVisible = useSignal(true);

  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;

    pokemonId.value += value;
  });

  const goToPokemon = $(() => nav(`/pokemon/${pokemonId.value}`));

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

      {/* <Link href={`/pokemon/${pokemonId.value}/`}> */}
      <div onClick$={goToPokemon} class="custom-navlink">
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
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
