import { SubmitFeedbackService } from "./feedbackServices"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy },
)

describe('Feedback Service', () => {
    it('Deveria ser possível enviar um feedback', async () => {
        await expect(submitFeedback.create({
            type: 'BUG',
            comment: 'teste',
            screenshot: 'data:image/',
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('Não pode ser possível enviar um feedback sem type', async () => {
        await expect(submitFeedback.create({
            type: '',
            comment: 'teste',
            screenshot: 'data:image/',
        })).rejects.toThrow()
    })

    it('Não pode ser possível enviar um feedback sem comment', async () => {
        await expect(submitFeedback.create({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/',
        })).rejects.toThrow()
    })

    it('Não pode ser possível enviar uma screenshot sem ser padrão base64', async () => {
        await expect(submitFeedback.create({
            type: 'BUG',
            comment: 'teste',
            screenshot: 'test.jpg',
        })).rejects.toThrow()
    })
})