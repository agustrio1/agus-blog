import {create} from "zustand";

interface NavbarStore {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({isOpen}),
}))