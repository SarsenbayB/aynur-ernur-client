import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios";

export interface Post {
  _id: string;
  title: string;
  text: string;
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
  user?: {
    _id: string;
    fullName: string;
    avatarUrl?: string;
  };
}

interface PostsState {
  posts: {
    items: Post[];
    status: "loading" | "loaded" | "error";
  };
  tags: {
    items: string[];
    status: "loading" | "loaded" | "error";
  };
}

const initialState: PostsState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const { data } = await axios.get("/posts");
    return data;
  }
);

export const fetchRemovePost = createAsyncThunk<string, string>(
  "posts/fetchRemovePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
    return id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      });

    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (post) => post._id !== action.meta.arg
      );
    });
  },
});

export const postsReducer = postsSlice.reducer;
