import { create } from "zustand";

const useSelectionStore = create((set) => ({
    selectedFilter: "",
    selectedSorter: "",
    selectedKeyword: "",
    isSubmitted: true,
    setSelectedKeyword: (state) =>
        set({
            selectedKeyword: state,
        }),
    setSelectedFilter: (state) =>
        set({
            selectedFilter: state,
        }),
    setSelectedSorter: (state) =>
        set({
            selectedSorter: state,
        }),
    setIsSubmitted: (state) =>
        set({
            isSubmitted: state,
        }),
}));

export default useSelectionStore;
