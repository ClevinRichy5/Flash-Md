const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUFGNy9OcTdZQ1JUNHNscjBKcGJOUVlhM1ZCYlAySkx6K2dUM1hsYk5YST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1Rnc0tpVUlaSGJsMVNWQ1pTazhwVERTQzZQdVE1dngwdEJnR1dYdUp6bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNSmovMjBZM1doUXh0RzQwUTQzTE9IWmE1dUdVYzZYSmV2cTdla1hDbEhjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrU3pmRW4wWFAvSTIyQmV2UEdGbTcyUFhiTWFsS0N1ZnhISU9LbXBTYUVRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFOTTI3UUhRalRNNE1XRlV3NzA5OXFoUjB6TWNhNllmYjVLV09ibUxpMDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9VZHBHSlNxUHVNVDVmVXp2RTRvazJ0b1pmZjZOeGJUM0tGQVBNaGVRblU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUURjV1BSNlZuWEpxWG51TjFXUUl2SGVWQU1xMDJVTE9jY0hGNitHdWdIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblFOM2Q3TTlUVTNEYmIxZTFudnlvd1FZd0pTTVlTc01ZbW5DOWlqdUprbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtOTDAxd08vUVBEem11MG1pQ2pqcXJ1MXFxOFYvZkM2dGFTRUoxUXB3TjhVdXJTRGpvamhrTlN0dTNabm1hYXNhS0FRNjhCSE9JWkg1ODljaTExRUJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODYsImFkdlNlY3JldEtleSI6IkxqL2ZLNGs0TDA4NmRTZDRWcjBweUo3bUI3TEY3dDc2U0w3dW5ndTFvRVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImJwQlR5cWlEVC02TFFZNVlRZ2x1aVEiLCJwaG9uZUlkIjoiOTZjMzNlMGQtOWZiYy00Yjc4LWI3MjAtZGFlZjc2NzIxM2U1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImkzS2h6QmFCUXNEZFlXUFZkcW0wY2M5MzM0MD0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGJRcWJacVZsWXlvRDBPR1VpMm5IcGlMc2k4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTVRZanJFSkVKU1JzTFFHR0JNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidFZsdVY5c2pCYWEyWVNYSjJmemJ4U0pQYlVKbUZ5L1YxZlBYeCtZeHdFbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSXBvVGg1RjRXQzc5Q3hDWStwc0FDeFhNeGZmNUFnY1FBc2FQYkpiUytQWVhGNVYzZWJkTVp4VlA5VmNhRVJNV0JiWEJpdk5IVVFBY0xYVHNaT3pyREE9PSIsImRldmljZVNpZ25hdHVyZSI6IlJUeEF3ME5CQzcwYldjSW9mbm1XaUVLU1NDajFvT3daaG52OGFTTk4vQXdHdUtybkNCZUhHcXQ0ZDdqWVhFdEZOeU9TTDlBdzNNZDFVY3l5d3FLS0JBPT0ifSwibWUiOnsiaWQiOiIyMzc2OTI0NDY4NTA6OTFAcy53aGF0c2FwcC5uZXQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjkyNDQ2ODUwOjkxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJWWmJsZmJJd1dtdG1FbHlkbjgyOFVpVDIxQ1poY3YxZFh6MThmbU1jQksifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDQ1MzI3MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHRUoifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Monsieur Richy",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "237692446850", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
