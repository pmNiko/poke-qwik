import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Navbar } from "~/components/shared";

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex flex-col justify-center items-center mt-10">
        <h4>Dashboard Layout</h4>
        <Slot />
      </div>
    </>
  );
});
