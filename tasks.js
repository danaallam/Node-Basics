
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === 'list\n')
    list();
  else if(text.slice(0,3) === 'add')
    add(text.replace(/\t/g,"").slice(3).trim());
  else if(text.slice(0,5) === 'hello'){
    hello(text.replace(/ /g,"").replace(/\t/g,"").slice(5).trim());
    // console.log(text);
  }
  else if(text === 'help\n'){
    help();
  }
  else{
    unknownCommand(text);
  }
}

const tasks=[
  "Go to the dr",
  "Sleep"
]

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(name){
  var newname='';
  if(name!=""){
   newname=' ';
  newname+=name;
  }
  console.log("hello"+newname+'!')
}

/**
 * Lists all the possible commands
 *
 * @returns {void}
 */
function help(){
  console.log('Options\n -hello name\t says hello name!\n -quit\t\t\t to exit\n -exit\t\t\t to exit')
}



/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

function list(){
  for(let i=0; i<tasks.length; i++)
    console.log((i+1)+' - [ ] '+tasks[i]);
}

function add(task){
  
  if(task!="")
    tasks.push(task);
  
  else{
    console.log("error");
  }
}

// The following line starts the application
startApp("Dana")
