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

    displayProducts()

});

function displayProducts() {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        // console.log("--------------");

        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id)
            console.log("Product Name: " + res[i].product_name)
            console.log("Price: " + res[i].price)


        }

        startShopping()


    });


}



function startShopping() {
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