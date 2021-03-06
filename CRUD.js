function displayCategory() {
    let content = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/category",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById("category").innerHTML = content;
        }
    })
}

function addBook() {
    let author = $(`#author`).val();
    let name = $(`#name`).val();
    let price = $(`#price`).val();
    let category_id = $(`#category`).val();
    let image = $(`#image`);
    let bookForm = new FormData();
    bookForm.append('author', author);
    bookForm.append('name', name);
    bookForm.append('price', price);
    bookForm.append('category', category_id);
    bookForm.append('image', image.prop('files')[0]); //lấy file ở vị trí thứ 0
    /*let book = {
        author: author,
        name: name,
        price: price,
        category: {id: parseInt(category_id)}
    };*/
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: bookForm,
        url: "http://localhost:8080/books",
        success: function () {
            alert("Book created successfully");
            listBooks();
        }
        /*headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(book),
        url: "http://localhost:8080/books",
        success: function () {
            alert("Book created successfully");
            listBooks();
        }*/
    })
    event.preventDefault();
}

function listBooks() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/",
        success: function (data) {
            let bookList = '<tr>\n' +
                '        <th>Author</th>\n' +
                '        <th>Name</th>\n' +
                '        <th>Price</th>\n' +
                '        <th>Category</th>\n' +
                '        <th>Image</th>\n' +
                '        <th>Action</th>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                bookList += getBook(data[i]);
            }
            document.getElementById("bookList").innerHTML = bookList;
        }
    })
}

function getBook(book) {
    let bookChoosen = `<tr><td>${book.author}</td>
                       <td>${book.name}</td>
                        <td>${book.price}</td>
                        <td>${book.category.name}</td>
                        <td><img src="${'http://localhost:8080/image/' + book.image}" width="100px"></td>
                        <td><a href="${book.id}" onclick="showBookForm(${book.id})">Edit</a>&nbsp;<a href="${book.id}" onclick="deleteBook(this)">Delete</a></td></tr>`;
    return bookChoosen;
}

function deleteBook(book) {
    event.preventDefault();
    let check = confirm("Are you sure?");
    if (check) {
        let bookID = book.getAttribute("href");
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/books/${bookID}`,
            success: function () {
                alert("Book deleted successfully")
                listBooks();
            }
        })
    }
}

function showBookForm(id) {
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/books/${id}`,
        success: function (data) {
            console.log(data);
            let content = `<h2>Update a book</h2>
    <form>
        <table>
            <tr>
                <th><label for="author1">Author:</label></th>
                <td><input id="author1" name="author1" type="text" value="${data.author}"></td>
            </tr>
            <tr>
                <th><label for="name1">Name:</label></th>
                <td><input id="name1" name="name1" type="text" value="${data.name}"></td>
            </tr>
            <tr>
                <th><label for="price1">Price:</label></th>
                <td><input id="price1" name="price1" type="number" value="${data.price}"></td>
            </tr>
            <tr>
                <th><label for="category1">Category:</label></th>
                <td><select id="category1" name="category1"></select></td>
            </tr>
            <tr>
                <th><label for="image1">Image:</label></th>
                <td><img src="${'http://localhost:8080/image/' + data.image}" width="100px"></td>
                <td><input id="image1" type="file"></td>
            </tr>
            <tr>
                <th>&nbsp;</th>
                <td><input onclick="editBook(${data.id})" type="button" value="Update book"></td>
            </tr>
        </table>
    </form>`;
            document.getElementById("editForm").innerHTML = content;
            displayCategory1();
        }
    });
}

function displayCategory1() {
    let content = "";
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/category",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById("category1").innerHTML = content;
        }
    })
}

function editBook(id) {
    let author = $(`#author1`).val();
    let name = $(`#name1`).val();
    let price = $(`#price1`).val();
    let category = $(`#category1`).val();
    let image = $(`#image1`);
    /*let bookEdit = {
        "author": author,
        "name": name,
        "price": price,
        "category": {"id": category}
    };*/
    let existBook = new FormData();
    existBook.append('author', author);
    existBook.append('name', name);
    existBook.append('price', price);
    existBook.append('category', category);
    let image1 = image.prop('files')[0];
    if (image1 === undefined) {
        let file = new File([""], "fileName.jpg");
        existBook.append('image', file);
    } else {
        existBook.append('image', image1);
    }
    $.ajax({
        /*headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(bookEdit),
        url: `http://localhost:8080/books/${id}`,
        success: function () {
            alert("Book updated successfully");
            listBooks();
        }*/
        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: existBook,
        url: `http://localhost:8080/books/${id}`,
        success: function () {
            alert("Book updated successfully");
            listBooks();
        }
    });
    event.preventDefault();
}

