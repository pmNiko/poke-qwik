import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const formState = useStore({
    email: "",
    password: "",
    formPosted: false,
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes("@") || !formState.email) return "";

    return "not-valid";
  });

  const passwordError = useComputed$(() => {
    if (!formState.password || formState.password.length >= 6) return "";

    return "not-valid";
  });

  const isFormValid = useComputed$(() => {
    return (
      emailError.value === "not-valid" && passwordError.value === "not-valid"
    );
  });

  const onSubmit = $(() => {
    const { email, password } = formState;
    if (isFormValid.value) {
      console.table([email, password, isFormValid.value]);
    }
  });

  return (
    <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
      <div class="relative">
        <input
          onInput$={(e) =>
            (formState.email = (e.target as HTMLInputElement).value)
          }
          value={formState.email}
          class={emailError.value}
          name="email"
          type="text"
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          onInput$={(e) =>
            (formState.password = (e.target as HTMLInputElement).value)
          }
          value={formState.password}
          class={passwordError.value}
          name="password"
          type="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <code>
        {JSON.stringify(
          { ...formState, ...{ isFormValid: isFormValid.value } },
          undefined,
          2
        )}
      </code>
    </form>
  );
});
