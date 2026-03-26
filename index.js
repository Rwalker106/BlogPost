import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';  
import fs from 'fs';
import expressEjsLayouts from 'express-ejs-layouts';


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let blogPosts = [];
let nextId = 1;

try {
  const data = fs.readFileSync('posts.json', 'utf-8');
  blogPosts = JSON.parse(data);
  console.log('Loaded blog posts:', blogPosts);
} catch (err) {
  console.error('Error reading posts.json:', err);
  blogPosts = [];
 }
 
 if (blogPosts.length > 0) {
     nextId = Math.max(...blogPosts.map(p => p.id)) + 1;
  }

function savePosts() {
  try {
    fs.writeFileSync('posts.json', JSON.stringify(blogPosts, null, 2));
  } catch (err) {
    console.error('Error writing posts.json:', err);
  }
}


app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);  

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
app.locals.formatDate = formatDate;


app.locals.truncate = function (text, maxLength = 100) {
  if (text.length <= maxLength)  return text;
  return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...';
};

app.get('/', (req, res) => {
  if (blogPosts.length > 0) {
    blogPosts.sort((a, b) => b.createdAt - a.createdAt);
  }
  const limitedPosts = blogPosts.slice(0, 2);

  res.render('index', { blogPosts: limitedPosts });
});


app.get('/all', (req, res) => { 
  const page = parseInt(req.query.page) || 1;
  const postsPerPage = 2;

  blogPosts.sort((a, b) => b.createdAt - a.createdAt);

  const totalPosts = blogPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const postsForPage = blogPosts.slice(start, end);

  res.render('all', { 
    blogPosts: postsForPage,
    currentPage: page,
    totalPages: totalPages
  });
});


app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { title, content, author, picture, createDate, modifyDate } = req.body;
  // Here you can handle the form data, e.g., save it to a database
  const newPost = {
    id: nextId++,
    title,
    content,
    author,
    picture,
    createdAt: Date.now(), //system timestamp for when the post was created
    modifiedAt: null, //will be updated when the post is edited
  }
  blogPosts.push(newPost);
  savePosts();
  console.log(blogPosts);
  res.redirect('/');
});


app.get('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find(p => p.id === postId);
  if (post) {
    res.render('edit', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

app.post('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find(p => p.id === postId);
  if (post) {
    const { title, content, author, picture } = req.body;

    Object.assign(post, {
      title,
      content,
      author,
      picture,
      modifiedAt: Date.now()
    });
    savePosts();

    res.redirect('/edit/' + postId);
  } else {
    res.status(404).send('Post not found');
  }
}); 

app.post('/delete/:id', (req, res) => {
  const postId = Number(req.params.id);
  const post = blogPosts.find(p => p.id === postId);  
  if (post) {
    blogPosts = blogPosts.filter(p => p.id !== postId);
    savePosts();
    res.redirect('/all');
  } else {
    res.status(404).send('Post not found');
  }
});

app.get('/more/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find(p => p.id === postId);  
  if (post) {
    
    res.render('more', { post, noStickyFooter: true });
  } else {
    res.status(404).send('Post not found');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});