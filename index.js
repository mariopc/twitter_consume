var Twitter = require('twitter');
var moment = require('moment');
var fs = require('fs');

var configObj = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var client = new Twitter({
    consumer_key: configObj.consumer_key,
    consumer_secret: configObj.consumer_secret,
    access_token_key: configObj.access_token_key,
    access_token_secret: configObj.access_token_secret
});

let now = moment().format('YYYY-MM-DD');
let query = `${configObj.hashtag} since:${now}`
let reg = new RegExp(configObj.words, "i");

client.get('search/tweets', {q: query, result_type: 'recent', lang: 'es'}, (error, tweets, response) => {    
    if (error)
        console.log(error);
    for (tweet in tweets.statuses) {
        
        if (tweets.statuses[tweet].text.search(reg) != -1) {
            let time = moment(tweets.statuses[tweet].created_at, "dd MMM DD HH:mm:ss ZZ YYYY").format("YYYY-MM-DD HH:mm:ss ZZ");
            console.log('[' + time + '] - ' + tweets.statuses[tweet].text);
        }
    }
});