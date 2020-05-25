var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const imageToBase64 = require('image-to-base64');

router.route("/encodeURL").post((req, res, next) => {
  var url = req.body.url;
  imageToBase64(url)
    .then((encodeURL) => {
      res.status(200).json({ url: encodeURL });
      next();
    })

});


module.exports = router;
