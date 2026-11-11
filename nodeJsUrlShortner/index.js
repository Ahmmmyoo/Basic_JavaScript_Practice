const express = require("express");
const urlRoute = require("./routes/url");
const connectToMongoDb = require("./connection");
const URL = require("./models/url");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 3002;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDb Error: ", error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes(".UrlShortnerlog.txt"));

app.use("/url", urlRoute);

app.get("/analytics/:id", async (req, res) => {
  const shortId = req.params.id;

  // console.log(shortId);

  if (!shortId) return res.status(400).json({ error: "url is required" });

  const analyticShortId = await URL.find({ shortId: shortId });

  console.log(analyticShortId);
  if (!analyticShortId)
    return res.status(404).json({ error: "shortURL not found" });

  return res.json({ shortid: `${analyticShortId[0].shortId}`, redirectUrl: analyticShortId[0].redirectURL, visitTimes: analyticShortId[0].visitHistory.length });
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  // console.log("Requested URL:", req.originalUrl);

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  // console.log("rnt: ",entry);

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
