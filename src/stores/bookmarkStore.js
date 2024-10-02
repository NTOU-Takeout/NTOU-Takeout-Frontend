import {create} from 'zustand';

const bookmarkStore = create((set) => ({
    isMarked: false,
    setIsMarked: (markedState)=> set({isMarked: markedState})
}));

export default bookmarkStore;


