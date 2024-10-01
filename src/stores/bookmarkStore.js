import {create} from 'zustand';

const bookmarkStore = create((set) => ({
    isMarking: false,
    setIsMarking: (markingState)=> set({isMarking: markingState})
}));

export default bookmarkStore;