import { create } from "zustand";

export interface InputDataType {
  title: string;
  content: string;
  invite: string[];
}

interface InputStore {
  inputData: InputDataType;
  setInputData: (data: InputDataType) => void;
}

export const useInputStore = create<InputStore>((set) => ({
  inputData: {
    title: "",
    content: "",
    invite: [],
  },

  setInputData: (data) => {
    set((state) => ({
      inputData: {
        ...state.inputData,
        ...data,
      },
    }));
  },
}));
