console.log('Consumer...');
const kafka = require("node-rdkafka");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Set();
let latestScore = null;
//['a-ap-client-details', 'r-ap-client-details']

wss.on("connection", (ws) => {
    console.log("Client Connected to WebSocket");
    clients.add(ws);
    ws.send(latestScore);

    ws.on("close", () => {
        console.log("Client Disconnected");
        clients.delete(ws);
    });
});

const consumer = kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092',
    'auto.offset.reset': 'earliest'
},
    {});

consumer.connect();
consumer
.on('ready', () => {
    console.log('Consumer Ready...');
    consumer.subscribe(['cricket_scores']);
    consumer.consume();
})
.on('data', (data) => {
    // console.log('---^^^^-----^^^^^^----^^^', new Date());
    // console.log(data.value.toString());
    latestScore = data.value.toString();
    // console.log(JSON.stringify(clients));

    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data.value.toString());
        }
    });
})

