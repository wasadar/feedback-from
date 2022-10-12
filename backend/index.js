const http = require("http");
const mysql = require("mysql2");
const fs = require("fs");

const PORT = 5000;
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "feedback",
  password: "P@55W0RD"
});

const server = http.createServer(async (request, result) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    "Content-Type": "application/json"
  };

  result.writeHead(200, headers);
  let message = "";

  if (request.method === "POST" && request.url === "/api/save_feedback") {
    let data = "";

    request.on('data', body => {
      data += body.toString();
      console.log(data);
    })

    request.on('end', () => {
      data = JSON.parse(data);
      data = [data.name,data.email,data.message];
  
      connection.query("INSERT INTO feedback(user_name, user_email, user_message) VALUES(?,?,?)", data, function(error, result){
        if (error) console.log(error);
        else console.log(data);
      });
    })

    message = JSON.stringify({ message: "Feedback saved" });
  }

  else {
    message = JSON.stringify({ message: "Route not found" });
  }

  result.end(message);
}).listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});