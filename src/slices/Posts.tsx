'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { isImageURL } from '@/libs/IsImage';
import { formatDate } from '@/libs/formatDate';
import { getToken } from '@/libs/TokenSetnGet';

export type PostType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  Title: string;
  Content: string;
  Image: string;
  AuthorId: number;
};

export type CommentType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  Text: string;
  AuthorId: number;
  PostId: number;
  Post: {
    id: number;
    createdAt: string;
    updatedAt: string;
    Title: string;
    Content: string;
    Image: string;
    AuthorId: number;
  };
  Author: {
    id: number;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    Email: string;
    Password: string;
  };
};

const SinglePost: React.FC<{ post: PostType }> = ({ post }) => {
  const isValidURL = isImageURL(post.Image);
  return (
    <div className="w-96 h-72 bg-slate-100 rounded-lg p-4 flex flex-col">
      {isValidURL && (
        <Image
          priority
          src={post.Image}
          alt="postimage"
          width={600}
          className="w-full object-cover h-48 rounded-md"
          height={96}
        />
      )}
      {!isValidURL && (
        <Image
          priority
          src={'https://paulvanderlaken.files.wordpress.com/2020/02/post-box-11.jpg'}
          alt="postimage"
          width={600}
          className="w-full object-cover h-48 rounded-md"
          height={96}
        />
      )}

      <h2 className="font-medium text-slate-600 text-xl mt-3">{post.Title}</h2>
      <span className="font-light text-slate-400 text-xs mt-2">{formatDate(post.createdAt)}</span>
    </div>
  );
};

const Allposts = () => {
  const [posts, setPosts] = useState<PostType[]>();
  useEffect(() => {
    console.log('rendered');
    async function getPosts() {
      const { data } = await axios.get('/api/posts');
      setPosts(data);
    }
    getPosts();
  }, []);

  return (
    <div className="flex mt-8 flex-wrap gap-8">
      {posts?.map((post) => {
        return <SinglePost key={post.id} post={post} />;
      })}
    </div>
  );
};
const MyPosts = () => {
  const token = getToken();
  const [posts, setPosts] = useState<PostType[]>();
  useEffect(() => {
    console.log('rendered');
    async function getPosts() {
      const { data } = await axios.post('/api/posts/mypost', {
        token: token,
      });
      setPosts(data);
    }
    getPosts();
  }, [token]);

  return (
    <div className="flex mt-8 flex-wrap gap-8">
      {posts?.map((post) => {
        return <SinglePost key={post.id} post={post} />;
      })}
    </div>
  );
};

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
  return (
    <div className="bg-slate-200 w-full p-4 rounded-xl flex gap-4">
      <div className="w-16 h-full bg-slate-400 rounded-md"></div>
      <div>
        <span className="text-xs text-gray-400">{comment.Post.Title}</span>
        <p className="text-sm text-gray-700 ">{comment.Text}</p>
      </div>
    </div>
  );
};

const CommentsBlock = () => {
  const token = getToken();
  const [comments, setComments] = useState<CommentType[]>();
  useEffect(() => {
    async function getPosts() {
      const { data } = await axios.post('/api/comments', {
        token: token,
      });
      setComments(data);
    }
    getPosts();
  }, [token]);
  return (
    <div className="w-1/3 bg-gray-100 h-screen rounded-2xl p-8 flex flex-col gap-4">
      <span className="text-2xl font-medium text-zinc-800">Комменты к моих постов</span>

      {comments?.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

const MainBlock = () => {
  const [isAllPosts, setIsAllPosts] = useState(true);
  return (
    <section className="w-full px-24 flex mt-6">
      <div className="w-2/3 h-screen flex flex-col">
        <div className="flex gap-4">
          <span
            onClick={() => {
              setIsAllPosts(true);
            }}
            className={`px-4 py-2 ${
              isAllPosts ? 'text-slate-800 bg-slate-200' : 'text-slate-400 bg-slate-50 '
            } rounded-lg cursor-pointer`}>
            Все посты
          </span>
          <span
            onClick={() => {
              setIsAllPosts(false);
            }}
            className={`px-4 py-2 ${
              !isAllPosts ? 'text-slate-800 bg-slate-200' : 'text-slate-400 bg-slate-50 '
            } rounded-lg cursor-pointer`}>
            Мои посты
          </span>
        </div>
        {isAllPosts ? <Allposts /> : <MyPosts />}
      </div>
      <CommentsBlock />
    </section>
  );
};

export default MainBlock;
