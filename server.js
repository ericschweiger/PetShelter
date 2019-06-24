const express = require("express"),
         cors = require("cors"),
          app = express(),
      DB_NAME = "petsdb"
         port = 8000,
           bp = require("body-parser");
        

app.use(cors());
app.use(bp.json());
//todo express static?

require('./server/utils/mongoose')(DB_NAME);
require('./server/utils/routes')(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})