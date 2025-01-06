
function initialize() {

    let csvData = `
ID,Name,Department,Salary
1,John Doe,Engineering,50000
2,Jane Smith,Marketing,45000
3,Bob Johnson,Sales,48000`;

    function parseCSV(data) {
        let rows = data.trim().split("\n");
        let headers = rows[0].split(",");
        return rows.slice(1).map(row => {
            let values = row.split(",");
            let obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index].trim();
            });
            return obj;
        });
    }

    let employees = parseCSV(csvData);

    const employeeTableBody = document.querySelector('#employeeTable tbody');
    const employeePopup = document.getElementById('employeePopup');
    const employeeForm = document.getElementById('employeeForm');
    const closePopup = document.getElementById('closePopup');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const employeeIdInput = document.getElementById('employeeId');
    const nameInput = document.getElementById('name');
    const departmentInput = document.getElementById('department');
    const salaryInput = document.getElementById('salary');

    function createTable() {
        employeeTableBody.innerHTML = '';
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${employee.ID}</td>
            <td>${employee.Name}</td>
            <td>${employee.Department}</td>
            <td>${employee.Salary}</td>
            <td>
                <button class="edit-btn" data-id="${employee.ID}">Edit</button>
                <button class="delete-btn" data-id="${employee.ID}">Delete</button>
            </td>
        `;
            employeeTableBody.appendChild(row);
        });

        document.querySelectorAll('.edit-btn').forEach(button =>
            button.addEventListener('click', handleEdit)
        );
        document.querySelectorAll('.delete-btn').forEach(button =>
            button.addEventListener('click', handleDelete)
        );
    }

    function openPopup(employee = null) {
        if (employee) {
            employeeIdInput.value = employee.ID;
            nameInput.value = employee.Name;
            departmentInput.value = employee.Department;
            salaryInput.value = employee.Salary;
        } else {
            employeeIdInput.value = '';
            nameInput.value = '';
            departmentInput.value = '';
            salaryInput.value = '';
        }
        employeePopup.style.display = 'block';
    }

    function closePopupFn() {
        employeePopup.style.display = 'none';
    }

    employeeForm.addEventListener('submit', event => {
        event.preventDefault();
        const id = employeeIdInput.value;
        const name = nameInput.value.trim();
        const department = departmentInput.value.trim();
        const salary = salaryInput.value.trim();

        if (id) {
            const employee = employees.find(emp => emp.ID === id);
            if (employee) {
                employee.Name = name;
                employee.Department = department;
                employee.Salary = salary;
            }
        } else {
            let maxId = 0;
            employees.forEach(emp => {
                const currentId = Number(emp.ID);
                if (currentId > maxId) {
                    maxId = currentId;
                }
            });

            const newId = maxId + 1;
            employees.push({ ID: String(newId), Name: name, Department: department, Salary: salary });
        }
        createTable();
        closePopupFn();
    });

    function handleEdit(event) {
        const id = event.target.getAttribute('data-id');
        const employee = employees.find(emp => emp.ID === id);
        if (employee) {
            openPopup(employee);
        }
    }

    function handleDelete(event) {
        const id = event.target.getAttribute('data-id');
        employees = employees.filter(emp => emp.ID !== id);
        createTable();
    }

    addEmployeeBtn.addEventListener('click', () => openPopup());
    closePopup.addEventListener('click', closePopupFn);
    window.addEventListener('click', event => {
        if (event.target === employeePopup) {
            closePopupFn();
        }
    });
    createTable();
}

initialize();