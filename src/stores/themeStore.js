import { create } from "zustand";

const useThemeStore = create((set) => ({
    themeMode: "light",
    toggleTheme: () =>
        set((state) => ({
            themeMode: state.themeMode === "light" ? "dark" : "light",
        })),
    setThemeLight: () => set({ themeMode: "light" }),
    setThemeDark: () => set({ themeMode: "dark" }),
}));

export default useThemeStore;
