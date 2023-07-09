import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../../icons/qwik";
import styles from "./navbar.module.css";
import { Link } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <Link href="/" about="qwik">
            <QwikLogo height={50} />
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/dashboard/"> Dashboard</Link>
          </li>
          <li>
            <Link href="/login/"> Login</Link>
          </li>
          <li>
            <Link href="/pokemons/list-ssr/"> List-SSR</Link>
          </li>
          <li>
            <Link href="/pokemons/list-client/"> List-Client</Link>
          </li>
          <li>
            <Link href="/counter/"> Counter</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
