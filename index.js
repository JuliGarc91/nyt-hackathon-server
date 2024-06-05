import cors from "cors";
import express from "express";
import RSSParser from "rss-parser";

// parsing feed
const feedURL = "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
const parser = new RSSParser();
let articles = [];
const parse = async url => {
    const feed = await parser.parseURL(url);
    console.log(feed.title);
    feed.items.forEach(item => {
        // console.log(`${item.title}\n${item.link}\n\n`)
        articles.push({ item })
    })
}
parse(feedURL);

// creating server and requests
let app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send(articles);
})

const server = app.listen("3000", () =>{
    console.log("App is listening at http://localhost:3000");
})

export default server;