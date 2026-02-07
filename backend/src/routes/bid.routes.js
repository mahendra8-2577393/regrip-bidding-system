const router = require("express").Router();
const c = require("../controllers/bid.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/:id", auth, c.placeBid);
module.exports = router;
