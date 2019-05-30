const express = require('express')
const router = express.Router()
const request = require('request')
const ip = require('ip')

router.get('/', function(req, res, next) {
    res.render('predict', { title: 'AutoML產品類別預測', ip_addr: ip.address() })
});

router.post('/', function (req, res, next) {
    var content = req.body.content
    let api = process.env.API_HOST + "/predict-text"

    let data = {
        'description': content
    }

    request.post({
        url: api,
        formData: data
    }, function (err, httpResponse, body) {
        if (err) {
            return next(err)
        }
        let data = JSON.parse(body)
        return res.render("score", {title: '預測結果', result: data, ip_addr: ip.address()})
    })
})

module.exports = router;