<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\models\Post;

class PostController extends Controller
{
    //get all Post
    public function getPost() {

        // return response()->json(Post::all());
        $post = Post::join('users', 'users.id', '=', 'posts.user_id')->get(['users.email', 'posts.*']);

        return response()->json($post, 200);

    }
 
    //get Post by user ID
    public function getPostByUser($id) {

        $post = Post::where('user_id', '=', $id)->get();

        if(is_null($post)) {
            return response()->json(['msg' => 'Post not found'], 404);
        }
        return response()->json($post, 200);

    }

    //get post by Id
    public function getPostById($id) {

        $post = Post::find($id);
        if(is_null($post)) {
            return response()->json(['msg' => 'Post not found'], 404);
        }
        return response()->json($post, 200);

    }

    //add new Post
    public function addPost(Request $request) {

        request()->validate([
            'user_id' => 'required',
            'title' => 'required',
            'content' => 'required',
        ]);
        $post = Post::create($request->all());

        return response($post, 201);

    }

    //Update Post
    public function updatePost(Request $request, $id) {

        $post = Post::find($id);
        if(is_null($post)) {
            return response()->json(['msg' => 'Post not found'], 404);
        }
        $post->update($request->all());
        return response($post, 200);

    }

    //Delete Post
    public function deletePost(Request $request, $id) {

        $post = Post::find($id);
        if(is_null($post)) {
            return response()->json(['msg' => 'Post not found'], 404);
        }
        $post->delete();
        return response()->json(null, 204);

    }

}
