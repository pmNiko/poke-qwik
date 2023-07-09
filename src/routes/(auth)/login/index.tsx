import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

import styles from "./login.css?inline";
import { randomUUID } from "crypto";

const hardcodeUserData = {
  email: "martin.panebianco@smandes.gob.ar",
  password: "nikolas",
};

export const useLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    if (JSON.stringify(data) === JSON.stringify(hardcodeUserData)) {
      const jwt = randomUUID().replaceAll("-", "tk_");
      cookie.set("jwt", jwt, { secure: true, path: "/" });

      redirect(302, "/");
    }

    return { success: false };
  },
  zod$({
    email: z.string().email("Formato no válido!"),
    password: z.string().min(6, "Minimo de 6 caracteres!"),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form">
      <div class="relative mt-10">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      {/* <p>
        {action.value?.success && (
          <code>Autenticado con token: {action.value.jwt}</code>
        )}
      </p> */}

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});
