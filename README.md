# <span style="display: flex; align-items: center"><img style="margin-right: 10px" src="./client/public/logo-bild-marke.svg"/> shopi</span>

**Shopi** is a prototype for a simple ecommerce webshop that uses 3D visualization concepts at various points to enhance and create a more engaging shopping experience.

<img src="./docs/images/shopi-screens.png" />

Live Demo 👀: <a href="https://shopi-ct70.onrender.com">https://shopi-ct70.onrender.com</a><br />
Feature demo 🎥: Short Video clips in **docs** directory

It's built on the **MERN-Stack** (MongoDB, Express.js, React.js, Node.js), utilizing **React Three Fiber** and Google's **Model Viewer** for the implementation of 3D features.

**3D-Features** included:
- 360°-Product-Viewer
- Interactive 3D-Product-Viewer
- Interactive AR-Product-Viewer
- Hotspots with Annotations
- Switch between Color Variants and Animations
- Progressive Loading States through Low-Poly Models
- OR-Code to quickly open 3D-Model on mobile Devices
- 3D-Icon

## Usage

### Install

Clone the project from GitHub

```
git clone https://github.com/lisaberger/webshop.git
cd project
npm install
```

Install dependencies (client & server)

```
cd client
npm install

cd server
npm install
```

Env Variables

```
cd server
```

Rename `.env.rename` file to `.env` and add the following

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://lisaberger:lisa12345@webshop.yvl8gdx.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=secret
```

### Run

```
# Run frontend & backend
npm run dev

# Run backend
npm run server

# Run fontend
npm run client
```

### Build & Deploy

```
npm run build
```

## Tools

### Backend

[Node](https://nodejs.org/en/)
[Express](https://expressjs.com/)
[MongoDB](https://www.mongodb.com/)

### Frontend

[React](https://reactjs.org/)
[Primereact](https://primereact.org/)
[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
[Model Viewer](https://modelviewer.dev/)
[Vite](https://vitejs.dev/)
