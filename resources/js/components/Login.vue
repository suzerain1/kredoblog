<template>
  <div>    
    <div class="form_container login_container">
        <h2>Login</h2>
        <div class="error_msg" v-if="errors.value != ''">{{errors}}</div>
        <form class="form_create" @submit.prevent="loginUser">
            <div>
                <label for="email">Email:</label>
                <input type="text" name="email" id="email" v-model="form.email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" v-model="form.password">
            </div>
            <div>
              <router-link :to="{ name: 'register' }" class="btn_create">Register</router-link> | <router-link :to="{ name: 'home.index' }" class="btn_create">Main</router-link><button type="submit" class="btn_submit">Login</button>
            </div>
            
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
            'email': '',
            'password': '',
        });

        const { errors, getUser, user } = useAuth();

        const loginUser = async () => {
            await getUser({
                data: {...form} 
            });
        }

        return {
            form,
            errors,
            loginUser,
            user
        }
    },
})
</script>