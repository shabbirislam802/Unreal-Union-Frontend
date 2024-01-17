import {createStore} from 'vuex';

const store = createStore
({
    state: {
        isSignIn: !!sessionStorage.getItem('user')
    },
    mutations: {
        signIn(state) {
            state.isSignIn = true;
        },
        signOut(state) {
            state.isSignIn = false;
            if(sessionStorage.getItem('user')){
                sessionStorage.removeItem('user');
            }
        }
    },
    actions: {
        signIn({commit}) {
            commit('signIn');
        },
        signOut({commit}) {
            commit('signOut');
        }
    }
})

export default store;