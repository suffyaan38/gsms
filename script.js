// let itemName = document.getElementById('name');
// let description = document.getElementById('description');
// let quantity = document.getElementById('quantity');
// let ul = document.getElementById('itemList');
// let submit = document.getElementById('submit');

// function onSubmit(e) {
//     e.preventDefault();
//     let obj = {
//         "itemName": itemName.value,
//         "description": description.value,
//         "quantity": quantity.value
//     };

//     axios.post(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms`, obj)
//         .then((res) => {
//             console.log(res);
//             const id=res.data_id;
//             localStorage.setItem('itemId', id);
//             addToList(obj,id );
//         })
//         .catch((err) => {
//             document.body.innerHTML += "<h4>Something went wrong</h4>";
//             console.log(err);
//         });
// }

// window.addEventListener("DOMContentLoaded", () => {
//     axios.get(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms`)
//         .then((res) => {
//             for (let i = 0; i < res.data.length; i++) {
//                 addToList(res.data[i]);
//             }
//         })
//         .catch((err) => {
//             document.body.innerHTML += "<h4>Something went wrong</h4>";
//             console.log(err);
//         });
// });

// function onBuy1(e) {
//     if (e.target.classList.contains('buy1')) {
//         let li = e.target.parentElement;
//         let id = li.dataset.id;
//         console.log(id)
//         axios.get(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms/${id}`)
//             .then((res) => {
//                 let data = res.data;
//                 let newObj = {
//                     "itemName": data.itemName,
//                     "description": data.description,
//                     "quantity": (data.quantity - 1)
//                 };
//                 axios.delete(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms/${id}`)
//                     .then((res) => {
//                         ul.removeChild(li);
//                         console.log(res);
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     });
//                 axios.post(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms`, newObj)
//                     .then((res) => {
//                         console.log(res);
//                         addToList(newObj, res.data._id)
//                     })
//                     .catch((err) => {
//                         console.log(err);
//                     });
//                 console.log(res);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// }

// function addToList(obj,id) {
//     let li = document.createElement('li');
//     let text = document.createTextNode(`Item name: ${obj.itemName}  Description: ${obj.description}  Quantity: ${obj.quantity} `);

//     li.dataset.id = localStorage.getItem('itemId');; 

//     let buy1 = document.createElement('input');
//     buy1.type = 'submit';
//     buy1.className = 'buy1';
//     buy1.value = 'BUY 1';

//     let buy2 = document.createElement('input');
//     buy2.type = 'submit';
//     buy2.className = 'buy2';
//     buy2.value = 'BUY 2';

//     let buy3 = document.createElement('input');
//     buy3.type = 'submit';
//     buy3.className = 'buy3';
//     buy3.value = 'BUY 3';

//     li.appendChild(text);
//     li.appendChild(buy1);
//     li.appendChild(buy2);
//     li.appendChild(buy3);
//     ul.appendChild(li);
// }

// submit.addEventListener('click', onSubmit);
// ul.addEventListener('click', onBuy1);
// // ul.addEventListener('click', onBuy2);
// // ul.addEventListener('click', onBuy3);

let itemName = document.getElementById('name');
let description = document.getElementById('description');
let quantity = document.getElementById('quantity');
let ul = document.getElementById('itemList');
let submit = document.getElementById('submit');

function onSubmit(e) {
    e.preventDefault();
    let obj = {
        "itemName": itemName.value,
        "description": description.value,
        "quantity": parseInt(quantity.value) // Parse quantity as an integer
    };

    axios.post(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms`, obj)
        .then((res) => {
            console.log(res);
            const id = res.data._id; // Use _id instead of data_id
            localStorage.setItem('itemId', id);
            addToList(obj, id);
        })
        .catch((err) => {
            document.body.innerHTML += "<h4>Something went wrong</h4>";
            console.error(err);
        });

    // Clear input fields after submission
    itemName.value = '';
    description.value = '';
    quantity.value = '';
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms`)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                addToList(res.data[i], res.data[i]._id); // Pass the item ID
            }
        })
        .catch((err) => {
            document.body.innerHTML += "<h4>Something went wrong</h4>";
            console.error(err);
        });
});

function onBuy1(e) {
    if (e.target.classList.contains('buy1')) {
        let li = e.target.parentElement;
        let id = li.dataset.id;
        axios.get(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms/${id}`)
            .then((res) => {
                let data = res.data;
                if (data.quantity > 0) { // Ensure quantity is greater than 0 before updating
                    let newObj = {
                        "itemName": data.itemName,
                        "description": data.description,
                        "quantity": data.quantity - 1
                    };
                    axios.put(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms/${id}`, newObj)
                        .then((res) => {
                            ul.removeChild(li);
                            console.log(res);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    addToList(newObj, id); // Add the updated item back to the list
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
function onBuy2(e) {
    if (e.target.classList.contains('buy2')) {
        let li = e.target.parentElement;
        let id = li.dataset.id;
        axios.get(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms/${id}`)
            .then((res) => {
                let data = res.data;
                if (data.quantity > 0) { // Ensure quantity is greater than 0 before updating
                    let newObj = {
                        "itemName": data.itemName,
                        "description": data.description,
                        "quantity": data.quantity - 2
                    };
                    axios.put(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms/${id}`, newObj)
                        .then((res) => {
                            ul.removeChild(li);
                            console.log(res);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    addToList(newObj, id); // Add the updated item back to the list
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
function onBuy3(e) {
    if (e.target.classList.contains('buy3')) {
        let li = e.target.parentElement;
        let id = li.dataset.id;
        axios.get(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms/${id}`)
            .then((res) => {
                let data = res.data;
                if (data.quantity > 0) { // Ensure quantity is greater than 0 before updating
                    let newObj = {
                        "itemName": data.itemName,
                        "description": data.description,
                        "quantity": data.quantity - 3
                    };
                    axios.put(`https://crudcrud.com/api/0111d5b7f7a84c81a19cd7c05dc23e9f/gsms/${id}`, newObj)
                        .then((res) => {
                            ul.removeChild(li);
                            console.log(res);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    addToList(newObj, id); // Add the updated item back to the list
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

function addToList(obj, id) {
    let li = document.createElement('li');
    let text = document.createTextNode(`Item name: ${obj.itemName}  Description: ${obj.description}  Quantity: ${obj.quantity}`);

    li.dataset.id = id; // Use the provided ID

    let buy1 = document.createElement('input');
    buy1.type = 'button';
    buy1.className = 'buy1';
    buy1.value = 'BUY 1';
    let buy2 = document.createElement('input');
    buy2.type = 'button';
    buy2.className = 'buy2';
    buy2.value = 'BUY 2';
    let buy3 = document.createElement('input');
    buy3.type = 'button';
    buy3.className = 'buy3';
    buy3.value = 'BUY 3';

    li.appendChild(text);
    li.appendChild(buy1);
    li.appendChild(buy2);
    li.appendChild(buy3);
    ul.appendChild(li);
}

submit.addEventListener('click', onSubmit);
ul.addEventListener('click', onBuy1);
ul.addEventListener('click', onBuy2);
ul.addEventListener('click', onBuy3);
