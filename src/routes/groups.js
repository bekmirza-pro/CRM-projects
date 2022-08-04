const {GetAllGroups, GetOne, CreateGroup, DeleteGroup, UpdateGroup } = require('../controllers/groups')
const validate = require('../middlewares/validation/validate')
const paramSchema = require("../middlewares/validation/schemas/params") 
const update_group = require("../middlewares/validation/schemas/groups/updateGroups")

const GroupRouter = require('express').Router()

GroupRouter.get('/', GetAllGroups);
GroupRouter.get("/:id",  validate(paramSchema, "params"), GetOne);
GroupRouter.post('/create', CreateGroup);
GroupRouter.put('/:id',  validate(paramSchema, "params"),  validate(update_group), UpdateGroup);
GroupRouter.delete('/:id',  validate(paramSchema, "params"), DeleteGroup);


module.exports = GroupRouter