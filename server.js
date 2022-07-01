const http = require("http");
const fs = require("fs");
var dayjs = require("dayjs");
require("dayjs/locale/fr");
require("dotenv").config();

const { students } = require("./Data/Students");
const { transformDate } = require("./utils");

transformDate(students);

http
  .createServer((req, res) => {
    const url = req.url.replace("/", "");

    if (url === "") {
      const home = fs.readFileSync("./view/home.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(home);
      res.end();
    }

    if (url === "users") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      let users = [];
      for (let i = 0; i < students.length; i++) {
        users.push( `${students[i].name} ${students[i].birth} <form action="" method="post">
        <button name="deleteUser" value="${i}" class="btn btn-primary">DELETE</button>
    </form>`);
      }
      res.end(`
                        <h1>Tous les etudiants</h1>
                        ${users} 
                        <p><a href="http://127.0.0.1:3000">Accueil</a></p>
                        <p><a href="http://127.0.0.1:3000/users">Actualiser</a><p>
                        `);
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        if (req.url === "/users") {
          const deleteUser = body.split("=").pop();
          if (deleteUser) {
            students.splice(deleteUser, 1);
          }
          res.writeHead(301, { Location: `http://127.0.0.1:3000/users` });
          res.end();
        } else {
          const split = body.toString().split("&");
          const name = split[0].split("=").pop();
          const date = split[1].split("=").pop();
          if (name) {
            students.push({
              name: name,
              birth: dayjs(date).locale("fr").format("dddd D MMMM YYYY"),
            });
          }
          res.writeHead(301, { Location: `http://127.0.0.1:3000` });
          res.end();
        }
      });
    }
  })
  .listen(process.env.PORT);
console.log("Server running at http://127.0.0.1:3000");
