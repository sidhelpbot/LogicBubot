const { Telegraf } = require('telegraf');
const { exec } = require('child_process');
import Chk from "./helpers/chk"
import {closeServer} from "./keep_alive"

let update = (bot: any, client: any, e: any) => {
let y: any = new Chk(client, e)
  
    y.edit('Updating GitHub repository...');
    exec("cd ./ && git fetch --all && git reset --hard origin/main", async (error: any, stdout: any, stderr: any) => {
      if (error) {
        y.edit(`Error GitHub repository: ${error.message} \nPlease try one time more`);
        return;
      }
      if (stderr) {
        y.edit(`STDError updating GitHub repository: ${stderr} \nPlease try one time more`);
        return;
      }
      y.edit('GitHub repository updated successfully!');
      // client.stop()
      closeServer()
      bot.stop('SIGINT')
      bot.stop('SIGTERM')
      
      await sleep(15000)
      exec('./node_modules/.bin/ts-node index', (error: any, stdout: any, stderr: any) => {
        if (error) {
          y.edit(`Error restarting Replit instance: ${error.message}`);
          return;
        }
        if (stderr) {
          y.edit(`Error restarting Replit instance: ${stderr}`);
          return;
        }
        y.edit('Replit instance restarted successfully! yo yo');
      });
    });
}
function sleep(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default update
