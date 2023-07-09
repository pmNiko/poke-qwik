import {
  component$,
  Slot,
  useStyles$,
  useStylesScoped$,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  useStylesScoped$(styles);
  useStyles$(styles);

  return <Slot />;
});
