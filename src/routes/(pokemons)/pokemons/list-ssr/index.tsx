import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  Link,
  routeLoader$,
  useLocation,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemon/pokemon-image";
import { Modal } from "~/components/shared";
import { chatGptResponse } from "~/helpers/get-chat-gpt--response";
import { getSamllPokemons } from "~/helpers/get-small-pokemons";
import type { SmallPokemon } from "~/interface";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get("offset") || "0");
    if (isNaN(offset) || offset < 0) redirect(301, pathname);

    return await getSamllPokemons(offset);
  }
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const modalIsVisible = useSignal(false);
  const modalPokemon = useStore({ id: "", name: "" });
  const chatGptPokemonData = useSignal("");

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);

    return Number(offsetString.get("offset") || 0);
  });

  const toggleModal = $(() => (modalIsVisible.value = !modalIsVisible.value));
  const openModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    toggleModal();
  });

  // TODO: PROBAR ASYNC
  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name);

    //reset de la señal
    chatGptPokemonData.value = "";

    if (!!modalPokemon.name) {
      chatGptResponse(modalPokemon.name).then(
        (data) => (chatGptPokemonData.value = data)
      );
    }
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Esta cargando página: {location.isNavigating ? "Si" : "No"}</span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class="btn btn-primary mr-2"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemons.value.map(({ id, name }) => (
          <div
            key={name}
            class="m-5 flex flex-col justify-center items-center"
            onClick$={() => openModal(id, name)}
          >
            <PokemonImage id={id} />
            <span class="capitalize"> {name} </span>
          </div>
        ))}
      </div>

      <Modal
        showModal={modalIsVisible.value}
        toggleModal={toggleModal}
        persistent
        size="lg"
      >
        <div q:slot="title-modal">{modalPokemon.name}</div>

        <div
          class="flex flex-col justify-center items-center"
          q:slot="content-modal"
        >
          <PokemonImage id={modalPokemon.id} />
          <span>
            {!!chatGptPokemonData.value ? (
              chatGptPokemonData.value
            ) : (
              <li class="flex items-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
                Preguntando a Chat GPT...
              </li>
            )}
          </span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
