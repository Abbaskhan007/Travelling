const express = require('express');
const router = express.Router();
const multer = require('multer');
const {productModal} = require('../Models/Product');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", function(req, res) {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
});

router.post("/uploadProduct", (req, res)=> {
    
    const product = new productModal(req.body)
    product.save(err=>{
        if(err){
            return res.status(400).json({success: 'false', err})
        }
        return res.status(200).json({success: true})
    })
});

router.post("/productDetails",(req,res)=>{
    console.log('req',req.body.id)
    let productId = req.body.id;
    let type = Array.isArray(productId);
    //let type = typeof productId;
    console.log('Request.....',productId,'type......',type)
    /*if(type){
        let ids = productId.split(',');
        productId = [];
        productId = ids.map(item=>{
            return item
        })
        console.log('productId',productId)
    }*/
    productModal.find({'_id':{$in: productId}})
    .exec((err,product)=>{
        if(err)
            return res.status(400).json({success:false,err})
        return res.status(200).json({success:true,product})
    })
})

router.post("/getProduct", function(req, res) {
    const limit = req.body.limit?parseInt(req.body.limit):100;
    const skip = parseInt(req.body.skip);
    let findArgs = {};
    
    for (let key in req.body.filter){
        if(req.body.filter[key].length>0){
        if(key==='price'){
            findArgs[key] = {
                $gte: req.body.filter[key][0],
                $lte: req.body.filter[key][1]
            }
        }
        else{
            findArgs[key] = req.body.filter[key];
        }
    }}
    console.log(findArgs);
     productModal.find(findArgs)
     .skip(skip)
     .limit(limit)
     .exec((err,products)=>{
         if(err){
             return res.status(400).json({success:false,err})
         }
         return res.status(200).json({success:true,products})
     })
});

module.exports = router;