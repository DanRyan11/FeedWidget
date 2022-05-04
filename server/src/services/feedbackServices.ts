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

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        })

        this.mailAdapter.sendMail({
            subject: 'Feedback',
            body: [
                `<div style="font-family:sans-serif; font-size:16px; color:#111;">`,
                `<p>Tipo feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `<p><img src="${screenshot}" /> </p>`,
                `</div>`
            ].join('\n')
        })
    }
}