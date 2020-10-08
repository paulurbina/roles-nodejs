const { Connection, Request } = require("tedious");
const fetch = require('node-fetch')

const express = require('express')
const app = express()


// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "useradmin",
      password: "calisTONY1994"
    },
    type: "default"
  },
  server: "azf-dbserver-1.database.windows.net",
  options: {
    database: "azf-db-api-fake",
    encrypt: true,
    validateBulkLoadParameters: false
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('database connected');
    // insertDatabase();
    // queryDatabase();
  }
});

// function queryDatabase() {
//   console.log("Reading rows from the Table...");

//   // Read all rows from table
//   const request = new Request(
//     `SELECT * FROM users`,
//     (err, rowCount) => {
//       if (err) {
//         console.error(err.message);
//       } else {
//         console.log(`${rowCount} row(s) returned`);
//       }
//     }
//   );

// request.on("row", columns => {
//   columns.forEach(column => {
//     console.log("%s\t%s", column.metadata.colName, column.value);
//   });
// });

// connection.execSql(request);
// }


function insertDatabase() {
  fetch('https://fakerapi.it/api/v1/companies?_seed=12456')
    .then(res => res.json())
    .then(json => {

      const data = json.data
      data.map(item => {
        const { name, email, vat, phone, country, website, image } = item
        // Insert rows from table users
        const request = new Request(
          `insert into users (name, email, vat, phone, country, website, image) 
          values (${name}, ${email}, ${vat}, ${phone}, ${country}, ${website}, ${image})`,
          (err, rowCount) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log(`insert data in users table`);
            }
          }
        );

        connection.execSql(request);
      })

    });
}


app.get('/seed', function (req, res) {
  fetch('https://fakerapi.it/api/v1/companies?_seed=12456')
    .then(res => res.json())
    .then(json => {
      const data = json.data

      data.map(item => {
        const { name, email, vat, phone, country, website, image } = item
        // Insert rows from table users
        const request = new Request(
          `insert into users (name, email, vat, phone, country, website, image) 
          values (${name}, ${email}, ${vat}, ${phone}, ${country}, ${website}, ${image})`,
          (err, rowCount) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log(`insert data in users table`);
            }
          }
        );

        connection.execSql(request);
      })
    })
})


app.listen(5000, () => {
  console.log('>> serveeers on port 5000')
})