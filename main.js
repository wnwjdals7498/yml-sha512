const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
//const log = require('electron-log');

let window = {};

function createDefaultWindow () {
    let win = new BrowserWindow({
        width: 1200,
        height: 600,
        title: 'yml sha512',

        //The lines below solved the issue
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.webContents.openDevTools();
    win.on('closed', () => {
        app.quit();
    });
    win.loadURL(`file://${__dirname}/index.html`);
    return win;
}

app.allowRendererProcessReuse = true;
app.on('ready', () => {
    window.main = createDefaultWindow();
});

ipcMain.on('requset-latest-yml', (event, option) => {
    let date = new Date().toISOString();
    const data = `version: ${option.version}
files:
  - url: ${option.name}
    sha512: ${option.sha512}
    size: null
path: ${option.name}
sha512: ${option.sha512}
releaseDate: '${date}'
`;
    fs.writeFile('latest.yml', data, 'utf8', function (error) {
        console.log('write end')
    });
})