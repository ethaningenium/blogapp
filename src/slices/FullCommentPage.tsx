'use client';

import React, { useState, useEffect } from 'react';
import { CommentType } from './Posts';

const FullCommentPage = ({ id }: { id: number }) => {
  const [comments, setComments] = useState<CommentType[]>();

  useEffect(() => {
    async function getComments() {
      const response = await fetch(`http://localhost:3000/api/posts/${id}/comments`);
      const post: CommentType[] = await response.json();
      setComments(post);
      console.log(post);
    }
    getComments();
  }, [id]);
  return (
    <div>
      {comments?.map((comment) => {
        return <span key={comment.id}>{comment.Text}</span>;
      })}
    </div>
  );
};

export default FullCommentPage;
