import mongoose from 'mongoose'

// mongoose.connect('mongodb://mongo:companydb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

const uri = "mongodb+srv://paultony:49P6s9iibhrDUY9c@api-company.gdzwk.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })
    .then(db => console.log('>> database connect!'))
    .catch(err => console.log(err))

// usuario:  paultony
// pass: 49P6s9iibhrDUY9c
