import express from 'express';
import nodemailer from 'nodemailer';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e9b17cb4b8b9db',
    pass: '7c8f09b3209a07',
  },
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository
  );

  await submitFeedbackService.execute({ type, comment, screenshot });

  return res.status(201);
});
