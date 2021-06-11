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
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
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
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (text === "list\n") list();
  else if (text.slice(0, 3) === "add")
    add(text.replace(/\t/g, "").slice(3).trim());
  else if (text.slice(0, 6) === "remove")
    remove(text.replace(/\t/g, "").slice(6).trim());
  else if (text.slice(0, 4) === "edit")
    edit(text.replace(/\t/g, "").slice(4).trim());
  else if (text.slice(0, 5) === "hello") {
    hello(text.replace(/ /g, "").replace(/\t/g, "").slice(5).trim());
    // console.log(text);
  } else if (text === "help\n") {
    help();
  } else {
    unknownCommand(text);
  }
}

const tasks = ["Go to the dr", "Sleep"];

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(name) {
  var newname = "";
  if (name != "") {
    newname = " ";
    newname += name;
  }
  console.log("hello" + newname + "!");
}

/**
 * Lists all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log(
    "Options\n -hello name\t\t says hello name!\n -quit\t\t\t to exit\n -exit\t\t\t to exit\n -list\t\t\t lists all tasks\n -add x\t\t\t adds x to the list\n -remove x\t\t removes list number x from the list\n -remove\t\t removes last task in the list"
  );
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}

function list() {
  for (let i = 0; i < tasks.length; i++)
    console.log(i + 1 + " - [ ] " + tasks[i]);
}

function add(task) {
  if (task != "") tasks.push(task);
  else {
    console.log("error");
  }
}

function edit(task) {
  // console.log(task.split(" ")[0].length+1);
  // console.log(parseInt(task.split(" ")[0]));
  if (task == "" || parseInt(task.split(" ")[0])>tasks.length) 
    console.log("ERROR!\ntype edit {x new task} to change the task {x} to {new text} or edit {new task} to change the last task to {new text}");
  else if(Number.isInteger(parseInt(task.split(" ")[0]))){
    // var c=parseInt(task.split(" ")[0]);
    // console.log(c)
    tasks[parseInt(task.split(" ")[0])-1]=task.substring(task.split(" ")[0].length).trim();
  }
  else
    tasks[tasks.length-1]=task;
}

function remove(task) {
  if (task == "") tasks.pop(task);
  else {
    if (!Number.isInteger(parseInt(task))) {
      console.log("remove 'x'  x is not a NUMBER!!!");
    } else {
      tasks.splice(parseInt(task) - 1, 1);
    }
  }
}

// The following line starts the application
startApp("Dana");
