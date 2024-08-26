const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/banking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});
