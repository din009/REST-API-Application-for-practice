const { connection } = require("./connection");

const getEmployeesTable = connection.table('employees');

async function getEmployees(employee_id){
    let query = ''
    if(employee_id){
        query = await getEmployeesTable.select().where({employee_id}).orderBy('employee_id','asc');
    }else{
        query = await getEmployeesTable.select().orderBy('employee_id','asc');
    }
    return await query;
}
async function createEmployees({employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,manager_id,department_id}){
    const employee = {
        employee_id,
        first_name,
        last_name,
        email,
        phone_number,
        hire_date,
        job_id,
        salary,
        manager_id,
        department_id
    };
    await getEmployeesTable.insert(employee);
    return employee;
}

module.exports={
    getEmployees,
    createEmployees
}
