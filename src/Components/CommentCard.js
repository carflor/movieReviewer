import React from 'react';

const CommentCard = ({ author, message }) => {
  const firstUpper = author.split('')
  const caps = firstUpper[0].toUpperCase()
  firstUpper.shift()
  const fixedName = [caps, ...firstUpper].join('')
  return  (
    <section className='single-comment-box'>
      <p className='name-comment'>{fixedName}</p>
      <article className='comment-text'>{message}</article>
    </section>
  )
}

export default CommentCard;