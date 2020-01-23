-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT product_name AS product, category_name AS category
FROM products
JOIN categories ON products.category_id = categories.category_id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT order_id, company_name AS shipper, order_date
FROM orders
JOIN shippers ON orders.ship_via=shippers.shipper_id
WHERE order_date < '2012-08-09';
-- im thinking you only need 'object notation' if two tables have columns with the same name

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT p.product_name AS product, o.quantity
FROM order_details AS o
JOIN products AS p ON o.product_id = p.product_id
WHERE o.order_id = 10251
ORDER BY p.product_name;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.order_id, c.company_name, e.last_name
FROM orders AS o
JOIN customers as c ON o.customer_id = c.customer_id
JOIN employees as e ON o.employee_id = e.employee_id;

-- my database is a little different than the one in the guided project