const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const app = express();

app.use(morgan("dev"));

// app.get("/", (req, res) => res.send("Hello World!"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE HTML>
    <html>
    <head>
      <title>Wizard News</title>
    </head>
    <body>
      <p>Above post test</p>
      <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
        )
        .join("")}
    </div>  
      <p>Below post test</p>
    </body>
    </html>`;
  res.send(html);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

// ${posts.map(post => { `<li>${/* */}</li>`; )}

// { post.list: list, post.find: find }
console.log("hi");

// <ul>
//   $
//   {posts.map((post) => {
//     `<li>${post.data}</li>`;
//   })}
// </ul>;
