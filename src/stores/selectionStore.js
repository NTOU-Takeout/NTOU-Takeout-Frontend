import { create } from "zustand";

const useSelectionStore = create((set) => ({
    selectedSortBy: localStorage.getItem("selectedSortBy"),
    selectedSortDir: localStorage.getItem("selectedSortDir"),
    selectedKeyword: localStorage.getItem("selectedKeyword"),
    isSubmitted: true,
    showSelectionBar: false,
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
    setShowSelectionBar: (state) =>
        set({
            showSelectionBar: state,
        }),
}));

export default useSelectionStore;
