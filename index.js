const express = require('express');
const port = 5000;
const server = express();
const postsRouter = require('./posts/postsRoutes.js');

server.use(express.json());
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
  res.send('we in dis');
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
