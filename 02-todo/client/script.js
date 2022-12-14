todoForm.title.addEventListener("input", (e) => validateField(e.target));
todoForm.title.addEventListener("blur", (e) => validateField(e.target));
todoForm.description.addEventListener("input", (e) => validateField(e.target));
todoForm.description.addEventListener("blur", (e) => validateField(e.target));
todoForm.dueDate.addEventListener("input", (e) => validateField(e.target));
todoForm.dueDate.addEventListener("blur", (e) => validateField(e.target));

todoForm.addEventListener("submit", onSubmit);

const todoListElement = document.getElementById("todoList");
let titleValid = true;
let descriptionValid = true;
let dueDateValid = true;

const api = new Api("http://localhost:5000/tasks");

function validateField(field) {
  const { name, value } = field;

  let validationMessage = "";

  switch (name) {
    case "title": {
      if (value.length < 2) {
        titleValid = false;
        validationMessage = "Fältet 'Titel' måste innehålla minst 2 tecken";
      } else if (value > 100) {
        titleValid = false;
        validationMessage =
          "Fältet 'Titel' får inte innehålla mer än 100 tecken";
      } else {
        titleValid = true;
      }
      break;
    }
    case "description": {
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage =
          "Fältet 'Beskrivning' får inte innehålla mer än 500 tecken";
      } else {
        descriptionValid = true;
      }
      break;
    }
    case "dueDate": {
      if (value.length === 0) {
        dueDateValid = false;
        validationMessage = "Fältet 'Slutfört senast' är obligatorisk";
      } else {
        dueDateValid = true;
      }
      break;
    }
  }
  field.previousElementSibling.innerText = validationMessage;
  field.previousElementSibling.classList.remove("hidden");
}

function onSubmit(e) {
  e.preventDefault();

  if (titleValid && descriptionValid && dueDateValid) {
    console.log("Submit");
    saveTask();
  }
}

function saveTask() {
  const task = {
    title: todoForm.title.value,
    description: todoForm.description.value,
    dueDate: todoForm.dueDate.value,
    completed: false,
  };

  api.create(task).then((task) => {
    if (task) {
      renderList();
    }
  });
}

function renderList() {
  api.getAll().then((tasks) => {
    todoListElement.innerHTML = "";
    console.log(tasks);
    customSort = (a, b) => {
      const dateA = a.dueDate;
      const dateB = b.dueDate;
      if (dateA < dateB) return -1;
      else if (dateA > dateB) return 1;
      return 0;
    };

    console.log("sorted", tasks.sort(customSort));
    if (tasks && tasks.length > 0) {
      tasks.forEach((task) => {
        todoListElement.insertAdjacentHTML("beforeend", renderTask(task));
      });
    }
  });
}

function renderTask({ id, title, description, dueDate, completed }) {
  let html = `
    <li class="p-4 select-none mt-2 py-2 border-b border-amber-500 ${completed}">
        <div class="flex items-center">
        <form class="p-1">
          <input onclick="completeTask(${id})" type="checkbox" id="completed" name="completed" value="completed" >
          <label for="completed" class="p-2"></label>
          </form>
            <h3 class="mb-3 flex-1 text-xl font-bold text-pink-800 uppercase">${title}</h3>
            <div>
                <span>${dueDate}</span>
                <button onclick="deleteTask(${id})" class="inline-block bg-amber-500 text-xs text-amber-900 border-white px-3 py-1 rounded-md ml-2">Ta bort</button>
            </div>
        </div>
    `;
  completed &&
    (html += `<p class="ml-8 mt-2 text-xs italic">Task Completed</p>`);
  description &&
    (html += `<p class="ml-8 mt-2 text-xs italic">${description}</p>`);
  html += `</li>`;
  return html;
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function completeTask(id) {
  api.update(id);
  await delay(10);
  renderList();
}

function deleteTask(id) {
  api.remove(id).then((result) => {
    renderList();
  });
}

renderList();
