const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// listen for app to be ready
app.on('ready', function(){
  //create new window
  mainWindow = new BrowserWindow({});
  //load html file
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'default.html'),
    protocol:'file:',
    slashes: true
  }));

//quit app when closed
mainWindow.on('closed', function(){
  app.quit();
})

  //build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert Menu
  Menu.setApplicationMenu(mainMenu);
});

//handle create addwindow
function createAddWindow(){
  //create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Item To List'
  });
  //load html file
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addItem.html'),
    protocol:'file:',
    slashes: true
  }));
  //garbage collection handle
  addWindow.on('close', function(){
    addWindow = null;
  })
}


//creating menu template
const mainMenuTemplate = [
  {
    label:'File',
    submenu: [
      {
        label: 'Add Item',
        click(){
          createAddWindow();
        }
      },
      {
        label: 'Clear Items'
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', //adding a shortcut to a menu option
        click(){
          app.quit();
        }
      }
    ]

  }
];

//if mac, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({/*empty object*/});
}

//add dev tools item if not in production mode
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I', //adding a shortcut to a menu option
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
        {
          role: 'reload'
        }
    ]
  });
}
