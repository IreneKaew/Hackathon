const nodemailer = require("nodemailer")
var amqp = require('amqplib/callback_api');
const { connect } = require("http2");
const { channel } = require("diagnostics_channel");
const { json } = require("stream/consumers");
const { parse } = require("path");
const { error, log } = require("console");

// Configuration de RabbitMQ
const connectionUrl = 'amqp://localhost'; // Remplacez par l'URL de votre serveur RabbitMQ

// Données du message
const queueName = 'mail';
const body = 'Contenu du message';

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "email_service_provider",
    auth: {
      user: "the_email", // generated ethereal user
      pass: "the_password", // generated ethereal password
    },
  });
  

function consumeMailQueue() {
  amqp.connect(connectionUrl, (error, connection) => {
    if (error) {
      throw error;
    }

    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }

      channel.assertQueue(queueName, {durable: false});
      channel.consume(queueName, (message) => {
        const mailMessage = JSON.parse(message.content.toString());
        sendMail(mailMessage.email, mailMessage.body)
      })
    })
  })
}

function sendMail(to, body ) {
  const mailOption = {
    from: 'foo@example.com', 
    to,
    subject: "Hello its the subject", 
    text: body, 
  }

  transporter.sendMail(mailOption, (mailError, info) => {
    if (mailError) {
      console.log("Error sending mail", info)
    } else {
      console.log("Email has been sent", info)
    }
  });
}

consumeMailQueue();




// Fonction pour publier un message dans une file d'attente
function publishToQueue(queue, message) {
  amqp.connect(rabbitMQUrl, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      // Déclarer la file d'attente
      channel.assertQueue(queue, {
        durable: false,
      });

      // Publier le message dans la file d'attente
      channel.sendToQueue(queue, Buffer.from(message));
      console.log(`Message publié dans la file d'attente "${queue}": ${message}`);

      // Fermer la connexion après publication du message
      setTimeout(function () {
        connection.close();
        process.exit(0);
      }, 500);
    });
  });
}

// Publier dans la file d'attente "mail"
publishToQueue('mail', JSON.stringify({ email, body }));

// Publier dans la file d'attente "log"
publishToQueue('log', JSON.stringify({ email, body }));