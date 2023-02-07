//dependencies 
const router = require('express');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

//defines paths
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

//catch routes that don't exist
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;