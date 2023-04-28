const {body} = require('express-validator');
const {validationResult} = require('express-validator');


exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = 

[
    body('firstName','First Name cannot be empty!').notEmpty().trim().escape(),
    body('lastName','last Name cannot be empty!').notEmpty().trim().escape(),
    body('email','Email must be a valid one!').isEmail().trim().escape().normalizeEmail(),
    body('password','Password must be atlease 8 characters, atmost 64characters').isLength({min:8, max:64})
];

exports.validateLogin = 
[
    body('email','Email must be a valid one!').isEmail().trim().escape().normalizeEmail(),
    body('password','Password must be atlease 8 characters, atmost 64characters').isLength({min:8, max:64})];


exports.validateResult = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error',error.msg);
        });
        return res.redirect('back');
    }else{
        return next();
    }
}

exports.validateStory = 
[
    body('title','Title cannot be empty!').notEmpty().trim().escape(),
    body('content','Content must be atleast 10 characters!').isLength({min:10}).trim().escape()
];