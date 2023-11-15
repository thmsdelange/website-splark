// Constants
const serverString = (path) => {
  return `<span id="server">admin@splark</span>:<span id="path">~${path}</span><span id="dollar">$ </span>`
}
const aboutString = '<p>Splark biedt ontwikkeling van en ondersteuning bij software voor automatisering, (web)applicaties, servers en databases. '
const projectsString = '<p id="folder"> python_automatisering <br> web_applicaties <br> data_aggregatie <br> database_management <br> API_interfaces <br> server_management</p>'
const contactString = '<p> E: <a href="mailto:info@splark.nl">info@splark.nl</a></p>'
var i = 0;
const commandString = () => {
  const str = `<form id="command-form-${i}"><input id="command-input-${i}" autocomplete="off" autofocus"></input></form>`
  i++;
  return str
}
const commandNotFoundString = (command) => {
  return `<br>-bash: ${command}: command not found<br>`
}
const commandPermissionDeniedString = (command) => {
  return `<br>-bash: ${command}: permission denied<br>`
}
const exitString = '<p>Uitgelogd <br>Verbinding met splark verbroken. <br><br><img src="src/homer.gif" alt="Homer gif" class="homer" width="300px" height="auto"></p>'
const logoutString = '<p>Verbinding met splark verbroken. <br><br><img src="src/homer.gif" alt="Homer gif" class="homer" width="300px" height="auto"</p>'
const commands = ['pwd', 'cd', 'cp', 'mv', 'mkdir', 'rmdir', 'rm', 'touch', 'locate', 'find', 'grep', 'sudo', 'df', 'du', 'head', 'tail', 'diff', 'tar', 'chmod', 'jobs', 'kill', 'ping', 'wget', 'uname', 'top', 'history', 'man', 'echo', 'zip', 'unzip', 'hostname', 'useradd', 'userdel', 'clear']
const lsString = '<p>about.txt&nbsp;&nbsp;&nbsp;contact.txt&nbsp;&nbsp;&nbsp;<span id="path">projects</span></p>'
const helpString = '<p>reload&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;herlaadt de terminal<br>cat [bestand]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schrijft een tekstbestand naar de terminal <br>ls [map]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;laat bestanden en mappen zien<br>logout, exit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logt uit en verbreekt de verbinding</p>'

// Typewriter settings
const typeDelay = 'natural';
const pasteDelay = 1;
const pauseAfterCommand = 200;

// Initialize Typewriter
var shell = document.getElementById('shell')
var shellTypewriter = new Typewriter(shell, {
  cursor: "|",
});

const setupCommandInput = (state) => {
  state.elements.cursor.style.display = 'none';
  var commandForm = document.getElementById(`command-form-${i-1}`);
  var commandInput = document.getElementById(`command-input-${i-1}`);
  commandInput.focus();
  commandForm.addEventListener('submit', handleCommand);
}

const handleCommand = (e) => {
  e.preventDefault();
  var commandInput = document.getElementById(`command-input-${i-1}`);
  commandInput.readOnly = true;
  inputValue = commandInput.value
  if (inputValue == 'exit' || inputValue == 'logout'){
    if (inputValue == 'exit'){
      str = exitString
    } else if (inputValue == 'logout'){
      str = logoutString
    }
    shellTypewriter.pasteString(str)
      .callFunction(function(state) {
        state.elements.cursor.style.display = 'none';
      })
      .start()
  } else if (inputValue == 'reload'){
    window.location.reload();
  } else {
    if (commands.indexOf(inputValue) !== -1){
      str = commandPermissionDeniedString(inputValue)
    } else if (inputValue == 'help') {
      str = document.getElementById('help').innerHTML + helpString
    } else if (inputValue == 'cat about.txt'){
      str = aboutString
    } else if (inputValue == 'cat contact.txt'){
      str = contactString
    }
    else if (inputValue == 'ls'){
      str = lsString
    } else if (inputValue == 'ls projects/'){
      str = projectsString
    } 
    
    else {
      str = commandNotFoundString(inputValue)
    }
    shellTypewriter.pasteString(str)
      .pasteString(serverString('/splark'))
      .pasteString(commandString())
      .callFunction(setupCommandInput)
      .start();
  }
  // Scroll to bottom of shell
  var target = document.getElementById('shell');
  target.scrollIntoView({block: 'end'});
  setTimeout(function() {
    target.scrollIntoView({block: 'end'});
  }, 100); // how long to wait before patching
  setTimeout(function() {
    target.scrollIntoView({block: 'end'});
  }, 400); // how long to wait before patching
}

shellTypewriter.changeDelay(pasteDelay)
  .pasteString(serverString(''))
  .pauseFor(1500)
  .changeDelay(typeDelay)
  .typeString('cd splark/<br>')
  .pauseFor(pauseAfterCommand)
  .changeDelay(pasteDelay)
  .pasteString(serverString('/splark'))
  .pauseFor(500)
  .changeDelay(typeDelay)
  .typeString('cat about.txt<br>')
  .pauseFor(pauseAfterCommand)
  .changeDelay(pasteDelay)
  .pasteString(aboutString)
  .pasteString(serverString('/splark'))
  .pauseFor(2500)
  .changeDelay(typeDelay)
  .typeString('ls projects/')
  .pauseFor(pauseAfterCommand)
  .changeDelay(pasteDelay)
  .pasteString(projectsString)
  .pasteString(serverString('/splark'))
  .pauseFor(1500)
  .changeDelay(typeDelay)
  .typeString('cat contact.txt<br>')
  .pauseFor(pauseAfterCommand)
  .changeDelay(pasteDelay)
  .pasteString(contactString)
  .pasteString(serverString('/splark'))
  .pasteString(commandString())
  .callFunction(setupCommandInput)
  .start();
