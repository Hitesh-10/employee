const express = require('express');
const app = express();
const initDB = require("./config/initDb");
const port = process.env.PORT || 8000
const employeeRoute = require("./routes/employee")
const cors = require('cors');

// Initializing DB
initDB();

app.use(express.json());
app.use(cors());
app.use(employeeRoute)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})