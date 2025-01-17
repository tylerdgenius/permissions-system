import templateLoader from './templateLoader';
import transporter from './transporter';

type MailServiceOptions = {
  to: string;
  htmlContent: string;
  subject: string;
};

const getMailOptions = (options: MailServiceOptions) => {
  return {
    to: options.to,
    subject: options.subject,
    html: options.htmlContent,
  };
};

const sendMail = async <T>(
  serviceName: keyof typeof templateLoader,
  options: Omit<MailServiceOptions, 'htmlContent'>,
  metadata: T,
) => {
  const serviceTemplate = templateLoader[serviceName];

  const serviceOptions = getMailOptions({
    htmlContent: serviceTemplate(metadata),
    subject: options.subject,
    to: options.to,
  });

  try {
    await transporter.sendMail(serviceOptions);
    console.log('Sent mail to: ', options.to);
  } catch (error) {
    console.error(error);
  }
};

export default sendMail;
