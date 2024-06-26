// Book
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

// Library
class Library {
    constructor() {
        this.books = []
    }

    addBook(book) {
        this.books.push(book)
    }

    deleteBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }
}

const library = new Library()


// User interface
const addBookButton = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const form = document.getElementById("add-book")
const submitButton = document.querySelector("#submit");
const libraryGrid = document.querySelector(".library");

// Dialog interaction
addBookButton.addEventListener("click", () => {
    form.reset()
    dialog.showModal();
})

dialog.addEventListener("click", (event) => {
    if (event.target.id === "form") {
        dialog.close();
    }
})

// Create book
submitButton.addEventListener("click", (event) => {
    if (form.checkValidity()) {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("is-read").checked;

        const book = new Book(title, author, pages, read);

        library.addBook(book);
        createBookCard(book);
    }
})

// Create card
function createBookCard(book) {
    const bookCard = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const buttons = document.createElement("div");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    bookCard.classList.add("book-card");
    title.classList.add("title")
    author.classList.add("author");
    pages.classList.add("pages");
    buttons.classList.add("buttons");
    readButton.classList.add("btn");
    removeButton.classList.add("btn" ,"remove");

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    removeButton.textContent = "Remove";

    if (book.read) {
        readButton.classList.add("read");
        readButton.textContent = "Read";
    }

    else {
        readButton.classList.add("not-read");
        readButton.textContent = "Not read"
    }

    buttons.appendChild(readButton);
    buttons.appendChild(removeButton);

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(buttons);

    bookCard.bookObject = library.books[library.books.length - 1];
    libraryGrid.appendChild(bookCard)
}

// Book manipulation
libraryGrid.addEventListener("click", (event) => {

    // Book removal
    if (event.target.className === "btn remove") {
        const bookCard = event.target.parentNode.parentNode;
        const bookCardObjectTitle = bookCard.bookObject.title;
        
        // Remove from front-end
        libraryGrid.removeChild(bookCard);

        library.deleteBook(bookCardObjectTitle)
    }

    // Modify read
    else if (event.target.className === "btn read") {
        const buttonRead = event.target;
        let bookCardObject= event.target.parentNode.parentNode.bookObject;

        buttonRead.classList.remove("read");
        buttonRead.classList.add("not-read");
        buttonRead.textContent = "Not Read";
        bookCardObject["isRead"] = false;
    }

    else if (event.target.className === "btn not-read") {
        const buttonNotRead = event.target;
        let bookCardObject = event.target.parentNode.parentNode.bookObject;

        buttonNotRead.classList.remove("not-read");
        buttonNotRead.classList.add("read");
        buttonNotRead.textContent = "Read";
        bookCardObject["isRead"] = true;
    }
})
