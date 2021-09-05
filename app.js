const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const path = require("path");
const { PORT = 3000 } = process.env;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE HTML>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css"/>
    </head>
    <body>
      <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>  
    </body>
    </html>`;
  res.send(html);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) throw new Error("Post not found");
  const html = `<!DOCTYPE HTML>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css"/>
    </head>
    <body>
      <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span>${post.title}
          <small>(by ${post.name})</small>
          <div>${post.content}</div>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${post.date}
        </small>
      </div>
    </body>
    </html>`;

  res.send(html);
});

app.get("/users/:name", (req, res) => console.log(req.params.name));

app.use((err, req, res, next) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Oh, it's not here.</p>
        <img src="https://c.tenor.com/2lCoAAOAvUsAAAAC/dumbledore-frustrated.gif"/>
      </div>
    </body>
    </html>`;
  console.error(err.stack);
  res.status(404).send(html);
});

app.listen(PORT, () => console.log(`App listening in port ${PORT}`));
