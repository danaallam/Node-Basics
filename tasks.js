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
  else if (text.slice(0, 5) === "check")
    check(text.replace(/\t/g, "").slice(5).trim());
  else if (text.slice(0, 7) === "uncheck")
    uncheck(text.replace(/\t/g, "").slice(7).trim());
  else if (text.slice(0, 5) === "hello") {
    hello(text.replace(/ /g, "").replace(/\t/g, "").slice(5).trim());
    // console.log(text);
  } else if (text === "help\n") {
    help();
  } else {
    unknownCommand(text);
  }
}

const tasks = [
  {
    name: "Go to the dr",
    done: true,
  },
  {
    name: "Sleep",
    done: false,
  },
];

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
    "Options\n" +
      "-hello name\t\t says hello name!\n -quit\t\t\t to exit\n" +
      "-exit\t\t\t to exit\n -list\t\t\t lists all tasks\n" +
      "-add x\t\t\t adds x to the list\n" +
      "-remove x\t\t removes list number x from the list\n" +
      "-remove\t\t removes last task in the list" +
      "-edit new text\t\t\t change the last task to 'new text'" +
      "-edit x new text\t\t\t change the task x to 'new text'"+
      "-check x\t\t\t change task x to 'done'"+
      "-uncheck x\t\t\t change task x to 'undone'"
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
    if (tasks[i].done == false) {
      console.log(i + 1 + " - [ ] " + tasks[i].name);
    } else {
      console.log(i + 1 + " - [✓] " + tasks[i].name);
    }
}

function add(task) {
  // console.log(task);
  if (task != "") {
    tasks.push({
      name: task,
      done: false,
    });
  } else {
    console.log("error");
  }
}

function edit(task) {
  // console.log(task.split(" ")[0].length+1);
  // console.log(parseInt(task.split(" ")[0]));
  if (task == "" || parseInt(task.split(" ")[0]) > tasks.length)
    console.log(
      "ERROR!\ntype edit {x new task} to change the task {x} to {new text} or edit {new task} to change the last task to {new text}"
    );
  else if (Number.isInteger(parseInt(task.split(" ")[0]))) {
    // var c=parseInt(task.split(" ")[0]);
    // console.log(c)
    tasks[parseInt(task.split(" ")[0]) - 1].name = task
      .substring(task.split(" ")[0].length)
      .trim();
    tasks[parseInt(task.split(" ")[0]) - 1].done = false;
  } else {
    tasks[tasks.length - 1].name = task;
    tasks[tasks.length - 1].done = false;
  }
}

function remove(task) {
  if (task == "") tasks.pop(task);
  else {
    if (task.trim().match(/^[0-9]+$/) == null) {
      console.log("remove 'x'  x is not a NUMBER!!!");
    } else {
      tasks.splice(parseInt(task) - 1, 1);
    }
  }
}

function check(task) {
  // console.log(tasks[parseInt(task.split(" ")[0]) - 1]);
  if (task == "") console.log("ERROR! type check x to change task x to 'done'");
  else if (task.split(" ")[0] > tasks.length)
    console.log("task " + task.split(" ")[0] + " doesn't exist");
  else if (task.trim().match(/^[0-9]+$/) == null) {
    console.log("check 'x'  x is not a NUMBER!!!");
  } else {
    tasks[parseInt(task.split(" ")[0]) - 1].done = true;
  }
}

function uncheck(task) {
  // console.log(tasks[parseInt(task.split(" ")[0]) - 1]);
  if (task == "") console.log("ERROR! type check x to change task x to 'done'");
  else if (task.split(" ")[0] > tasks.length)
    console.log("task " + task.split(" ")[0] + " doesn't exist");
  else if (task.trim().match(/^[0-9]+$/) == null) {
    console.log("check 'x'  x is not a NUMBER!!!");
  } else {
    tasks[parseInt(task.split(" ")[0]) - 1].done = false;
  }
}

// The following line starts the application
startApp("Dana");
