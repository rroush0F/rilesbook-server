require('dotenv').config()
const Express = require('express');
const app = Express();
const dbConnection = require("./db")
const controllers = require("./controllers");

app.use(Express.json());
app.use(require("./middleware/headers"))
app.use("/user", controllers.userController);
app.use("/post", controllers.postController);
app.use("/comment", controllers.commentController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });
