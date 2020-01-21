import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Postview from './component/postview.js';

function App() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const doIt = () => {
      axios
        .get('http://localhost:5000/posts')
        .then(apost => {
          console.log(apost);
          console.log(apost.data);
          setPost(apost.data);
          //console.log(post);
        })
        .catch(err => {
          console.log(err, 'no post');
        });
    };

    doIt();
  }, []);

  return (
    <>
      <div className='App'>WE IN DIS NOW BISHES</div>
      {/* {post.map(aPost => {
        console.log(aPost);
      })} */}
      {post.map(aPost => {
        //console.log(post, 'post here');
        return <Postview key={aPost.id} thePost={aPost} />;
      })}
    </>
  );
}

export default App;
