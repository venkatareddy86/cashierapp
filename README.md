# Cashier App

### To run locally
Got to cashier-web

`cd cashier-web`

Install depencies

`npm install`

Update .env.ca to point required environment.

`npm run start:ca` 

Set local cashier URL in felix console

- access `http://localhost:4503/system/console/configMgr`
- find `Portal Configuraton Service`
- set One Pay URL to `http://localhost:3000/`

*You will need to have chrome running in unsafe mode

(on mac) `open /Applications/Google\ Chrome.app --args -enable-file-cookies --allow-file-access-from-files --disable-web-security --user-data-dir`

(on windows) `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --enable-file-cookies --allow-file-access-from-files --disable-web-security --user-data-dir`