import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import store from '@/store'
import BookList from "@/views/BookList"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    // ログインが必要な画⾯には 「requiresAuth」 フラグを付けておく
    routes: [
        {path:'/', component: HomePage, meta:{requiresAuth: true}},
        {path: '/login', component: LoginPage},
        {path: '*', redirect:'/'},
        {path: '/booklist', component: BookList},
    ]
})  


/**  * Router によって画⾯遷移する際に毎回実⾏される  */
router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters['auth/isLoggedIn']
    const token = localStorage.getItem('access')
    console.log('to.path=', to.path)
    console.log('isLoggedIn=', isLoggedIn)

    // ログインが必要な画⾯に遷移しようとした場合
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // ログインしている状態の場合
        if (isLoggedIn) {
            console.log('User is already logged in. So, free to next.')
            next()
            // ログインしていない状態の場合 
        } else {
            // まだ認証⽤トークンが残っていればユーザー情報を再取得
            if (token != null) {
                console.log('User is not logged in. Trying to reload again.')
                store.dispatch('auth/reload')  
                .then(() => {
                    // 再取得できたらそのまま次へ
                    console.log('Succeeded to reload. So, free to next.')
                    next()
                })
                .catch(() => {
                    // 再取得できなければログイン画⾯へ
                    forceToLoginPage(to, from, next)
                })
            } else {
                // 認証⽤トークンが無い場合は、 ログイン画⾯へ
                forceToLoginPage(to, from, next)
            }
        }
    } else {
        // ログインが不要な画⾯であればそのまま次へ
        console.log('Go to public page.')
        next()
    }
})

/**  * ログイン画⾯へ強制送還  */
function forceToLoginPage (to, from, next) {
    console.log('Force user to login page.')
    next({
        path: '/login',
        // 遷移先の URL はクエリ⽂字列として付加
        query: {next: to.fullPath}
    })
}

export default router 

