const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");

const getVideoTitle = (pageSource) => {
    const $ = cheerio.load(pageSource);
    const title = $("title").text();
    return title;
};

router.get("/:videoId", async (req, res) => {
    //getVideoTitle();
    const videoId = req.params.videoId;
    const response = await axios.get(
        `https://www.youtube.com/watch?v=${videoId}`
    );
    // console.log(response.data);
    const videoTitle = getVideoTitle(response.data);
    // console.log(response);
    // res.send("Youtube");
    res.status(200).json({ status: "ok", data: videoTitle });
});

module.exports = router;
