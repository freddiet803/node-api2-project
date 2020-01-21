import React, { useState, useEffect } from 'react';
import '../App.css'

const Postview = props => {
  return (
    <>
    <div className="post">
      <div>{props.thePost.title}</div>
      <div>{props.thePost.contents}</div>
      </div>
    </>
  );
};

export default Postview;
