import VueRouter from 'vue-router';
import Vue from "vue";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'manage',
            component: () => import('../components/Manage.vue'),
            redirect: '/home',
            children: [
                {path: 'feedback', name: '意见反馈', component: () => import('../components/Feedback.vue')},
                {path: 'home', name: '首页', component: () => import('../components/Home.vue')},
                {path: 'sina', name: '新浪国内新闻', component: () => import('../components/Sina.vue')},
                {path: 'person', name: '个人信息', component: () => import('../components/Person.vue')},
                {path: 'wy', name: '网易国内新闻', component: () => import('../components/Wy.vue')},
                {path: 'eastmoney', name: '东方财富', component: () => import('../components/Eastmoney.vue')},
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../components/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../components/Register.vue')
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('../components/Index.vue')
        },
        {
            path: '/feedback',
            name: 'feedback',
            component: () => import('../components/Feedback.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    let allowedPath = ['/login','/register','/index'];
    if(!localStorage.getItem("user") && !allowedPath.includes(to.path)){
        router.app.$message.error("请先登录");
        router.push("/login");
        return;
    }
    localStorage.setItem("currentPathName",to.name);
    next();
})

export default router;