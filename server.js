const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const app =  express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

let notes = [
    {   id: 0,
        content: `Esta nueva convocatoria pone el énfasis en la renovación de la 
        funcionalidad y adecuación de las bibliotecas escolares para convertirlas en espacios 
        atractivo`,

    }
];
let nextId = 1;

app.get("/notes",(req, res) => {
  res.send(JSON.stringify(notes));
});

app.post("/notes", async(req, res) => {
    const { text } = req.body; 

    await new Promise((resolve) => {
       
        notes.push({ id: nextId++, content: text });
        resolve();
    });
    
    res.status(204);
    res.end();
});

app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);

  console.log('noteId',noteId);

  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  res.status(200);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));