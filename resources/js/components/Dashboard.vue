<template>
  <div>
    <nav>
      <h1>Welcome <span style="color:#009A68">{{username}}</span></h1>
      <router-link :to="{ name: 'home.index' }" class="view_all">View Entire Blog</router-link>
      <router-link :to="{ name: 'post.create' }" class="btn_create">Create New</router-link>
    </nav>
    
    <div v-if="userpost.length">
        <table>
            <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Action</th>
            </tr>
            <tr v-for="blog in userpost" :key="blog.id">
            <td>{{ blog.title }}</td>
            <td>{{ blog.content }}</td>
            <td><router-link :to="{ name: 'post.edit', params: {id: `${blog.id}`}}" class="btn_update">Update</router-link> | <button class="btn_delete" @click="removePost(blog.id)">Delete</button></td>
            </tr>
        </table>
    </div>
    <div v-else class="no_blog">
        <h2>No Blog Post yet!</h2>
    </div>
    
  <button @click="logoutUser" class="btn_logout">Logout</button>
  </div>
</template>
<script>
import usePost from '../composables/post';
import useAuth from '../composables/auth';
import { onMounted } from 'vue'; 

export default {
    setup() {
        const { userpost, getPostByUser, deletePost } = usePost();
        const { logout } = useAuth();
        const username = localStorage.getItem('email');

        console.log('user_post', userpost);

        onMounted(getPostByUser);
        

        const removePost = async (id) => {

            if(!window.confirm('Delete Post?')) {
                return
            }
            await deletePost(id);
            await getPostByUser();
        }

        const logoutUser = async (id) => {
            if(!window.confirm('Confirm Logout?')) {
                return
            }
            await logout();
        }

        return {
            userpost,
            getPostByUser,
            removePost,
            logoutUser,
            username
        }
    }
}
</script>