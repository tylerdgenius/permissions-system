import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // host: getters.getEmailDetails().host,
  // port: getters.getEmailDetails().port,
  // secure: true,
  // auth: {
  //   user: getters.getEmailDetails().user,
  //   pass: getters.getEmailDetails().password,
  // },
});

transporter.verify((error) => {
  if (error) {
    console.error(error);
    // logger(`${getters.geti18ns().LOGS.CONFIGS.GENERAL.ERROR_OCCURRED}${error}`);
  } else {
    console.log('Successfully connected to email server');
    // logger(getters.geti18ns().LOGS.CONFIGS.MAIL.VERIFICATION_SUCCESSFUL);
  }
});

export default transporter;
