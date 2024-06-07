const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());

// Tüm isteklerde CORS izinleri sağlamak için:
app.use(cors());

// Belirli bir origin için CORS izinleri sağlamak için:
// app.use(cors({ origin: 'http://example.com' }));

// Belirli bir origin ve yöntemler için CORS izinleri sağlamak için:
// app.use(cors({ origin: 'http://example.com', methods: ['GET', 'POST'] }));

// Veya özelleştirilmiş bir fonksiyon kullanarak CORS izinleri sağlamak için:
// app.use(cors({ origin: (origin, callback) => { callback(null, true); } }));

const projectRoute = require("./routes/project");
app.use("/projects", projectRoute);

const taskListsRoute = require("./routes/taskList");
app.use("/taskLists", taskListsRoute);

const taskRoute = require("./routes/task");
app.use("/tasks", taskRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
