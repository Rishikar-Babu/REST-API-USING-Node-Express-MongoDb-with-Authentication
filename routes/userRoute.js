const express=require('express')
const validatetoken=require('../middleware/validateTokenHandler')
const router=express.Router();
const {registerUser,welcomeuser,loginUser,currentUser}=require('../Controllers/userConteroller')

router.route('/login').post(loginUser)
router.post('/registeruser',registerUser)
router.get('/current',validatetoken,currentUser);
router.get('/welcome',welcomeuser)



module.exports=router;