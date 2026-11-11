const { nanoid } = require("nanoid");

const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const nanoId = nanoid(8);
  await URL.create({
    shortId: nanoId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: nanoId });
}

module.exports = {
  handleGenerateNewShortUrl,
};
