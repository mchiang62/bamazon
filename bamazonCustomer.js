var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3307,

    user: "root",

    password: "docker",
    database: "bamazonDB"

});

connection.connect(function (err) {
    if (err) throw err;

    start()

});

function start() {
    inquirer
        .prompt({
            name: "productID",
            type: "list",
            message: "Which ID of product would you like to buy?",
            choices: ["PLACE", "HOLDER", "EXIT"]

        })

        .then(function (answer) {

            if (answer.productID === "PLACE") {
                // function
            } else if (answer.productID === "HOLDER") {
                // function

            } else {
                connection.end();
            }


        });

}