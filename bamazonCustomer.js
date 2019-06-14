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
  showTable();
});

// Show Table Function
function showTable() {
  var query = connection.query("SELECT * FROM products", function(err, res) {
    // Table Styling
    var table = new Table({
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
    // Table Headers
    table.push([
      "Item Id".green,
      "Product Name".green,
      "Department Name".green,
      "Price ($)".green,
      "Stock Quantity".green
    ]);
    //Getting the table Components from DataBase
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
  });
  console.log(query.sql);
}
