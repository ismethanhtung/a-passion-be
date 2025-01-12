const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");
const authenticate = require("../middlewares/authenticate");
const authorizeRoles = require("../middlewares/authorizeRoles");
const qs = require("qs");
var crypto = require("crypto");
// const request = require("request");
// const moment = require("moment");

router.get("/", purchaseController.getAllPurchases);
router.get("/limit", purchaseController.getLimitPurchases);
router.get("/:id", purchaseController.getPurchaseById);
router.get("/check/:courseId", authenticate, purchaseController.checkPurchase);
router.post("/", purchaseController.createPurchase);
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin", "teacher"),
    purchaseController.updatePurchase
);
router.delete("/:id", authenticate, authorizeRoles("admin"), purchaseController.deletePurchase);

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const config = {
    vnp_TmnCode: "818XOBLU",
    vnp_HashSecret: "1DKM6TTC8KOJ9FQJR98FQNQTDOYSHHVN",
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_ReturnUrl: "http://localhost:3000/payment-return",
};

router.get("/create_payment_url", function (req, res, next) {
    res.render("order", { title: "Tạo mới đơn hàng", amount: 10000 });
});

router.get("/querydr", function (req, res, next) {
    let desc = "truy van ket qua thanh toan";
    res.render("querydr", { title: "Truy vấn kết quả thanh toán" });
});

// router.post("/create_payment_url", function (req, res, next) {
//     process.env.TZ = "Asia/Ho_Chi_Minh";

//     let ipAddr =
//         req.headers["x-forwarded-for"] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

//     let tmnCode = config.vnp_TmnCode;
//     let secretKey = config.vnp_HashSecret;
//     let vnpUrl = config.vnp_Url;
//     let returnUrl = config.vnp_ReturnUrl;
//     let amount = req.body.amount;
//     let bankCode = req.body.bankCode;

//     let locale = req.body.language;
//     if (locale === null || locale === "") {
//         locale = "vn";
//     }
//     let currCode = "VND";
//     let vnp_Params = {};
//     vnp_Params["vnp_Version"] = "2.1.0";
//     vnp_Params["vnp_Command"] = "pay";
//     vnp_Params["vnp_TmnCode"] = tmnCode;
//     vnp_Params["vnp_Locale"] = locale;
//     vnp_Params["vnp_CurrCode"] = currCode;
//     vnp_Params["vnp_OrderType"] = "other";
//     vnp_Params["vnp_Amount"] = amount * 100;
//     vnp_Params["vnp_ReturnUrl"] = returnUrl;
//     vnp_Params["vnp_IpAddr"] = ipAddr;

//     vnp_Params = sortObject(vnp_Params);

//     let querystring = require("qs");
//     let signData = querystring.stringify(vnp_Params, { encode: false });
//     let crypto = require("crypto");
//     let hmac = crypto.createHmac("sha512", secretKey);
//     let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
//     vnp_Params["vnp_SecureHash"] = signed;
//     vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
//     console.log(vnpUrl);

//     res.json({ paymentUrl: vnpUrl });
// });

router.post("/create_payment_url", function (req, res, next) {
    process.env.TZ = "Asia/Ho_Chi_Minh";

    let date = new Date();
    let createDate = date
        .toISOString()
        .replace(/[-:T.]/g, "")
        .slice(0, 14);

    let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;
    let vnpUrl = config.vnp_Url;
    let returnUrl = config.vnp_ReturnUrl;
    let orderId = `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    let userId = req.body.userId;
    let courseId = req.body.courseId;

    let locale = req.body.language;
    if (!locale) {
        locale = "vn";
    }
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + courseId + "-" + userId;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    // vnp_Params["vnp_CourseId"] = courseId;
    // vnp_Params["vnp_UserId"] = userId;

    vnp_Params = sortObject(vnp_Params);

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.json({ paymentUrl: vnpUrl });
});

router.get("/vnpay_ipn", function (req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = config.vnp_HashSecret;
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
        var orderId = vnp_Params["vnp_TxnRef"];
        var rspCode = vnp_Params["vnp_ResponseCode"];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ RspCode: "00", Message: "success" });
    } else {
        res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
    }
});

module.exports = router;
