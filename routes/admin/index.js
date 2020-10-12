const express = require('express'),
    adminApp = express()

const AllUserProjectController = require('../../controller/admin/AllUserProject.controller');
const getProfileController = require('../../controller/admin/get_profile.controller'),
    updateProfileController = require('../../controller/admin/update_profile.controller'),
    { upload, remove } = require('../../controller/admin/profile-image.controller'),
    createProfileController = require('../../controller/admin/create-profile.controller'),
    collectionMethodController = require('../../controller/admin/collectionMethod.controller'),
    addProjectController = require('../../controller/admin/AddProject.controller'),
    userProjectAllocationController = require('../../controller/admin/user-project-allocation.controller'),
    particularUserProjectController = require('../../controller/admin/Project-particularUser.controller'),
    allUserProjectController = require('../../controller/admin/AllUserProject.controller'),
    updateProjectStatusController = require('../../controller/admin/update-project-status.controller'),
    updateProjectDetailController = require('../../controller/admin/update-project-title.controller'),
    aggregationPipelineStages = require('../../controller/admin/aggregation_pipeline_stages')


adminApp.get('/profile', getProfileController)
adminApp.post('/create', createProfileController)
adminApp.post('/updateProfile', updateProfileController);
adminApp.post('/profile-image', upload)
adminApp.get('/profile-remove/:filename', remove)
adminApp.post('/collection-method', collectionMethodController)
adminApp.post('/addProject', addProjectController)
adminApp.post('/allocateProject', userProjectAllocationController)
adminApp.get('/particularUserProject', particularUserProjectController)
adminApp.get('/allUserProject', allUserProjectController)
adminApp.post('/updateProjectStatus', updateProjectStatusController)
adminApp.post('/updateProjectDetail', updateProjectDetailController)
adminApp.get('/aggregationPipeline', aggregationPipelineStages)



module.exports = adminApp;