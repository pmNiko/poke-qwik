import {
  component$,
  Slot,
  useStyles$,
  useStylesScoped$,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Navbar from "~/components/shared/navbar/navbar";

import styles from "./styles.css?inline";
import { PokemonProvider } from "~/context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  useStylesScoped$(styles);
  useStyles$(styles);

  return (
    <PokemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </PokemonProvider>
  );
});
