# Run app
npm run dev

# swagger doc URL
http://localhost:3010/api-docs/


# zookeeper start
kafka_2.13-3.9.0/bin/zookeeper-server-start.sh kafka_2.13-3.9.0/config/zookeeper.properties

# server start
kafka_2.13-3.9.0/bin/kafka-server-start.sh kafka_2.13-3.9.0/config/server.properties

# to create new topic in kafka
bin/kafka-topics.sh --create --topic cricket_scores --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1

# check all topics available
bin/kafka-topics.sh --list --bootstrap-server localhost:9092

# check all messages in a topic
bin/kafka-console-consumer.sh --topic cricket_scores --from-beginning --bootstrap-server localhost:9092

