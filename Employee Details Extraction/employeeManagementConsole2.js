const readline = require('readline');
const fs = require('fs');

// let csvData = `
// ID,Name,Department,Salary
// 1,John Doe,Engineering,50000
// 2,Jane Smith,Marketing,45000
// 3,Bob Johnson,Sales,48000`;


const filePath = './employees.csv';

function parseCSV(data) {
    let rows = data.trim().split("\n");
    let headers = rows[0].split(",");
    
    return rows.slice(1).map(row => {
        let values = row.split(",");
        let obj = {};
        headers.forEach((header, index) => { 
            obj[header] = values[index];
        });
        return obj;
    });
}

function convertToCSV(data) {
    let headers = '';
    for (let key in data[0]) {
        headers += key + ',';
    }
    headers = headers.slice(0, -1);  

    let rows = [];
    for (let i = 0; i < data.length; i++) {
        let row = '';
        for (let key in data[i]) {
            row += data[i][key] + ',';
        }
        rows.push(row.slice(0, -1)); 
    }

    return headers + "\n" + rows.join("\n");
}


let employeeData = parseCSV(fs.readFileSync(filePath, "utf8"));

 
function displayEmployees() {
    console.log("\nEmployee List:");
    for (let i = 0; i < employeeData.length; i++) {
        let employee = employeeData[i];
        console.log(`ID: ${employee.ID}, Name: ${employee.Name}, Department: ${employee.Department}, Salary: ${employee.Salary}`);
    }
}


function searchEmployee(name) {
    return new Promise((resolve, reject) => {
        let result = employeeData.filter(employee => employee.Name.toLowerCase() === name.toLowerCase());
        if (result.length > 0) {
            resolve(result);
        } else {
            reject("No employee found.");
        }
    });
}


function addEmployee(name, department, salary) {
    let newId = employeeData.length + 1;
    employeeData.push({ ID: String(newId), Name: name, Department: department, Salary: salary });
    fs.writeFileSync(filePath, convertToCSV(employeeData), "utf8");
    console.log("Employee added successfully!");
}


function findEmployeeIndexByName(name) {
    for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].Name.toLowerCase() === name.toLowerCase()) {
            return i;
        }
    }
    return -1; 
}

function deleteEmployee(name) {
    let index = findEmployeeIndexByName(name);
    
    if (index !== -1) {
        employeeData.splice(index, 1); 
        fs.writeFileSync(filePath, convertToCSV(employeeData), "utf8"); 
        console.log("Employee deleted successfully!");
    } else {
        console.log("Employee not found.");
    }
}

function editEmployee(newName, newDepartment, newSalary) {

    let found = false;
    for (let i = 0; i < employeeData.length; i++) {
        if (employeeData[i].Name.toLowerCase() === newName.toLowerCase()) {
            employeeData[i].Department = newDepartment;
            employeeData[i].Salary = newSalary;
            fs.writeFileSync(filePath, convertToCSV(employeeData), "utf8");
            console.log("Employee details updated successfully!");
            
            found = true;
            break;

        }
    }
    if (!found) {
        console.log("Employee not found.");
    }}


    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    function showMenu() {
        console.log(`
    1. Display Employees
    2. Search Employee
    3. Add Employee
    4. Delete Employee
    5. Edit Employee
    6. Exit
    `);
        rl.question("Select an option: ", (choice) => {
            if (choice === '1') {
                displayEmployees();
                showMenu();
            } else if (choice === '2') {
                rl.question("Enter employee name to search: ", (name) => {
                    searchEmployee(name)
                        .then(results => {
                            console.log("\nSearch Results:");
                            results.forEach(employee => {
                                console.log(`ID: ${employee.ID}, Name: ${employee.Name}, Department: ${employee.Department}, Salary: ${employee.Salary}`);
                            });
                            showMenu();
                        })
                        .catch(error => {
                            console.log(error);
                            showMenu();
                        });
                });
            } else if (choice === '3') {
                rl.question("Enter name, department, salary (comma-separated): ", (input) => {
                    let [name, department, salary] = input.split(",");
                    if (name && department && salary) {
                        addEmployee(name.trim(), department.trim(), salary.trim());
                    } else {
                        console.log("Invalid");
                    }
                    showMenu();
                });
            } else if (choice === '4') {
                rl.question("Enter employee name to delete: ", (name) => {
                    deleteEmployee(name.trim());
                    showMenu();
                });
            } else if (choice === '5') {
                rl.question("Enter name, new department, new salary (comma-separated): ", (input) => {
                    let [name, newDepartment, newSalary] = input.split(",");
                    if (name) {
                        editEmployee(name.trim(), newDepartment?.trim(), newSalary?.trim());
                    } else {
                        console.log("Invalid");
                    }
                    showMenu();
                });
            } else if (choice === '6') {
                rl.close();
            } else {
                console.log("Invalid");
                showMenu();
            }
        });
    }
    
    showMenu();