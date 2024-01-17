# Shopi-Backend

The backend is powered by **Node** and **Express**, leveraging **MongoDB** as the database and **Mongoose** as modeling tool.

## Database
MongoDB Atlas is utilized as the database. MongoDB Atlas is a cloud-based service that manages MongoDB databases, simplifying scalability and data management.

#### Connect Database
```
MONGO_URI=mongodb+srv://lisaberger:lisa12345@webshop.yvl8gdx.mongodb.net/?retryWrites=true&w=majority
```

#### Data Models
- Product
- Annotation
- Category
- Teaser
- User

## API Endpoints
**/api/products** - Product Management <br />
**/api/teasers** - Teaser Management <br />
**/api/categories** - Category Management <br />
**/api/users** - User Manangement <br />

### Media Files
**/api/media** - User Manangement <br />

Files are organized within a backend **media** directory and made accessible to the frontend through a dedicated endpoint.

The structure is as follows:
```
Media
|-- Phone
|   |-- 360
|   |-- hi
|   |-- low
|-- [etc.]
```

### Route Overview

#### Product Routes

**GET** /api/products - Fetch all Products <br />
**GET** /api/products/:id - Fetch Product By Id

#### Teaser Routes

**GET** /api/teasers - Fetch all Teasers

#### Category Routes 

**GET** /api/categories - Fetch all Categories

#### User Routes
[To Be added]