const Twitter = require('twitter');
const got = require('got');

const client = new Twitter({
    consumer_key: process.env.twtAPIKey,
    consumer_secret: process.env.twtAPISecret,
    access_token_key: process.env.twtUserToken,
    access_token_secret: process.env.twtUserSecret
});
async function postTweet() {
    try {
        const response = await got('https://animechan.vercel.app/api/random');
        let res = JSON.parse(response.body)
        client.post('statuses/update', {status: `\"${res.quote}\"\n - ${res.character}`},  function(error, tweet, response) {
            if(error) console.log(error)
            console.log(tweet.id_str);
                client.post('statuses/update', {status: `@Z3R0Three This quote is from ${res.anime}`, in_reply_to_status_id: tweet.id_str}, (error, tweet, response) => {
                    if(error) console.log(error)
                    console.log(tweet.id_str)
                })
        });

    } catch (error) {
        console.log(error);
    }
    setTimeout(postTweet, 7200000)
}

postTweet().then().catch()
