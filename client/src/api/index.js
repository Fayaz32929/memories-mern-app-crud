import axios from "axios";

const url = "https://merncrudapp-production-2f95.up.railway.app/posts";
export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatePost) => axios.patch(`${url}/${id}`, updatePost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
