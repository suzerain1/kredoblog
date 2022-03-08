<template>
  <div>
    <nav>
      <router-link :to="{ name: 'dashboard' }" class="btn_create" v-if="token !== null"> My Dashboard</router-link>
      <router-link :to="{ name: 'login' }" class="btn_create" v-else>Login</router-link>
    </nav>
    <h2>All Blogs</h2>
    <table>
    <tr>
      <th>Title</th>
      <th>Content</th>
      <th>Creator</th>
    </tr>
    <tr v-for="blog in post" :key="blog.id">
      <td>{{ blog.title }}</td>
      <td>{{ blog.content }}</td>
      <td>{{ blog.email }}</td>
    </tr>
  </table>
  </div>
</template>
<script>
import usePost from '../composables/post';

import { onMounted } from 'vue';

export default {
  setup() {
    const { post, getPost } = usePost();
    const token = localStorage.getItem('token');

    onMounted(getPost);

    return {
      token,
      post
    }

  }
}
</script>