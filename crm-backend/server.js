
const app = require('./app');
require("dotenv").config(); 

const PORT = process.env.PORT || 5000; 

console.log('Using port:', PORT); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


