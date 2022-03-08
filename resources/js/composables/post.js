import { ref } from 'vue';
import axios from "axios";
import { useRouter } from 'vue-router';

export default function usePost() {

    const user_id    = localStorage.getItem('userid');
    const post       = ref({value: []});
    const userpost   = ref({value: []});
    const s_post     = ref({value: []});
    const router     = useRouter();
    const errors     = ref({value: ''});

    const getPost = async () => {
        let res = await axios.get('/api/posts');
        post.value = res.data;
    }

    const getPostByUser = async () => {
        let res = await axios.get('/api/posts/user/'+user_id);
        userpost.value = res.data;
    }

    const getSinglePost = async (id) => {
        let res = await axios.get('/api/posts/'+id);
        s_post.value = res.data;
    }

    const savePost = async (data) => {
        errors.value = '';
        data.data.user_id = user_id;
        try {
            await axios.post('/api/posts', data.data);
            await router.push({ name: 'dashboard' });
        } catch (e) {
            if(e.response.status == 422) {
                errors.value = e.response.data.message;
            }
        }
        
    }

    const updatePost = async (id) => {
        errors.value = '';
        console.log('possss', s_post.value);
        try {
            await axios.put('/api/posts/'+ id, s_post.value);
            await router.push({ name: 'dashboard' });
        } catch (e) {
            if(e.response.status == 422) {
                errors.value = e.response.data.message;
            }
        }
        
    }

    const deletePost = async (id) => {
        await axios.delete('/api/posts/'+id);
    }

    return {
        post,
        userpost,
        s_post,
        errors,
        getPost,
        getPostByUser,
        getSinglePost,
        savePost,
        updatePost,
        deletePost
    }

}