
// Job classes

class Job {
    constructor(name, job, start, finish) {
        this.name = name;
        this.job = job;
        this. start = start;
        this.finish = finish;
    }
}

// UI classes
class UI {
    static displayJobs() {

        const jobs = Store.getJobs();

        jobs.forEach((job) => UI.addJobToList(job));
    }

    static addJobToList(job) {
        const list = document.querySelector('#job-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${job.name}</td>
        <td>${job.job}</td>
        <td>${job.start}</td>
        <td>${job.finish}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
// Delete Job from list
    static deleteJob(el) {
if(el.classList.contains('delete')) 
 {
    el.parentElement.parentElement.remove();
}
    }

//Show ALERT
static showAlert (message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#job-form');
    container.insertBefore(div, form);
    //Vanish in 3 sec
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// Clear inputs
    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#job').value = '';
        document.querySelector('#start').value = '';
        document.querySelector('#finish').value = '';
    }

}


//Display Jobs
document.addEventListener('DOMContentLoaded', UI.displayJobs);

//Add jobs
document.querySelector('#job-form').addEventListener('submit', (e) => {

    //prevent actual submit
    e.preventDefault();
   
    // Get form values 
    const name = document.querySelector('#name').value;
    const job = document.querySelector('#job').value;
    const start = document.querySelector('#start').value;
    const finish = document.querySelector('#finish').value;

    // Valide
    if(name === '' || job === '' || start === '' || finish === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {

    //Instatiate job
    const joblist = new Job(name, job, start, finish); 

    // Add job to UI 
    UI.addJobToList(joblist);

    // Show success message
    UI.showAlert('Job Added', 'success');

    // Clear Fileds
    UI.clearFields();
    }

   
});

// Event: Remove a Job
document.querySelector('#job-list').addEventListener('click', (e) => {

UI.deleteJob(e.target);

// Show success message
UI.showAlert('Job Removed', 'success');
});

// FILTER

//Get input element
let filterInput = document.getElementById('filterInput');
//Add event listener
filterInput.addEventListener('keyup', filterNames);

function filterNames() {
    let filterValue = document.getElementById('filterInput').value.toUpperCase();
    //Get names ul
    let ul = document.getElementById('job-list');

    // Get lis form ul
    let li = ul.querySelectorAll('tr');
    //Loop throught collection-item lis
    for(let i = 0;i < li.length;i++) {
        let a = li[i].getElementsByTagName('td')[0];
        //If marched
        if(a.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }


};
