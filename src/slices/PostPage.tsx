import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PostType } from '@/slices/Posts';
import { isImageURL } from '@/libs/IsImage';
import Image from 'next/image';
import { formatDate } from '@/libs/formatDate';

const PostPage = async ({ id }: { id: number }) => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const post: PostType = await response.json();
  const isValidURL = isImageURL(post.Image);
  return (
    <div className="flex flex-col  items-center">
      <div className="w-4/6 px-12 py-8 bg-slate-100 rounded-xl flex flex-col gap-8">
        {isValidURL && (
          <Image
            priority
            src={post.Image}
            alt="postimage"
            width={600}
            className="w-full object-cover h-96 rounded-md"
            height={96}
          />
        )}
        {!isValidURL && (
          <Image
            priority
            src={'https://paulvanderlaken.files.wordpress.com/2020/02/post-box-11.jpg'}
            alt="postimage"
            width={600}
            className="w-full object-cover h-96 rounded-md"
            height={96}
          />
        )}
        <div>
          <h2 className="text-4xl font-medium text-gray-700 mt-">{post.Title}</h2>
          <span className="text-sm font-light text-gray-400">{formatDate(post.createdAt)}</span>
        </div>
        <p className="text-base font-light text-gray-700">{post.Content}</p>
      </div>
    </div>
  );
};

export default PostPage;
