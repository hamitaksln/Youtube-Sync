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
    const response = axios
        .get(`https://www.youtube.com/watch?v=${videoId}`)
        .then((response) => {
            const title = getVideoTitle(response.data);
            const thumbnail = `https://i.ytimg.com/vi/${videoId}/0.jpg`;

            const results = [{ videoId, title, thumbnail }];
            res.status(200).json({ status: "ok", data: results });
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({ status: "fail", message: error.message });
        });
    // console.log(response.data);

    // console.log(response);
    // res.send("Youtube");
});

router.get("/search/:query", async (req, res) => {
    //getVideoTitle();
    const query = req.params.query;
    const data = JSON.stringify({
        context: {
            client: {
                userAgent:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36,gzip(gfe)",
                clientName: "WEB",
                clientVersion: "2.20210628.06.00-canary_experiment",
            },
        },
        query,
    });

    const config = {
        method: "post",
        url: "https://www.youtube.com/youtubei/v1/search?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8",
        headers: {
            authority: "www.youtube.com",
            "sec-ch-ua":
                '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "x-origin": "https://www.youtube.com",
            "sec-ch-ua-mobile": "?0",
            "content-type": "application/json",
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
            "x-youtube-client-name": "1",
            "x-youtube-client-version": "2.20210628.06.00-canary_experiment",
            "x-goog-authuser": "0",
            "x-goog-pageid": "117098061880755019880",
            accept: "*/*",
            origin: "https://www.youtube.com",
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "same-origin",
            "sec-fetch-dest": "empty",
            "accept-language": "en,tr;q=0.9,zh-TW;q=0.8,zh;q=0.7",
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            const obj = response.data;
            const results =
                obj.contents.twoColumnSearchResultsRenderer.primaryContents
                    .sectionListRenderer.contents[0].itemSectionRenderer
                    .contents;
            const videoResults = results
                .map((result) => {
                    try {
                        const videoId = result.videoRenderer.videoId;
                        const title = result.videoRenderer.title.runs[0].text;
                        const thumbnail =
                            result.videoRenderer.thumbnail.thumbnails[0].url;
                        return { videoId, title, thumbnail };
                    } catch (err) {
                        return { videoId: null, title: null, thumbnail: null };
                    }
                })
                .filter((video) => video.videoId);
            console.log(videoResults)
            res.status(200).json({ status: "ok", data: videoResults });
        })
        .catch((error) => {
            console.log(error);
            res.status(404).json({ status: "fail", message: error.message });
        });
});

module.exports = router;
