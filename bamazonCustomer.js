var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "123456",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runapp();
});
//
// Table Styling
var table1 = new Table({
  chars: {
    top: "═",
    "top-mid": "╤",
    "top-left": "╔",
    "top-right": "╗",
    bottom: "═",
    "bottom-mid": "╧",
    "bottom-left": "╚",
    "bottom-right": "╝",
    left: "║",
    "left-mid": "╟",
    mid: "─",
    "mid-mid": "┼",
    right: "║",
    "right-mid": "╢",
    middle: "│"
  }
});
//
var table2 = new Table({
  chars: {
    top: "═",
    "top-mid": "╤",
    "top-left": "╔",
    "top-right": "╗",
    bottom: "═",
    "bottom-mid": "╧",
    "bottom-left": "╚",
    "bottom-right": "╝",
    left: "║",
    "left-mid": "╟",
    mid: "─",
    "mid-mid": "┼",
    right: "║",
    "right-mid": "╢",
    middle: "│"
  }
});

// Show Table Function
var showTable = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    // Table Headers
    table1.push([
      "Item Id".green,
      "Product Name".green,
      "Department Name".green,
      "Price ($)".green,
      "Stock Quantity".green
    ]);
    //Getting the table Components from DataBase
    for (var i = 0; i < res.length; i++) {
      table1.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log("\n" + table1.toString() + "\n");
  });
  // console.log(query.sql);
};

// Starting the APP asking the user if he wants to Buy a product or Exit
var runapp = function() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Buy a Product", "exit"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Buy a Product":
          showTable();
          buyproduct();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
};

var buyproduct = function() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is The ID of the product you would like to buy?"
      },
      {
        name: "units",
        type: "input",
        message: "How many units of the product would you like to buy?"
      }
    ])
    .then(answers => {
      connection.query(
        "SELECT * FROM products WHERE ?",
        { item_id: answers.id },
        function(err, res) {
          var id = res[0].item_id;
          var productname = res[0].product_name;
          var productprice = res[0].price;
          var stq = res[0].stock_quantity;

          if (answers.units > stq) {
            console.log(`Insufficient quantity!`);
            runapp();
          } else {
            var newquantity = stq - answers.units;
            var sql = "UPDATE products set stock_quantity =? WHERE item_id = ?";

            connection.query(sql, [newquantity, id], function(err, results) {
              console.log("Record Updated!!");
              var stq = res[0].stock_quantity;
              var total = answers.units * productprice;

              table2.push(
                [
                  "Item Id".green,
                  "Product Name".green,
                  "Price ($)".green,
                  "Stock Quantity left".green,
                  "Total ($)".red
                ],
                [id, productname, productprice, newquantity, total]
              );

              console.log("\n" + table2.toString() + "\n");
              runapp();
            });
          }
        }
      );
    });
};
