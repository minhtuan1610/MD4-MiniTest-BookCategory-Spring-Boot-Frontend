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
    let book = {
        author: author,
        name: name,
        price: price,
        category: {id: parseInt(category_id)}
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(book),
        url: "http://localhost:8080/books",
        success: function () {
            alert("Book created successfully")
            // window.location = "/books";
        }
    })
    event.preventDefault();
}