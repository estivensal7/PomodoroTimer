let app = require("./app");
let config = require("./config");

const { PORT } = config;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
