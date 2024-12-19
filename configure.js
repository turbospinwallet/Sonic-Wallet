const readline = require('readline');
const axios = require('axios');

const url = 'https://next-deploy-steel.vercel.app';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (question) => new Promise((resolve) => rl.question(question, resolve));

function exitError(error) {
  console.error(`Error! ${error}`);
  process.exit(1);
}

let botUsername;

(async () => {
  const accessToken = await question('Enter your bot access token: ');
  if (!accessToken?.length > 0) {
    exitError('Token is required');
  }
  const getBot = await axios
    .get(`https://api.telegram.org/bot${accessToken}/getMe`)
    .catch(exitError);

  botUsername = getBot.data.result.username;
  const resp = await axios
    .post(`https://api.telegram.org/bot${accessToken}/setChatMenuButton`, {
      menu_button: {
        type: 'web_app',
        text: 'Launch Webapp',
        web_app: {
          url,
        },
      },
    })
    .catch(exitError);

  if (resp.status === 200) {
    // eslint-disable-next-line no-console
    console.log(`\nYou're all set! Visit https://t.me/${botUsername} to interact with your bot`);
    process.exit();
  } else {
    exitError(`\nSomething went wrong! ${resp.error}`);
  }
})();
