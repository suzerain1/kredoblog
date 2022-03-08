<template>
  <div>
    <nav>
        <h1>Welcome <span style="color:#009A68">{{username}}</span></h1>
    </nav>
    
    <div class="form_container">
        <h2>Update blog</h2>
        <div class="error_msg" v-if="errors.value != ''">{{errors}}</div>
        <form class="form_create" v-on:submit.prevent="savePost">
            <div>
                <label for="title">Title</label>
                <input type="text" name="title" id="name" v-model="s_post.title">
            </div>
            <div>
                <label for="content">Content</label>
                <textarea name="content" id="content" cols="30" rows="10" v-model="s_post.content"></textarea>
            </div>
            <router-link :to="{ name: 'dashboard' }" class="btn_dsh">Dashboard</router-link><button type="submit" class="btn_submit">Submit</button>
        </form>
    </div>
  </div>
</template> 
<script>
import usePost from '../composables/post';
import { onMounted } from 'vue';

export default ({
    props: {
        id: {
            required: true,
            type: String
        }
    },
    setup(props) {
        const username = localStorage.getItem('email');
        const { s_post, getSinglePost, updatePost, errors } = usePost();
        
        onMounted(getSinglePost(props.id));

        const savePost = async () => {
            await updatePost(props.id);
        }

        return {
            s_post,
            savePost,
            errors,
            username
        }
    },
})
</script>
