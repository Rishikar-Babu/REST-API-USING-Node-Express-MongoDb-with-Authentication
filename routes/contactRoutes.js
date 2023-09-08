const express=require('express')
const  verifytokenHandler=require('../middleware/validateTokenHandler')
const router=express.Router();

const {getContact,deleteContactById,updateContactById,getContactById,cretaeContact}=require('../Controllers/contactController')

router.use(verifytokenHandler)

router.route('/').get(getContact).post(cretaeContact)
router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById)




module.exports=router;