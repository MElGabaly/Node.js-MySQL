# Node.js-MySQL

## Overview

This Program is an Amazon-like storefront. The app will take in orders from customers and deplete stock from the store's inventory.

this is a link to a full video demonstration for the app [click here for the Link](https://drive.google.com/file/d/17XD0vUE0q6bdZKiigHQtpug87qB2nnyF/view?usp=sharing)

### Dependencies Used

The following dependencies are used:

- "cli-table": To Style the Tables in the terminal
- "colors": To add colors
- "inquirer": to have a dynamic app, take input from the user
- "mysql": To access the data base

### App Function: Customer View

1. Backend MySQL Database called `bamazon`.

2. Has a Table inside of that database called `products`.

3. Each of the Products have each of the following columns:

   - item_id (unique id for each product)

   - product_name (Name of product)

   - department_name

   - price (cost to customer)

   - stock_quantity (how much of the product is available in stores)

4) Running this application from the CLI will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

5) The app should then prompt with two messages.

   - The first should ask the ID of the product they would like to buy.
   - The second message should ask how many units of the product they would like to buy.

6) Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   - If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

7) However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   - This means updating the SQL database to reflect the remaining quantity.
   - Once the update goes through, show the customer the total cost of their purchase.
