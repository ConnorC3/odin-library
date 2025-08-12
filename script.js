const myLibrary = [];
const tbody = document.querySelector("tbody");
const dialog = document.querySelector('dialog');
const newBookBtn = document.querySelector('.add-book-btn');
const cancelBtn = document.querySelector('.btn-cancel');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const statusInput = document.querySelector('#status');
const form = document.querySelector('form');

function Book(title, author, pages, status){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.changeStatus = function () {
    this.status = !this.status;
}

function addBookToLibrary(title, author, pages, status){
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        statusInput.checked
    );
    clearForm();
    dialog.close();
    displayBooks();
})

cancelBtn.addEventListener('click', () => {
    clearForm();
    dialog.close();
});

function clearForm(){
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    statusInput.checked = false;
}

function createRow(book){
    const trow = document.createElement('tr');
    trow.setAttribute('data-id', book.id);

    trow.appendChild(createColumn(book.title, 'title'));
    trow.appendChild(createColumn(book.author, 'author'));
    trow.appendChild(createColumn(book.pages, 'pages'));
    trow.appendChild(createColumn(createStatusBadge(book.status), 'status'));

    return trow;
}

function createColumn(content, className){
    const tdata = document.createElement('td');
    
    if (className) tdata.classList.add(className);
    if (content instanceof HTMLElement){
        tdata.appendChild(content);
    } else {
        tdata.textContent = content;
    }

    return tdata;
}

function createActionBtns(bookID){
    const actionsCol = createColumn('', 'actions');

    const statusBtn = document.createElement('button');
    statusBtn.classList.add('btn', 'btn-status');
    statusBtn.textContent = "Change Status";

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-delete');
    deleteBtn.textContent = "Delete";

    statusBtn.addEventListener('click', () => {
        const index = myLibrary.findIndex((item) => item.id === bookID);
        myLibrary[index].changeStatus();
        displayBooks();
    });

    deleteBtn.addEventListener('click', () => {
        const index = myLibrary.findIndex((item) => item.id === bookID);
        myLibrary.splice(index, 1);
        displayBooks();
    });

    actionsCol.appendChild(statusBtn);
    actionsCol.appendChild(deleteBtn);

    return actionsCol;
}

function createStatusBadge(status){
    const badge = document.createElement('span');
    badge.classList.add('status-badge', status ? 'status-read' : 'status-unread');
    badge.textContent = status ? 'Read' : 'Unread';
    return badge;
}

function displayBooks(){
    tbody.textContent = "";
    myLibrary.forEach((book) => {
        const row = createRow(book);
        const actionBtns = createActionBtns(book.id);
        row.appendChild(actionBtns);
        tbody.appendChild(row);
    });
    console.log(myLibrary);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);

displayBooks();