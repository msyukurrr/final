import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content };
    const res = await axios.post('/api/posts', post);
    setPosts([...posts, res.data]);
    setTitle('');
    setContent('');
  };

  useEffect(() => {
    axios.get('/api/posts/[postid]/comments')
    .then(response => {
      setComments(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const handleComment = async (e, post, comment) => {
    e.preventDefault();
    try{
      const response = await axios.post('/api/posts/${tripid}/comments', {content});
      console.log(response.data);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className={styles.container}>
      <Head>
        <title>Random blog</title>
        <meta name="description" content="Super random" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>SPILL THE TEA!</div>
        <p style={{fontSize:'20px'}}>{"Don't be shy, spill any tea you may have"}</p>

        <form onSubmit={handleSubmit} className={styles.formCont}>
          <label style={{marginBottom:10, fontSize:20}}>Title:
            <input type="text" placeholder='Give your post a title' onChange={(e) => setTitle(e.target.value)}/>
          </label>
          <label style={{marginBottom:10, fontSize:20}}>Content:
            <textarea type="text" placeholder='Spill it!' onChange={(e) => setContent(e.target.value)} />
          </label>
          <button style={{fontFamily:'Delicious Handrawn', height:'30px', width:'60px', fontSize:'16px', backgroundColor:'#adc178', borderRadius:'30px'}}type="submit">Submit</button>
        </form>

        <hr/>
        <h1>Look at all that spilt tea...</h1>
        {posts.map((post) => (
          <PostComp key={post.id} post={post} handleComment={handleComment} /> ))}
      </main>


    </div>
  )
}

function PostComp({ post, handleComment }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('/api/posts/${post.id}/comments')
    .then(response => {
      setComments(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, [post.id]);

  return (
    <div style={{backgroundColor:'#fefae0', borderRadius:'30px', width:'350px', display:'flex', flexDirection:'column'}}>
      <h1 style={{marginLeft:'20px'}}>{post.title}</h1>
      <p style={{marginLeft:'20px'}}>{post.content}</p>
      <form onSubmit={(e) => handleComment(e, post, comment)}>
      <label style={{marginLeft:'20px'}}>
        Comment:
        <textarea className={styles.commentInput} value={comment} onChange={(e) => setComment(e.target.value)}/>
      </label>
      <button style={{fontFamily:'Delicious Handrawn', height:'30px', width:'60px', fontSize:'16px', backgroundColor:'#adc178', borderRadius:'30px'}}className={styles.commentButton} type="submit">Submit</button>
      </form>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}