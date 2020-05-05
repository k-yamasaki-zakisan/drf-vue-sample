import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'

Vue.use(Vuex)

// 認証情報

const authModule = {
    strict: process.env.NODE_ENV !== 'production',
    namespaced: true,  
    state: {  
        username: '',
        isLoggedIn: false
    },

    getters: {
        username: state => state.username,
        isLoggedIn: state => state.isLoggedIn
    },

    mutations: {
        set (state, payload) {  
            state.username = payload.user.username
            state.isLoggedIn = true  
        },  
        clear (state) {  
            state.username = ''  
            state.isLoggedIn = false  
        }  
    }, 

    actions: {
        login (context, payload) {
            return api.post('/auth/jwt/create/', {
                'username': payload.username,  
                'password': payload.password  
            })  
            .then(response => {  
                // 認証⽤トークンを localStorage に保存  
                localStorage.setItem('access', 
                response.data.access)  
                // ユーザー情報を取得して store のユーザー情報を更新  
                return context.dispatch('reload')  
                    .then(user => user)
             })
        },
        /**  * ログアウト  */  
        logout (context) {
            // 認証⽤トークンを localStorage から削除
            localStorage.removeItem('access')  
            // store のユーザー情報をクリア  
            context.commit('clear')  
        }, 
        /* ユーザー情報更新  */  
        reload (context) {
            return api.get('/auth/users/me/')
                .then(response => {
                    const user = response.data
                    // store のユーザー情報を更新
                    context.commit('set', {user: user})
                    return user
                })
        }
    }
} 

// グローバルメッセージ 
const messageModule = {
    strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        error: '',
        warnings: [],
        info: '',
    },
    getters: {
        error: state => state.error,
        warnings: state => state.warnings,
        info: state => state.info
    },
    mutations: {
        set (state, payload) {
            if (payload.error) {
                state.error = payload.error
            }
            if (payload.warnings) {
                state.warnings = payload.warnings
            }  
            if (payload.info) {
                state.info = payload.info
            }
        },
        clear (state) {
            state.error = ''
            state.warnings = []
            state.info = ''
        }
    }, 
    actions: {
        /**  * エラーメッセージ表⽰  */
        setErrorMessage (context, payload) {
            context.commit('clear')
            context.commit('set', {'error': payload.message})  
        },
        /**  * 警告メッセージ （複数）表⽰  */
        setWarningMessages (context, payload) {
            context.commit('clear')
            context.commit('set', {'warnings': payload.messages})
        },
        /**  * インフォメーションメッセージ表⽰  */
        setInfoMessage (context, payload) {
            context.commit('clear') 
            context.commit('set', {'info': payload.message})
        },
        /**  * 全メッセージ削除  */
        clearMessages (context) {
            context.commit('clear')
        }
    }
}

const store = new Vuex.Store({  
    modules: {
        auth: authModule,
        message: messageModule,
    }
})

export default store 



