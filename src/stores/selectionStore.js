import { create } from "zustand";

const useSelectionStore = create((set) => ({
    selectedSortBy: "",
    selectedSortDir: "",
    selectedKeyword: "",
    isSubmitted: true,
    setSelectedKeyword: (state) =>
        set({
            selectedKeyword: state,
        }),
    setSelectedSortBy: (state) =>
        set({
            selectedSortBy: state,
        }),
    setSelectedSortDir: (state) =>
        set({
            selectedSortDir: state,
        }),
    setIsSubmitted: (state) =>
        set({
            isSubmitted: state,
        }),
}));

export default useSelectionStore;
