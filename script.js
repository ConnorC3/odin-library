const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function () {
        let hasRead = "";
        if (read) {
            hasRead = "read"
        } else {
            hasRead = "not read yet"
        }
        return `${title} by ${author}, ${pages} pages, ${hasRead}`
    }
}

let theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, true);
console.log(theHobbit.info())

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}