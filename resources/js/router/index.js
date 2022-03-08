import { createRouter, createWebHistory } from "vue-router";
import useAuth from '../composables/auth';

import Home from '../components/Home';
import PostCreate from '../components/PostCreate';
import PostEdit from '../components/PostEdit';
import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';

const { user } = useAuth();

function isAuthenticated() {
    if (localStorage.getItem("token") === null) {
        return false;
    }
    return true
}

const routes = [
    {
        path: '/',
        name: 'home.index',
        component: Home        
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter(to, from, next) {
            if (isAuthenticated()) {
                next();
            } else {
                next('/login');
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
            if (isAuthenticated()) {
                next('/dashboard');
            } else {
                next();
            }
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
            if (isAuthenticated()) {
                next('/dashboard');
            } else {
                next();
            }
        }
    },
    {
        path: '/post/create',
        name: 'post.create',
        component: PostCreate,
        beforeEnter(to, from, next) {
            if (isAuthenticated()) {
                next();
            } else {
                next('/login');
            }
        }
    },
    {
        path: '/post/edit/:id',
        name: 'post.edit',
        component: PostEdit,
        props: true,
        beforeEnter(to, from, next) {
            if (isAuthenticated()) {
                next();
            } else {
                next('/login');
            }
        }
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})