    document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const errorMessage = document.getElementById('error-message');
    
    let tasks = [];
    
    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {            
            tasks = JSON.parse(savedTasks);
            renderTasks();
        }
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function renderTasks() {    
        taskList.innerHTML = '';

        if (tasks.length === 0) {            
            const emptyState = document.createElement('li');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'No tasks yet. Add one to get started!';
            taskList.appendChild(emptyState);
            return;
        }
        
        tasks.forEach(function(task) {
            const taskItem = createTaskElement(task);
            taskList.appendChild(taskItem);
        });
    }
    
    function createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        if (task.completed) {            
            taskItem.classList.add('completed');
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        
        checkbox.addEventListener('change', function() {
            toggleTask(task.id);
        });
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', function() {
            deleteTask(task.id);
        });
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteBtn);
        return taskItem;
    }
    
    function addTask(taskText) {

        const newTask = {            
            id: Date.now(),
            text: taskText,
            completed: false
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
    }
    
    function toggleTask(taskId) {
        const task = tasks.find(function(t) {
            return t.id === taskId;
        });
        
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    }
    
    function deleteTask(taskId) {
        tasks = tasks.filter(function(task) {
            return task.id !== taskId;
        });
        
        saveTasks();
        renderTasks();
    }
    
    function showError() {
        errorMessage.classList.remove('hidden');
        
        setTimeout(function() {
            errorMessage.classList.add('hidden');
        }, 3000);
    }
    
    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            showError();    
            return;
        }
        
        addTask(taskText);
        taskInput.value = '';
        taskInput.focus();
    });
    
    loadTasks();
    
});