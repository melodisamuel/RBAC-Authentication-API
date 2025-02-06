# Project Setup Guide

This guide will help you set up and run the project locally.

## Prerequisites

Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **MongoDB** (Locally or a cloud instance like MongoDB Atlas)
- **Git**
- **Postman** (For API testing, optional)

## Installation Steps

### 1. Clone the Repository
```sh
git clone https://github.com/melodisamuel/RBAC-Authentication-API.git
cd "RBAC AUthentication API"
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a **.env** file in the project root and add the following:
```env
PORT=8000
MONGO_URI=mongodb+srv://melodysamuel126:<PASSWORD>@cluster0.afwrv.mongodb.net/
JWT_SECRET=Implemneted-a-jsonwebton-for-authorize
```
> Update the values as per your configuration.

### 4. Start MongoDB (If Running Locally)
Make sure MongoDB is running before starting the application:
```sh
mongod
```

### 5. Run the Application
For development (with **nodemon** for live reload):
```sh
npm run dev
```
For production:
```sh
npm start:prod
```

### 6. API Testing
Use **Postman** or any API client to test endpoints. Add the generated **JWT token** in the `Authorization` header as `Bearer <token>`.

## Folder Structure
```
RBAC Authentication
│── node_modules/
│── src/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── roleMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── protectedRoutes.js
│   ├── utils/
│   │   ├── appError.js
│   │   ├── catchAsync.js
│   ├── app.js
│   ├── config.env
│   ├── index.js
│── .gitignore
│── package.json
│── package-lock.json

```

## Troubleshooting
- **Port Already in Use**: Change the `PORT` in `.env` or stop other processes using the port.
- **MongoDB Connection Issues**: Ensure MongoDB is running and `MONGO_URI` is correctly set.
- **JWT Token Not Changing**: Re-authenticate and use the latest token in Postman.

## Contributing
1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature-branch`)
5. Open a pull request

## License
This project is licensed under the **MIT License**.

