<template>
    <div>    
        <div class="form_container login_container">
            <h2>Register</h2>
            <div class="error_msg" v-if="errors.value != ''">{{errors}}</div>
            <form class="form_create" @submit.prevent="storeUser">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" name="name" id="name" v-model="form.name">
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="text" name="email" id="email" v-model="form.email">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" v-model="form.password">
                </div>
                <div>
                    <label for="password_confirmation">Confirm Password:</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" v-model="form.password_confirmation">
                </div>
                <router-link :to="{ name: 'login' }" class="btn_create">Login</router-link> | <router-link :to="{ name: 'home.index' }" class="btn_create">Main</router-link><button type="submit" class="btn_submit">Register</button>
            </form>
        </div>
    </div>
</template>
<script>
import useAuth from '../composables/auth';
import { reactive } from 'vue';

export default ({
    setup() {
        
        const form = reactive({
            'name': '',
            'email': '',
            'password': '',
            'password_confirmation': '',
        });

        const { errors, saveUser } = useAuth();

        const storeUser = async () => {
            await saveUser({
                data: {...form} 
            });
        }

        return {
            form,
            errors,
            storeUser,
        }
    },
})
</script>