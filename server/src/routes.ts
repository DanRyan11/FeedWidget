import express from 'express';
import { NoodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackService } from './services/feedbackServices';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailerMailAdapter = new NoodemailerMailAdapter();

    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbackRepository,nodemailerMailAdapter);

    await submitFeedbackService.create({ type, comment, screenshot });

    return res.status(201).send();
})
