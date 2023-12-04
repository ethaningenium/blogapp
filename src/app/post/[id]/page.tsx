import React, { useState, useEffect } from 'react';

import FullCommentPage from '@/slices/FullCommentPage';
import PostPage from '@/slices/PostPage';
import Header from '@/slices/Header';

const Page = ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  return (
    <>
      <Header />
      <div className="w-full px-12 min-h-screen bg-slate-50 pt-8">
        <PostPage id={Number(postId)} />
        <FullCommentPage id={Number(postId)} />
      </div>
    </>
  );
};

export default Page;
