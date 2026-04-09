ShoppyGlobe Backend API

This is a Node.js and Express.js backend project for an e-commerce application called ShoppyGlobe. It uses MongoDB for data storage and JWT authentication for secure access to the cart.

⚡ Features
CRUD operations for products
Add, update, and remove items in the cart
JWT-based authentication for secure access
Middleware to protect cart routes
MongoDB integration using Mongoose
Modular router structure for Products, Users, and Cart
🛠 Technologies Used
Node.js
Express.js
MongoDB & Mongoose
JWT (JSON Web Token) for authentication
📂 API Endpoints
Products
Method	Endpoint	Description
GET	/products	Fetch a list of all products
GET	/products/:id	Fetch a product by its ID
POST	/products	Create a new product
Cart (Protected — requires JWT token)
Method	Endpoint	Description
POST	/cart	Add a product to the cart (requires valid JWT token)
PUT	/cart/:item_id	Update quantity of a cart item by providing product ID
DELETE	/cart/:item_id	Remove a product from the cart using the product ID

Note: We are using the product ID as the item_id for PUT and DELETE operations.

🔐 Middleware
auth.js
Verifies the JWT token
Ensures cart routes are only accessible for logged-in users
🗂 Project Structure
project/
│
├─ server.js          # Main entry point, MongoDB integration, middleware setup
├─ models/            # Mongoose schemas
│   ├─ User.js
│   ├─ Product.js
│   └─ Cart.js
├─ routes/            # Express routers for different modules
│   ├─ users.js
│   ├─ products.js
│   └─ cart.js
└─ middleware/
    └─ auth.js       # JWT authentication middleware
⚡ Notes
MongoDB integration is done inside server.js.
All routes are separated into routers to keep code modular and clean.
Cart functionality is fully protected by the auth.js middleware.
✅ Usage
Clone the repository
Run npm install to install dependencies
Start MongoDB
Run node server.js to start the server or with nodemon npm start