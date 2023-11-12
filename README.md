<h1 align="center">Welcome to NodeJS-RabbitMQ-Messaging 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/jrodriguezdiazz/NodeJS-RabbitMQ-Messaging/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> This repository demonstrates the implementation of RabbitMQ with NodeJS, showcasing a simple message queue system. The project includes two NodeJS applications - one for sending messages to RabbitMQ and another for consuming and displaying these messages.


## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/download/current)
- [Yarn](https://www.npmjs.com/package/yarn)

## Setup

1. Clone the repository

```shell
git clone https://github.com/jrodriguezdiazz/NodeJS-RabbitMQ-Messaging.git
```

2. Navigate to the cloned repository:

```shell
cd NodeJS-RabbitMQ-Messaging
```

3. Install the dependencies:

```shell
yarn
```

4. Setup env variables, _remember customize the values_

```shell
cp .env.example .env
```

5. Start RabbitMQ using Docker:

```shell
docker-compose up
```

## Running the Applications

### Sender Application (index.js)

The sender application uses Express to expose an endpoint for sending messages to RabbitMQ.

```shell
yarn start
curl -X POST http://localhost:3000/send -H "Content-Type: application/json" -d '{"message": "TEST!!"}'
```

### Consumer Application (consumer.js)

The consumer application listens to the messages from RabbitMQ and logs them to the console.

```shell
node consumer.js
```

## High Availability Setup

The RabbitMQ server is configured for high availability to ensure minimal downtime and reliable message handling.

```shell
docker exec -it nodejs-rabbitmq-messaging-rabbitmq2-1 rabbitmqctl stop_app

docker exec -it nodejs-rabbitmq-messaging-rabbitmq2-1 rabbitmqctl reset

docker exec -it nodejs-rabbitmq-messaging-rabbitmq2-1 rabbitmqctl join_cluster rabbit@rabbitmq1

docker exec -it nodejs-rabbitmq-messaging-rabbitmq2-1 rabbitmqctl start_app

docker exec -it nodejs-rabbitmq-messaging-rabbitmq1-1 rabbitmqctl set_policy ha-all "^" '{"ha-mode":"all"}'

docker exec nodejs-rabbitmq-messaging-rabbitmq1-1 rabbitmqctl cluster_status
```

## Author

👤 **jrodriguezdiazz <jrodriguezdiazz@outlook.com>**

* Github: [@jrodriguezdiazz](https://github.com/jrodriguezdiazz)
* LinkedIn: [@https:\/\/www.linkedin.com\/in\/jrodriguezdiazz\/](https://linkedin.com/in/https:\/\/www.linkedin.com\/in\/jrodriguezdiazz\/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jrodriguezdiazz/NodeJS-RabbitMQ-Messaging/issues). 


## 📝 License

Copyright © 2023 [jrodriguezdiazz <jrodriguezdiazz@outlook.com>](https://github.com/jrodriguezdiazz).<br />
This project is [MIT](https://github.com/jrodriguezdiazz/NodeJS-RabbitMQ-Messaging/blob/main/LICENSE) licensed.
