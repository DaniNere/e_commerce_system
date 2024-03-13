const express = require("express");

const router = express.Router();

const {create} = require("../controlers/user")

router.post('/create/user', create);

module.exports = router;
