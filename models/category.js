const mongoose = require ('mongoose')

const categorySquema= mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
          },
          color: {
            type: String
          }
})
module.exports = mongoose.model("Category", categorySquema)