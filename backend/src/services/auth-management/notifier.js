const EmailTemplate = require('email-templates');
const logger = require('../../logger');
const { getLogoLink } = require('../../../utils');

module.exports = (app) => {
  const emailTemplate = new EmailTemplate({
    views: { root: 'src/emails' },
  });

  const config = app.get('mailer');

  function getTokenLink(pass, hash) {
    const url = app.get('publicurl') + '#/' + pass + '?token=' + hash;
    return encodeURI(url);
  }

  async function sendEmail(email) {
    try {
      const result = await app.service('mailer').create(email);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  return async (type, user, notifierOptions = {}) => {
    let tokenLink;
    let email;
    //let lang = user.locale;
    //let object = ''

    switch (type) {
      case 'resendVerifySignup': //sending the user the LINK in order to create his own password, it is sent by sendVerifyEmail() from the backend once a user has been created
        tokenLink = getTokenLink('auth/verify-email', user.verifyToken); //link

        //SEND NOTIFICATION???

        /* await app.service('notifications').create({
          tag: 'verifyEmailSent',
          labels: [`${user.firstName} ${user.lastName}`],
          createdBy: user._id,
        }); */

        //LANGUAGE CHANGE

        /* if (lang === 'de') {
          object = 'Bitte verifizieren Sie Ihr Konto'
        } else if (lang === 'en') {
          object = 'Please verify your Account'
        } */

        try {
          email = {
            from: config.header.from,
            to: user.email,
            subject: 'Please verify your Account',
            html: await emailTemplate.render(`resendVerifySignup/en`, {
              logourl: getLogoLink(app),
              tokenLink: tokenLink,
            }),
          };
          return sendEmail(email);
        } catch (err) {
          logger.error('Error sending e-mail to ' + user.email + ': ' + err);
        }
        break;

      case 'verifySignupSetPassword': //sending the user the CONFERMATION email for the new password just created  in verify-email.vue
        //LANGUAGE CHANGE

        /*  if (lang === 'de') {
          object = 'Ihr Passwort wurde erstellt'
        } else if (lang === 'en') {
          object = 'Your password has been created'
        } */

        //SEND NOTIFICATION???

        /* await app.service('notifications').create({
          tag: 'userVerified',
          labels: [`${user.firstName} ${user.lastName}`],
          createdBy: user._id,
        }); */

        try {
          email = {
            from: config.header.from,
            to: user.email,
            subject: 'Thank you for signing up',
            html: await emailTemplate.render(`verifySignupSetPassword/en`, {
              logourl: getLogoLink(app),
              tokenLink: tokenLink,
              loginLink: app.get('publicurl'),
            }),
          };

          return sendEmail(email);
        } catch (err) {
          logger.error('Error sending e-mail to ' + user.email + ': ' + err);
        }
        break;

      case 'identityChange': //sending the user the confermation for the new email just created in change-email.vue
        tokenLink = getTokenLink('auth/verify-new-email', user.verifyToken); //link

        //LANGUAGE CHANGE

        /*  if (lang === 'de') {
          object = 'Bestätigen Sie die neue E-Mail Adresse'
        } else if (lang === 'en') {
          object = 'Confirm the new E-mail address'
        } */

        try {
          email = {
            from: config.header.from,
            to: notifierOptions.email,
            subject: 'Confirm the new E-mail address',
            html: await emailTemplate.render(`identityChange/en`, {
              logourl: getLogoLink(app),
              tokenLink: tokenLink,
              loginLink: app.get('publicurl'),
            }),
          };
          return sendEmail(email);
        } catch (err) {
          logger.error('Error sending e-mail to ' + user.email + ': ' + err);
        }
        break;

      case 'sendResetPwd': //sending the user the LINK in order to create a new password email => sent by forgot-password
        tokenLink = getTokenLink('auth/reset-password', user.resetToken); //LINK

        //SEND NOTIFICATION???

        /* await app.service('notifications').create({
          tag: 'verifyEmailSent',
          labels: [`${user.firstName} ${user.lastName}`],
          createdBy: user._id,
        }); */

        //LANGUAGE CHANGE

        /* if (lang === 'de') {
          object = 'Ein neues Passwort erstellen'
        } else if (lang === 'en') {
          object = 'Create a new password'
        } */

        try {
          email = {
            from: config.header.from,
            to: user.email,
            subject: 'Create a new password',
            html: await emailTemplate.render(`sendResetPwd/en`, {
              logourl: getLogoLink(app),
              tokenLink: tokenLink,
            }),
          };
          return sendEmail(email);
        } catch (err) {
          logger.error('Error sending e-mail to ' + user.email + ': ' + err);
        }
        break;

      case 'resetPwd': //sending the confirmation about the new password has been changed
        //LANGUAGE CHANGE

        /* if (lang === 'de') {
          object = 'Ein neues Passwort erstellen'
        } else if (lang === 'en') {
          object = 'Create a new password'
        } */

        //SEND NOTIFICATION???

        /* await app.service('notifications').create({
          tag: 'passwordChanged',
          labels: [`${user.firstName} ${user.lastName}`],
          createdBy: user._id,
        }); */

        try {
          email = {
            from: config.header.from,
            to: user.email,
            subject: 'Your password has been changed',
            html: await emailTemplate.render(`resetPwd/en`, {
              logourl: getLogoLink(app),
              loginLink: app.get('publicurl'),
            }),
          };
          return sendEmail(email);
        } catch (err) {
          logger.error('Error sending e-mail to ' + user.email + ': ' + err);
        }
        break;

      case 'sendInvitation':
        //LANGUAGE CHANGE

        /* if (lang === 'de') {
          object = 'Einladung zum neuen Arbeitsbereich'
        } else if (lang === 'en') {
          object = 'New Workspace Invitation'
        } */

        try {
          email = {
            from: config.header.from,
            to: user.email,
            subject: 'New Workspace Invitation',
            html: await emailTemplate.render(`sendInvitation/en`, {
              client: notifierOptions.name,
            }),
          };
          return sendEmail(email);
        } catch (err) {
          logger.error('Error sending e-mail to ' + user.email + ': ' + err);
        }
        break;

      default:
        break;
    }
  };
};
