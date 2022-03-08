import { ref } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';

export default function useAuth() {

    const user      = ref({value: []});
    const errors    = ref({value: ''});
    const router    = useRouter();
    const isLogged  = false;

    const getUser = async (data) => {
        errors.value = '';
        try {
            let res = await axios.post('/api/login', data.data);
            user.value = res.data;
            localStorage.setItem("userid", res.data.user.id);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("token", res.data.token);
            await router.push({ name: 'dashboard' });
        }catch (e) {
            for (const key in e.response.data.errors) {
                errors.value += e.response.data.errors[key][0] + ' ';
            }
        }
    }

    const saveUser = async (data) => {
        errors.value = '';
        try {
            let res = await axios.post('/api/register', data.data);
            user.value = res.data;
            localStorage.setItem("userid", res.data.user.id);
            localStorage.setItem("email", res.data.user.email);
            localStorage.setItem("token", res.data.token);
            await router.push({ name: 'dashboard' });
        } catch (e) {
            console.log(e.response);
        }
        
    }

    const logout = async () => {
        try {
            await axios.post('/api/logout');
            localStorage.clear();
            await router.push({ name: 'login' });
        } catch (e) {
            for (const key in e.response.data.errors) {
                errors.value += e.response.data.errors[key][0] + ' ';
            }
        }
        
    }

    return {
        user,
        errors,
        saveUser,
        getUser,
        logout,
    }

}