import * as fs from 'fs';
import Handlebars from 'handlebars';
import * as path from 'path';

const getSourcePath = (sourceName: string) => {
  const source = fs.readFileSync(
    path.join('src/externals/mail/templates', sourceName),
    'utf8',
  );

  return source;
};

const templateLoader = {
  registration: Handlebars.compile(getSourcePath('registration.hbs')),
  'forgot-password': Handlebars.compile(getSourcePath('forgot-password.hbs')),
  'invalid-ip-address': Handlebars.compile(
    getSourcePath('invalid-ip-address.hbs'),
  ),
};

export default templateLoader;
