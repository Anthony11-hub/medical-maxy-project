dbPassword = 'mongodb+srv://anthony:'+ encodeURIComponent('anthony123') + '@cluster0.rw6otk7.mongodb.net/?retryWrites=true&w=majority';
// mongodb+srv://anthony:<password>@cluster0.rw6otk7.mongodb.net/?retryWrites=true&w=majority

module.exports = {
    mongoURI: dbPassword
};