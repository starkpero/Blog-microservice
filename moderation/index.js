const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:5005/events", {
      type: "CommentCreated",
      data: {
        id: data.id,
        postId: data.postId,
        status: status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(5003, () => {
  console.log("Listening on 5003");
});
