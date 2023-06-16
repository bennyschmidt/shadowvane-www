const { HOST } = process.env;

import {
  validateEmailAddress,
  sendEmail
} from '../../_mailer.js';

export default async function (req, res) {
  const {
    email = ''
  } = req.body;

  const invalidParam = (
    !(/^[a-z0-9_\-.]{1,64}@[a-z0-9_\-.]{1,64}$/i.test(email))
      ? 'email address'
      : false
  );

  if (invalidParam) {
    res
      .status(200)
      .json({
        status: 400,
        ok: false,
        message: `Invalid ${invalidParam}.`,
        posts
      });

    return;
  }

  await sendEmail({
    to: email,
    subject: 'Welcome to Shadowvane!',
    html: `Go to https://playshadowvane.com to download the game.`
  });

  res
    .status(200)
    .json({
      status: 200,
      ok: true,
      message: 'Confirmation was sent to your email.',
      posts
    });
}
