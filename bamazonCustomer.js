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
        // callback function after query, need this result- this func gets called when query is done
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

            },

            {
                name: "units",
                type: "input",
                message: "How many would you like to purchase?",

            },


        ])

        .then(function (answer) {

            // where is like an if statement where item id = to answer; query goes through every id to the answer

            connection.query("Select * FROM products WHERE ?", {
                item_id: answer.productID
            }, function (err, res) {
                if (err) throw err;


                if (res[0].stock_quantity >= answer.units) {
                    purchaseItem(answer)

                } else {

                    console.log("Insufficient quantity!")

                    startShopping()


                }



            });


        });


}

function purchaseItem(answer) {


    connection.query("Select * FROM products WHERE ?", {
            item_id: answer.productID
        },
        function (err, res) {
            if (err) throw err;


            var currentQuantity = res[0].stock_quantity;
            // console.log("Available quantity: ", currentQuantity);

            var userQuantity = answer.units;
            console.log("Quantity in cart: ", userQuantity);

            var priceItem = res[0].price;
            console.log("Price: ", priceItem)


            var remainingQuantity = currentQuantity - userQuantity;
            var finalPrice = userQuantity * priceItem;

            if (currentQuantity > answer.units) {


                console.log("Remaining Quantity: ", remainingQuantity)
                console.log("Total Cost:", finalPrice);

                connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",
                    [remainingQuantity, answer.productID],
                    function (err, res) {
                        console.table(res);
                    });

                connection.query("SELECT * FROM products", function (err, res) {

                    console.log("Updated Inventory: ");
                    console.log("------------------------------- \n");
                    console.table(res);
                });

            } else {
                console.log("Insufficient Amount!");
            }




            connection.end();

        });





}