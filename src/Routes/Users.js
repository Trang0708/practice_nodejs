import express from 'express'
const router = express.Router()

router.get('/', (req,res) => {
    res.send("get user")
})
router.get('/:id',(req,res) => {
    res.send("get user by id " +req?.params?.id ?? +"")
})

export default router