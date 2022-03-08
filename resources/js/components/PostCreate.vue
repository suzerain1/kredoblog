<template>
  <div>
    <nav>
        <h1>Welcome <span style="color:#009A68">{{username}}</span></h1>
    </nav>
    
    <div class="form_container">
        <div class="error_msg" v-if="errors.value != ''">{{errors}}</div>
        <form class="form_create" @submit.prevent="storePost">
            <div>
                <label for="title">Title</label>
                <input type="text" name="title" id="name" v-model="form.title">
            </div>
            <div>
                <label for="content">Content</label>
                <textarea name="content" id="content" cols="30" rows="10" v-model="form.content"></textarea>
            </div>
            <router-link :to="{ name: 'dashboard' }" class="btn_dsh">Dashboard</router-link><button type="submit" class="btn_submit">Submit</button>
        </form>
    </div>
  </div>
</template> 
<script>
import usePost from '../composables/post';
import { reactive } from 'vue';

export default ({
    setup() {
        
        const username = localStorage.getItem('email');

        const form = reactive({
            'user_id': '',
            'title': '',
            'content': '',
        });

        const { errors, savePost } = usePost();

        const storePost = async () => {
            await savePost({
                data: {...form} 
            });
        }

        return {
            form,
            errors,
            storePost,
            username
        }
    },
})
</script>
