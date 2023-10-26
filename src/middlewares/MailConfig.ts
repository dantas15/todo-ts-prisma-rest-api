import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'gordon33@ethereal.email',
    pass: 'hJz8Vq8ZZXYujkrhwd',
  },
});
