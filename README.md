# shopi 🛍

**Shopi** is a prototype for a simple ecommerce webshop that uses 3D visualization concepts at various points to enhance and create a more engaging shopping experience.

<img src="./client/public/shopi-screen.jpg" />

Live Demo: <https://shopi-ct70.onrender.com/>

**3D-Features** included:

- 360°-Product-Viewer
- Interactive 3D-Product-Viewer
- AR-Product-Viewer
- Hotspots with Annotations
- Switch between Model Variants
- Run Animations
- Progressive Loading States (Low-Poly Preview)
- 3D-Icon
- OR-Code to quickly open 3D-Model on mobile Devices

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

# Tools

### Backend

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Frontend

- [React](https://reactjs.org/)
- [Primereact](https://primereact.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Model Viewer](https://modelviewer.dev/)
- [Vite](https://vitejs.dev/)
