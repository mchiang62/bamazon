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
        // console.log("--------------"); callback function after query, need this result- this func gets called when query is done
        // res = array

        // console.log(res)

        if (err) throw err;

        // throw error shows more info of the error

        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id)
            console.log("Product Name: " + res[i].product_name)
            console.log("Price: " + res[i].price)
            console.log("stock: " + res[i].stock_quantity)



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
                message: "How many would you to purchase?",

            },


        ])

        .then(function (answer) {

            // where is like an if statement where item id = to answer; query goes through every id to the answer

            connection.query("Select * FROM products WHERE ?", {
                item_id: answer.productID
            }, function (err, res) {
                if (err) throw err;

                // console.log(res)
                // console.log(res[0].stock_quantity);

                if (res[0].stock_quantity >= answer.units) {
                    purchaseItem(answer)

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

function purchaseItem(answer) {
    // console.log("answer: ", answer);

    connection.query("Select * FROM products WHERE ?", {
            item_id: answer.productID
        },
        function (err, res) {
            if (err) throw err;
            // console.log("Response: Array", res[0]);
            // console.log("Response: not Array", res);
            // console.log("Response: ", res.stock_quantity);

            var current_quantity = res[0].stock_quantity;
            console.log("Current quantity in stock: ", current_quantity);

            // console.log(res.price)


            // console.log(res[0])


        })





}