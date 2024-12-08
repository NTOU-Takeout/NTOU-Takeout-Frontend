import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
                console.debug('setUserInfo:', data);
                set({
                    ...data,
                });
                console.debug('setUserInfo:', get());
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
            storage: localStorage,
        }
    )
);

export default useUserInfoStore;