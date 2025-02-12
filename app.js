const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

// Sample blog posts (in a real application, this would be a database)
let posts = [
  { id: 1, title: 'First Post', content: 'This is the content of the first post', timestamp: new Date() },
  { id: 2, title: 'Second Post', content: 'Content for the second post goes here.', timestamp: new Date() }
];

// Set up Handlebars as the view engine
app.engine('hbs', engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route: GET / (Display all posts)
app.get('/', (req, res) => {
  res.render('home', { posts });
});

// Route: GET /post/:id (Display a single post)
app.get('/post/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

// Route: POST /add (Add a new blog post)
app.post('/add', (req, res) => {
  const { title, content } = req.body;

  if (title && content) {
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      timestamp: new Date()
    };
    
    posts.push(newPost);
    res.redirect('/');
  } else {
    res.status(400).send('Title and content are required');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


