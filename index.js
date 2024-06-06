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

// Function to filter articles based on categories
const filterArticlesByCategory = (articles, category) => {
    return articles.filter(article => {
        if (article.item.categories) {
            return article.item.categories.some(cat => cat._ === category);
        } else {
            return false; // Or handle as needed, such as skipping these articles
        }
    });
};


// make another one maybe with https://rss.nytimes.com/services/xml/rss/nyt/Climate.xml
// to search categories Ocean (4 articles), Shipwrecks (1 article)

// creating server and requests
let app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send(articles);
})

// Search endpoint
app.get('/search', (req, res) => {
    const category = req.query.category;
    if (!category) {
        return res.status(400).json({ error: "Category parameter is required." });
    }

    const filteredArticles = filterArticlesByCategory(articles, category);
    res.json(filteredArticles);
});

const server = app.listen("3000", () =>{
    console.log("App is listening at http://localhost:3000");
})

export default server;