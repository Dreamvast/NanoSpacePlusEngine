const MainClient = require("./bot.js");
const client = new MainClient();
client.connect()
client.on("error", (err) => {
  client.logger.log({
    level: 'error',
    message: err
  })
});