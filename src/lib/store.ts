import { create } from "zustand";
import { steps } from "@/steps";

// Define the form data type
type FormData = {
  ticket_id: string;
  number_of_tickets: number;
  avatar: string;
  name: string;
  email: string;
};

// Define Zustand state and actions
export type State = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  isFinal: boolean;
  formData: FormData;
};

export type Actions = {
  nextPage: () => void;
  prevPage: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
};

// Initialize Zustand store
export const useTicketStore = create<State & Actions>((set) => {
  const totalSteps = steps.length;

  const storedData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("ticketFormData") || "{}")
      : {};
  const storedPage =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("currentPage")) || 0
      : 0;

  return {
    currentPage: Math.min(storedPage, totalSteps - 1),
    hasNextPage: storedPage < totalSteps - 1,
    hasPrevPage: storedPage > 0,
    isFinal: storedPage === totalSteps - 1,
    formData: {
      ticket_id: "",
      number_of_tickets: 1,
      avatar: "",
      name: "",
      email: "",
      ...storedData,
    },

    nextPage: () => {
      set((state) => {
        if (state.currentPage >= totalSteps - 1) return state;

        const newPage = state.currentPage + 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("currentPage", newPage.toString());
        }

        return {
          currentPage: newPage,
          hasNextPage: newPage < totalSteps - 1,
          hasPrevPage: newPage > 0,
          isFinal: newPage === totalSteps - 1,
        };
      });
    },

    prevPage: () => {
      set((state) => {
        if (state.currentPage === 0) return state;

        const newPage = state.currentPage - 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("currentPage", newPage.toString());
        }

        return {
          currentPage: newPage,
          hasNextPage: newPage < totalSteps - 1,
          hasPrevPage: newPage > 0,
          isFinal: newPage === totalSteps - 1,
        };
      });
    },

    updateFormData: (data) => {
      set((state) => {
        const updatedData = { ...state.formData, ...data };
        if (typeof window !== "undefined") {
          localStorage.setItem("ticketFormData", JSON.stringify(updatedData));
        }
        return { formData: updatedData };
      });
    },

    resetFormData: () => {
      set(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("ticketFormData");
          localStorage.setItem("currentPage", "0");
        }
        return {
          currentPage: 0,
          hasNextPage: totalSteps > 1,
          hasPrevPage: false,
          isFinal: false,
          formData: {
            ticket_id: "",
            number_of_tickets: 1,
            avatar: "",
            name: "",
            email: "",
          },
        };
      });
    },
  };
});
