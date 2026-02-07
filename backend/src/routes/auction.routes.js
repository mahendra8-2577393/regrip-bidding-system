const router = require("express").Router();
const c = require("../controllers/auction.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");


router.get("/", auth, c.getAuctions);
router.post("/", auth, role("ADMIN"), c.createAuction);
router.post("/:id/start", auth, role("ADMIN"), c.startAuction);



module.exports = router;
