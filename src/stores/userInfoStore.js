import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialState = {
    id: null,
    //   name: '',
    //   email: '',
    //   avatar: '',
    //   role: '',
    isLogin: false
};

const useUserInfoStore = create(
    persist(
        (set, get) => ({
            ...initialState,

            setUserInfo: (data) => {
                set({
                    ...data,
                });
            },

            getUserInfo: () => {
                const state = get();
                return {
                    ...state
                    //   name: state.name,
                    //   email: state.email,
                    //   avatar: state.avatar,
                    //   role: state.role,
                    //   isLoggedIn: state.isLoggedIn
                };
            },

            clearUserInfo: () => {
                set(initialState);
            }
        }),
        {
            name: 'user-info-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                id: state.id,
                isLogin: state.isLogin
            }),
        }
    )
);

export default useUserInfoStore;