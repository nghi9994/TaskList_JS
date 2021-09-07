const form = document.querySelector('#task-form')
const taskInput = document.querySelector("#task")
const filter = document.querySelector("#filter")
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')

// ########## Load all event listeners ##########
loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks)
}

// ########## Add task function ##########
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add task');
  };

  // ##### Create list element #####
  const li = document.createElement('li')
  li.className = 'collection-item'
  li.appendChild(document.createTextNode(taskInput.value))

  // ##### Create link element #####
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // ##### Append link into list #####
  li.appendChild(link);

  console.log(li)

  // ##### Append li into ul #####
  taskList.appendChild(li);

  // ##### Clear input #####
  taskInput.value = '';

  e.preventDefault();
}

// ########## Remove task function ##########
function removeTask(e) {
  // ##### Method 1 #####
  if (e.target.className === 'fa fa-remove') {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  // ##### Method 2 #####
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// ########## Clear task function ##########
function clearTasks(e) {
  taskList.innerHTML = '';
  
  // ##### Faster way #####
  while (taskList.firstChild) {
    // Method 1
    taskList.firstChild.remove()
    // Method 2
    taskList.removeChild(taskList.firstChild);
  };
  
  // console.log(taskList.firstChild)
}

// ########## Filter task function ##########
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // ##### Method 1 #####
  // Nên dùng cách 2, lấy trực tiếp item, hạn chế thông qua parent hay children
  for (let i = 0; i <= taskList.children.length; i++){
    if (!taskList.children[i].innerText.toLowerCase().includes(e.target.value)) {
      taskList.children[i].style.display = 'none';
    } else {
      taskList.children[i].style.display = 'block';
    }
  }
  
  // ##### Method 2 #####
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
};


