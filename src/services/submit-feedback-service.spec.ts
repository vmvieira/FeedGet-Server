import { SubmitFeedbackService } from './submit-feedback-service';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'some specific string',
        comment: 'testing comment',
        screenshot: 'data:image/png;base64/123ABC321CBA',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'testing comment',
        screenshot: 'data:image/png;base64/123ABC321CBA',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'some specific string',
        comment: '',
        screenshot: 'data:image/png;base64/123ABC321CBA',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'some specific string',
        comment: 'testing comment',
        screenshot: '123ABC',
      })
    ).rejects.toThrow();
  });
});
