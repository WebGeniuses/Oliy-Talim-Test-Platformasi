import {Router}  from "express";
import { creatEmployeeHandler, deleteEmployeeHandler, findEmployeByPhonenumber, findEmployeeByIdHandler, getPagingEmployeeHandler, signInHandler, updateEmployeeHandler } from "../handler/employee/employee.handler";
import { authToken } from "../middlewares/authToken";


const router = Router();
router.post('/',authToken, creatEmployeeHandler);
router.get('/paging',authToken, getPagingEmployeeHandler);
router.get('/phone',authToken, findEmployeByPhonenumber);
router.get('/', authToken , findEmployeeByIdHandler);
router.put('/', authToken,  updateEmployeeHandler);
router.delete('/:_id', authToken, deleteEmployeeHandler)
router.post('/login' , signInHandler);



export default router;

