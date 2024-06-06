import cors from "cors";
import express from "express";
import RSSParser from "rss-parser";

const parser = new RSSParser();
let articles = [];

const parse = async (section) => {
    const feedURL = `https://rss.nytimes.com/services/xml/rss/nyt/${section}.xml`;
    const feed = await parser.parseURL(feedURL);
    console.log(feed.title);
    feed.items.forEach(item => {
        articles.push({ item });
    });
};

const app = express();
app.use(cors());

app.get('/section', async (req, res) => {
    const section = req.query.section;
    if (!section) {
        return res.status(400).json({ error: "Section parameter is required." });
    }
    articles = []; // reset articles array
    await parse(section);
    res.send(articles);
});

const server = app.listen(3000, () => {
    console.log("App is listening at http://localhost:3000");
});

export default server;