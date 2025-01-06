const readline = require("readline");
const fs = require("fs");

const filePath = "./employees.csv";

function parseCSV(data) {
    const rows = data.trim().split("\n");
    const headers = rows[0].split(",");
    return rows.slice(1).map((row) => {
        const values = row.split(",");
        const obj = {};
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

function loadEmployeeData() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                reject("Error loading data.");
                return;
            }
            resolve(parseCSV(data));
        });
    });
}

function saveEmployeeData(data) {
    return new Promise((resolve, reject) => {
        const csvData = convertToCSV(data);
        fs.writeFile(filePath, csvData, "utf8", (err) => {
            if (err) {
                reject("Error saving data.");
                return;
            }
            resolve("File saved successfully.");
        });
    });
}

function displayEmployees(employeeData) {
    console.log("\nEmployee List:");
    employeeData.forEach((employee) => {
        console.log(
            `ID: ${employee.ID}, Name: ${employee.Name}, Department: ${employee.Department}, Salary: ${employee.Salary}`
        );
    });
}

function searchEmployee(employeeData, name) {
    return new Promise((resolve, reject) => {
        const result = employeeData.filter(
            (employee) => employee.Name.toLowerCase() === name.toLowerCase()
        );

        if (result.length > 0) {
            resolve(result);
        } else {
            reject("No employee found.");
        }
    });
}

function addEmployee(employeeData, name, department, salary) {
    const newId = employeeData.length + 1;
    const newEmployee = { ID: String(newId), Name: name, Department: department, Salary: salary };
    employeeData.push(newEmployee);
    return saveEmployeeData(employeeData).then(() => "Employee added successfully!");
}

function deleteEmployee(employeeData, name) {
    const index = employeeData.findIndex(
        (employee) => employee.Name.toLowerCase() === name.toLowerCase()
    );
    if (index !== -1) {
        employeeData.splice(index, 1);
        return saveEmployeeData(employeeData).then(() => "Employee deleted successfully!");
    }
    return Promise.reject("Employee not found.");
}

function editEmployee(employeeData, name, department, salary) {
    const employee = employeeData.find(
        (emp) => emp.Name.toLowerCase() === name.toLowerCase()
    );
    if (employee) {
        employee.Department = department;
        employee.Salary = salary;
        return saveEmployeeData(employeeData).then(() => "Employee details updated successfully!");
    }
    return Promise.reject("Employee not found.");
}

function showMenu() {
    console.log(`
1. Display Employees
2. Search Employee
3. Add Employee
4. Delete Employee
5. Edit Employee
6. Exit
`);
    return new Promise((resolve) => {
        rl.question("Select an option: ", resolve);
    });
}

function handleChoice(choice, employeeData) {
    return new Promise((resolve, reject) => {
        switch (choice) {
            case '1':
                displayEmployees(employeeData);
                resolve();
                break;
            case '2':
                rl.question("Enter employee name to search: ", (name) => {
                    searchEmployee(employeeData, name)
                        .then(results => {
                            console.log("\nSearch Results:");
                            results.forEach(employee => {
                                console.log(`ID: ${employee.ID}, Name: ${employee.Name}, Department: ${employee.Department}, Salary: ${employee.Salary}`);
                            });
                            resolve();
                        })
                        .catch(reject);
                });
                break;
            case '3':
                rl.question("Enter name, department, salary (comma-separated): ", (input) => {
                    let [name, department, salary] = input.split(",");
                    if (name && department && salary) {
                        addEmployee(employeeData, name.trim(), department.trim(), salary.trim()).then(() => resolve());
                    } else {
                        reject("Invalid input.");
                    }
                });
                break;
            case '4':
                rl.question("Enter employee name to delete: ", (name) => {
                    deleteEmployee(employeeData, name.trim()).then(() => resolve());
                });
                break;
            case '5':
                rl.question("Enter name, new department, new salary (comma-separated): ", (input) => {
                    let [name, newDepartment, newSalary] = input.split(",");
                    if (name) {
                        editEmployee(employeeData, name.trim(), newDepartment?.trim(), newSalary?.trim()).then(() => resolve());
                    } else {
                        reject("Invalid input.");
                    }
                });
                break;
            case '6':
                rl.close();
                resolve("exit");
                break;
            default:
                reject("Invalid choice.");
        }
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    loadEmployeeData()
        .then((employeeData) => {
            return showMenu()
                .then((choice) => {
                    return handleChoice(choice, employeeData);
                })
                .then(() => {
                    console.log("\nOperation complete.");
                    return main(); 
                })
                .catch((error) => {
                    if (error !== "exit") {
                        console.error(error);
                        return main(); 
                    }
                });
        })
        .catch((error) => {
            console.error(error);
            rl.close();
        })
        .finally(() => {
            console.log("Finished");
        });
}

main();
