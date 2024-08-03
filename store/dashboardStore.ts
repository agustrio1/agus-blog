import { create } from "zustand";

export type DashboardStore = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isSession: boolean;
    setIsSession: (isSession: boolean) => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
    isSession: false,
    setIsSession: (isSession) => set({ isSession }),
}))