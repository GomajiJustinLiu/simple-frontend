const express = require('express')
const router = express.Router()
const request = require('request')
const ip = require('ip')

router.get('/', function(req, res, next) {
    let api = process.env.API_HOST + "/predict-history"
    request.get({
        url: api,
    }, function (err, httpResponse, body) {
        if (err) {
            return next(err)
        }
        let data = JSON.parse(body)
        return res.render("history", {title: '預測歷史紀錄', result: data, ip_addr: ip.address()})
    })

});

module.exports = router;