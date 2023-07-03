import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id) || id <= 0 || id > 1000) redirect(301, "/");

  return id;
});

export default component$(() => {
  // const id = useLocation().params.id;
  const id = usePokemonId();

  return (
    <>
      <span class="text-xl-5"> Pokemon id: {id} </span>

      <PokemonImage id={id.value} />
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon Detail",
};
