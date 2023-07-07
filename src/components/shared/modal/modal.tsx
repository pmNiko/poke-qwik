import { Slot, component$, useStylesScoped$, type QRL } from "@builder.io/qwik";
import ModalStyles from "./modal.css?inline";

interface ModalProp {
  showModal?: boolean;
  toggleModal: QRL<() => boolean>;
  persistent?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Modal = component$(
  ({
    showModal = false,
    toggleModal,
    persistent = false,
    size = "md",
  }: ModalProp) => {
    useStylesScoped$(ModalStyles);

    return (
      // hidden https://www.section.io/engineering-education/creating-a-modal-dialog-with-tailwind-css/
      <div
        id="modal-content"
        onClick$={() => !persistent && toggleModal()}
        class={showModal ? "modal-background" : "hidden"}
      >
        <div
          class={`modal-content modal-${size} `}
          onClick$={(e) => e.stopPropagation()}
        >
          <div class="mt-3 text-center">
            <h3 class="modal-title">
              <Slot name="title-modal" />
            </h3>

            <div class="mt-2 px-7 py-3">
              <div class="modal-content-text">
                <Slot name="content-modal" />
              </div>
            </div>

            {/* Botton */}
            <div class="items-center px-4 py-3">
              <button id="ok-btn" class="modal-button" onClick$={toggleModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
