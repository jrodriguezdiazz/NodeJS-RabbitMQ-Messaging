require('dotenv').config();

const RABBITMQ_USER = process.env.RABBITMQ_USER || 'default_user';
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD || 'default_password';
const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT_CONNECTION = process.env.RABBITMQ_PORT_CONNECTION || '5672';

const RABBITMQ_SERVER = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT_CONNECTION}`;
const QUEUE_NAME = 'messages';

module.exports = {
  RABBITMQ_SERVER,
  QUEUE_NAME
}
