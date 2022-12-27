/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from "../../store/notification-context"

function Comments(props) {
  const { eventId } = props;
  
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  
  const ctx = useContext(NotificationContext);
  
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch('/api/comments/' + eventId)
      .then((response) => response.json())
      .then((data) => {
        setCommentsList(data.comments);
        setIsFetchingComments(false);
      });
    }
  }, [showComments])
  
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }
  
  function addCommentHandler(commentData) {
    ctx.showNotification({
      title:'Sending comment...!',
      message:'Your comment is currently being stored',
      status:'pending'
    });

    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong!')
      });
    })
    .then((data) => {
      ctx.showNotification({
        title:'Success!',
        message:'Successfully comment saved!',
        status:'success'
      });
    })
    .catch((error) => {
      ctx.showNotification({
        title:'Error!',
        message: error.message || 'Something went wrong!',
        status:'error'
      });
    })
  }
  
  return (
    <section className={classes.comments}>
    <button onClick={toggleCommentsHandler}>
    {showComments ? 'Hide' : 'Show'} Comments
    </button>
    {showComments && <NewComment onAddComment={addCommentHandler} />}
    {showComments && !isFetchingComments && <CommentList items={commentsList}/>}
    {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
    );
  }
  
  export default Comments;