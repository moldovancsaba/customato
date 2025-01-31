const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb+srv://moldovancsaba:gF0LnQqmK89pYW79@customato-prototype-clu.rwf9g.mongodb.net/?retryWrites=true&w=majority&appName=customato-prototype-cluster')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
