import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Define the posts array
const posts = [];

app.get('/', (req, res) => {
  res.render('index', { posts }); // Pass the posts array to the index.ejs view
});

app.get('/create', (req, res) => {
  res.render('createPost');
});

app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  console.log('New post created:', newPost);
  res.redirect('/');
});

app.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(post => post.id === parseInt(postId));
  if (!post) {
    res.send('Post not found');
  } else {
    res.render('post', { post });
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
