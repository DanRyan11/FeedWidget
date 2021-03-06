import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackService {
    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter
    ) {
    }

    async create(request: SubmitFeedbackServiceRequest) {

        const { type, comment, screenshot, } = request;

        if(!type) throw new Error("Tipo é obrigatório");
        if(!comment) throw new Error("Comentário é obrigatório");

        if(screenshot && !screenshot.startsWith('data:image/')) throw new Error("Screenshot precisa ser no padrão base64");

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        })
        const screenshotImage = screenshot ? `<p><img src="${screenshot}" /> </p>` : ''

        this.mailAdapter.sendMail({
            subject: 'Feedback',
            body: [
                `<div style="font-family:sans-serif; font-size:16px; color:#111;">`,
                    `<p>Tipo feedback: ${type}</p>`,
                    `<p>Comentário: ${comment}</p>`,
                    screenshotImage,
                `</div>`
            ].join('\n')
        })
    }
}