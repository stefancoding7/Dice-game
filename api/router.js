const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server is runing changed again')
});




module.exports = router;