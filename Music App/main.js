const path = require('path');
const {app, BrowserWindow} = require('electron');

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        width:1920,
        height:1080,
        autoHideMenuBar:true,
        fullscreen: true,
        resizable: false,
        frame:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    const iconPath = path.join(__dirname,'1.png');
    mainWindow.setIcon(iconPath);
    mainWindow.loadFile(path.join(__dirname,'index.html'));
}

app.whenReady().then(() => {
    createMainWindow();
});