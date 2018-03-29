const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection 
        .once('open', () => done())
        .on('error', err => console.warn('err!!!', err))
});

beforeEach(done => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
        .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2bsphere' }))
            .then(() => done())  
            .catch(() => done());
});