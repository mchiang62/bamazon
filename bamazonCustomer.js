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
    connection.query("Select * FROM products", function (err, res) {
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
        .prompt([{
                name: "productID",
                type: "input",
                message: "Which product ID would you like to purchase?",
                // choices: ["PLACE", "HOLDER", "EXIT"]

            },

            {
                name: "units",
                type: "input",
                message: "How many units of product would you to purchase?",

            },


        ])

        .then(function (answer) {

            connection.query("Select * FROM products WHERE ?", {
                item_id: answer.productID
            }, function (err, res) {
                if (err) throw err;

                if (res[0].stock_quantity >= answer.units) {
                    // purchaseItem function
                } else {

                    console.log("Insufficient quantity!"),

                        connection.end();


                }



            });

            // if (answer.productID === "PLACE") {
            //     // function
            // } else if (answer.productID === "HOLDER") {
            //     // function

            // } else {
            //     connection.end();
            // }


        });


}

