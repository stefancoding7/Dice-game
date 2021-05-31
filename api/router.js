const express = require('express');
const router = express.Router();

//for  development
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'));
});


// test
// router.get('/', (req, res) => {
//     res.send('Server is runing changed again')
// });




module.exports = router;