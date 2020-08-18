let app = require("./app");
let config = require("./config");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server started on PORT ${PORT}`);
});
