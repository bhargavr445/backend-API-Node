console.log('Producer...');
const kafka = require("node-rdkafka");

const stream = kafka.Producer.createWriteStream({
    'metadata.broker.list': 'localhost:9092'
},
    {},
    { topic: 'cricket_scores' });

function addScore() {
    const result = stream.write(Buffer.from('hi'));
    console.log('---^^^^-----^^^^^^----^^^', new Date());
    
    console.log(result);
}

setInterval(() => {
    addScore()
}, 3000);