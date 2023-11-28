const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { default: mongoose } = require("mongoose");

const routesUser = require("./routes/user");
const routesTransactionAdmin = require("./routes/admin/transaction");
const routesTransactionUser = require("./routes/user/transaction");
const routesHotelAdmin = require("./routes/admin/hotel");
const routesRoomAdmin = require("./routes/admin/room");
const routesHotelUser = require("./routes/user/hotel");
// const routesRoomUser = require("./routes/user/room");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", routesUser);
app.use("/transactions/admin", routesTransactionAdmin);
app.use("/transactions/user", routesTransactionUser);
app.use("/hotels/admin", routesHotelAdmin);
app.use("/hotels/user", routesHotelUser);
app.use("/rooms", routesRoomAdmin);

mongoose
  .connect(process.env.DB_URL)
  .then(() => app.listen(5000))
  .catch((err) => console.log(err));
