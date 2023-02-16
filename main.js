// TÜM ELEMENTLERİ SEÇME KISMI 
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoLıst = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUı);
    secondCardBody.addEventListener("click", deleteTodo); //secondCardbody e geldiğinde click çalışırsa todoyu sildiriyo
    filter.addEventListener("keyup", filterTodos)
    clearButton.addEventListener("click", clearAllTodos);

}

function clearAllTodos(e) {
    // ara yüzden todoları   kaldırma 
    if (confirm("tümünü silmek istediğinize emin misiniz")) {
        // todoLıst.innerHTML = ""; bu yöntem yavaş
        while (todoLıst.firstElementChild != null) {
            todoLıst.removeChild(todoLıst.firstElementChild);

        }
        localStorage.removeItem("todos") // localden sildi
    }
}

function filterTodos(e) {
    console.log(e.target.value)
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            //BULAMADI 
            listItem.setAttribute("style", "display : none !important");

        } else {
            listItem.setAttribute("style", "display : block ")
        }

    })
}



function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        //eğer bastığımda ismi fa fa remove ise
        e.target.parentElement.parentElement.remove(); //burada girdim ve li nin içerisinde ki a nin içindeki iconu buldum
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "todo başarı ile silindi ");
    }
    // console.log(e.target);// bu sayede nereye tıklarsam onun için consolda nereye tıkladığım yazılıyo
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo, index) {

        console.log(todo, deleteTodo);
        console.log(todo.length, deleteTodo.length);
        if (todo.trim() === deleteTodo.trim()) {
            todos.splice(index - 1, 1); //arrayden değeri siliyoruz
        }
    });
    // localStorage.setItem("todos", JSON.stringify(todos)); // bu kısmı anlamadım

    localStorage.setItem("todos", JSON.stringify(todos)); // bu kısmı anlamadım
}

function loadAllTodosToUı() {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoToUı(todo);

    })
}

function addTodo(e) {
    e.preventDefault();
    const newTodo = todoInput.value.trim(); //biraz süre alıyor. 
    // console.log(newTodo)
    // addTodoToUı(newTodo);
    //eğer inputum boşsa showalert yaptırıyorum. değilse de addtodouı
    if (newTodo === "") {
        showAlert("danger", "lütfen mesaj giriniz");
        //eğer danger yerine success yazarsam yeşil bildiri gelir
        // <div class="alert alert-danger" role="alert">
        // This is a dark alert—check it out!
        // </div>
    } else {
        addTodoToUı(newTodo)
        addTodoToStorage(newTodo)
        showAlert("success", "todo başarı ile eklendi...")
    }

}

function getTodosFromStorage() { // Storageden todoları alacak
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []

    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))

    //bu sayede sayfayı yenilediğim zaman bunlar local storage de kalmış olacak 
}

function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    console.log(alert)

    firstCardBody.appendChild(alert);

    setTimeout(function() {
        // bunun sayesidne 2 sn sonra ekranda gözüküp silinmiş olacak
        alert.remove()

    }, 1000);

}


function addTodoToUı(newTodo) { //string değerini list item olarak uı'ya ekliyoruz

    // <!-- <li class="list-group-item d-flex justify-content-between">
    //                         Todo 1
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>

    //                     </li>-->


    //list ıtem oluşturuldu
    const listItem = document.createElement("li");
    //link oluşturma 
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = " <i class = 'fa fa-remove'></i> ";

    listItem.className = "list-group-item d-flex justify-content-between ";
    // Text Node Ekleme 

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo List'e List Item ekleme 
    todoLıst.appendChild(listItem)


    // console.log(listItem)
}