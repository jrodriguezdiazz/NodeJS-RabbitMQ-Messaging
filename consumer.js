const amqp = require('amqplib');
const {RABBITMQ_SERVER, QUEUE_NAME} = require('./constants');

const consumeMessage = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, {durable: true});

    console.log('Waiting for messages...');

    await channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        console.log('Received: ', msg.content.toString());
        channel.ack(msg);
      }
    }, {
      noAck: false
    });

  } catch (error) {
    console.error('Error in message consumption:', error);
    setTimeout(consumeMessage, 5000);
  }
};

consumeMessage();
