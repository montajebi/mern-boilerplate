const { google } = require('googleapis');

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
} = require('../../config');

const googleConfig = {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirect: GOOGLE_REDIRECT_URL,
};

const createConnection = () =>
  new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const getConnectionUrl = (auth) => {
  return auth.generateAuthUrl({
    access_type: 'offline',
    scope: defaultScope,
  });
};

const getGoogleUrl = () => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

const getGooglePeopleApi = (auth) => google.people({ version: 'v1', auth });

const getGoogleAccountFromCode = async (code) => {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const { tokens } = data;

  auth.setCredentials(tokens);

  const people = getGooglePeopleApi(auth);

  const me = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names,photos',
  });

  const firstName = me.data.names[0].givenName;
  const lastName = me.data.names[0].familyName;
  const photoUrl = me.data.photos[0].url;
  const email = me.data.emailAddresses[0].value;

  return {
    firstName,
    lastName,
    photoUrl,
    email,
  };
};

module.exports = { getGoogleUrl, getGoogleAccountFromCode };
