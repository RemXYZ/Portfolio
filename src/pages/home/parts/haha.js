const url = "./src/pages/home/parts/post.php";
let data = {
    name:"valera",
    age:"23"
}
// let data = "ok=hah&lol=ok"
ajax({
    url,
    data,
    dataType:"text"
})
.then(resp =>{
    console.log(resp)
})
 
// let id_product = 321;
// let qty_product = 2; 
// // Вынес что бы облегчить чтение так же можно вынести и headers
// let data_body = "id_product=" + id_product + "&qty_product="+ qty_product;  
 
// fetch(url, { 
// 	method: "POST",
//     body: data_body,   
// 	headers:{"content-type": "application/x-www-form-urlencoded"} 
// 	})
   
// .then( (response) => {
//     if (response.status !== 200) {           
//         return Promise.reject();
//     }
//     console.log(response.status)
//     return response.text()
// })
// .then(i => console.log(i))
// .catch(() => console.log('ошибка')); 



// let id_product = 321;
// let qty_product = 2;

// let upload = {
//     "id_product": id_product,
//     "qty_product": qty_product
// };
// let data2 = new FormData();
// data2.append("json", JSON.stringify(upload));

// fetch(url,
//     {
//         method: "POST",
//         body: data2
//     })
//     .then(response => {
//         if (response.status !== 200) {
//             return Promise.reject();
//         }
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })
//     .catch((err) => console.log('ошибка',err)); 