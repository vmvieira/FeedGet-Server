import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e9b17cb4b8b9db',
    pass: '7c8f09b3209a07',
  },
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  });

  transport.sendMail({
    from: 'Equipe FeedGet <test@feedget.com>',
    to: 'Vitor Machado Vieira <vmvieira55@gmail.com',
    subject: 'Novo feedback recebido!',
    html: [
      `<div style="font-family: sans-serif, font-size: 16px; color: #111">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Tipo do feedback: ${comment}</p>`,
      `</div>`,
    ].join('\n'),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => console.log('http server running !'));
