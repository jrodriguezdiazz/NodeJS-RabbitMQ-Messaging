const express = require('express');
const amqplib = require('amqplib');
const {RABBITMQ_SERVER, QUEUE_NAME} = require('./constants');

const app = express();
app.use(express.json());

const sendMessage = async (message) => {
  let connection;
  let channel;

  try {
    connection = await amqplib.connect(RABBITMQ_SERVER);
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, {durable: true});
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message));

    console.log('Sent: ', message);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  } finally {
    if (channel) {
      try {
        await channel.close();
      } catch (error) {
        console.error('Error closing channel:', error);
      }
    }
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
};

app.post('/send', async (req, res) => {
  const {message} = req.body;

  if (!message) {
    return res.status(400).send('No message provided');
  }

  try {
    await sendMessage(message);
    res.send('Message sent');
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to send message');
  }
});

app.listen(3000, () => {
  console.log('Sender app listening on port 3000');
});
