const myLibrary = [];
const tbody = document.querySelector("tbody");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.changeStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read){
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(newBook);
}

function createRow(book){
    const trow = document.createElement('tr');
    trow.setAttribute('data-id', book.id);

    trow.appendChild(createColumn(book.title, 'title'));
    trow.appendChild(createColumn(book.author, 'author'));
    trow.appendChild(createColumn(book.pages, 'pages'));
    trow.appendChild(createColumn(createStatusBadge(book.read), 'status'));

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

function createStatusBadge(read){
    const badge = document.createElement('span');
    badge.classList.add('status-badge', read ? 'status-read' : 'status-unread');
    badge.textContent = read ? 'Read' : 'Unread';
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
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);

displayBooks();