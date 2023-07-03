import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
interface Props {
  id: number | string;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 200, backImage = false, isVisible = true }: Props) => {
    const imageLoading = useSignal(true);

    // const back = backImage ? "back/" : "";

    useTask$(({ track }) => {
      track(() => id);

      imageLoading.value = true;
    });

    const back = useComputed$(() => {
      return backImage ? "back/" : "";
    });

    return (
      <div
        class="flex items-center justify-center "
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <span class={{ hidden: !imageLoading.value }}>Cargando...</span>

        <img
          class={[
            {
              hidden: imageLoading.value,
              "brightness-0": !isVisible,
            },
            "transition-all",
          ]}
          width={size}
          height={size}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${back.value}${id}.png`}
          alt="Pokemon sprite"
          onLoad$={() => (imageLoading.value = false)}
        />
      </div>
    );
  }
);
