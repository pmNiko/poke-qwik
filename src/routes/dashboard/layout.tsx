import { Slot, component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { Navbar } from "~/components/shared";

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get("jwt");

  if (!jwtCookie) redirect(302, "/login");
});

export default component$(() => {
  useCheckAuthCookie();

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
