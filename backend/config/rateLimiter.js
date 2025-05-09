const rateLimit=require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes (temps en ms)
    max: 999, // limit each IP to 100 requests per windowMs
});

module.exports=limiter;