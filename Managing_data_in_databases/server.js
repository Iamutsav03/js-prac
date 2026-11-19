const express = require("express");
const app = express();

const { initializeConnection } = require("./config/db");

const userRouter = require("./router/user.routes");

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.send("This page is currently empty");
});

async function startServer() {
    try {
        await initializeConnection();

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    } catch (err) {
        console.error("Server startup failed:", err);
        process.exit(1);
    }
}

startServer();
