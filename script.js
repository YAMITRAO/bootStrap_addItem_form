//select the entry from form
let itemName = document.querySelector("#itemName");
let itemDate = document.querySelector("#itemDate");
let itemAmount = document.querySelector("#itemAmount");
let itemRemark = document.querySelector("#itemRemark");
let itemAdd = document.querySelector("#itemAdd");
let itemForm = document.querySelector("#itemForm");

//select where data will store
let itemStore = document.querySelector(".itemStore");

let dummy = [ {"_id":"652caf972e0fb203e853f17b","name":"Car insurence","amount":"1200","date":"10-10-2023","remark":"none"},{"_id":"652cb5c12e0fb203e853f180","name":"Bike Insu","amount":"100","date":"11-10-2023","remark":"This is bike insurance"},{"_id":"652cb6732e0fb203e853f181","name":"Home Insurance","amount":"1500","date":"2023-10-01","remark":"This is my home insurance"},{"_id":"652cb8a72e0fb203e853f183","name":"Books","amount":"10","date":"2-10-2023","remark":"Books for GATE"},{"_id":"652cb8d82e0fb203e853f186","name":"Laptop","amount":"1200","date":"2022-01-11","remark":"this is my macbook"},{"_id":"652cb9312e0fb203e853f187","name":"My bag","amount":"100","date":"2023-02-20","remark":"this is my american tourister"}]

// console.log(JSON.parse(JSON.stringify(dummy)));
// let data = JSON.parse(JSON.stringify(dummy));

let data ;
// enterToList(data);
getFromCloud();


function updateToCloud(val){
    axios.post("https://crudcrud.com/api/b63b82c51bfa40bdad3114e81a95e88e/myData", val)
    .then(res => {
        console.log(res);
        data;
        getFromCloud();
    })
    .catch(err => console.log(err));
}
function getFromCloud(){
   let x = axios.get("https://crudcrud.com/api/b63b82c51bfa40bdad3114e81a95e88e/myData")
    .then(res => {
        data;
        data=res.data;
        console.log(data);
        // console.log("res data is" , res.data[0]);
        enterToList(data);
         return res.data;
    })
    .catch(err => console.log(err));
}

function deleteFromCloud(id){
    let x = axios.delete(`https://crudcrud.com/api/b63b82c51bfa40bdad3114e81a95e88e/myData/${id}`)
    .then(res => {
        console.log(res);
        data;
        getFromCloud();
    })
    .catch(err => console.log(err));
}

// if( localStorage.getItem("data") != null){ 
//     data = JSON.parse(localStorage.getItem("data"));
  
// }
// else{
//     localStorage.setItem("data", JSON.stringify(data));
// }

// data = JSON.parse(localStorage.getItem("data"))
//add onSubmit at form 
itemForm.addEventListener('submit', onSubmit);

// get input value from user 
function onSubmit(event){
    event.preventDefault();

    let temp = {
        name:itemName.value,
        amount: itemAmount.value,
        date: itemDate.value,
        remark: itemRemark.value,
    }

    updateToCloud(temp);
    // data.push(temp);
    itemStore.innerHTML = "";
    // localStorage.setItem("data", JSON.stringify(data));

    //function to create div and enter the input data to itemList
    // enterToList(data);

    //remove input values form the input 
    itemName.value = "";
    itemAmount.value = "";
    itemDate.value = "";
    itemRemark.value = "";

}

function enterToList(data){
    console.log(data);
     //create a div >> h2 (for name) >> h3 (for date and amount) >> p (for description);
     for(let i = data.length-1; i >= 0 ; i--){
        
        let createDiv = document.createElement("div");
     let createH2 = document.createElement("h2");
     let createH3Date = document.createElement("h3"); 
     let createH3Amount = document.createElement("h3"); 
     let createP = document.createElement("p");
     let createDeleteBtn = document.createElement("button");
     let createEditBtn = document.createElement("button");
     
      //create id's and classes
      createDiv.className = "itemDiv  m-1 p-1 ps-3 d-inline ";
      createH2.className="itemNameH2 d-inline ps-0 ";
      createH3Amount.className = "itemAmountH3 d-inline  ps-4 ms"
      createH3Date.className = "itemDateH3 d-inline  ms-4"
      createP.className = "itemRemarkP";
      createDeleteBtn.className = "itemDeleteBtn btn btn-outline-danger ms-2";
      createDeleteBtn.addEventListener('click',onClick );
      createEditBtn.className = "btn btn-outline-primary ms-1"
      createEditBtn.addEventListener('click', onEdit);
      
      
 
     //enter value of input to these created elements
     createH2.innerText = data[i].name;
     createH3Amount.innerText = data[i].amount;
     createH3Date.innerText = data[i].date;
     createP.innerText = data[i].remark;
     createDeleteBtn.innerText = "delete";
     createEditBtn.innerText = "Edit"

     //append all create to created div element here
     createDiv.appendChild(createH2);
     createDiv.appendChild(createH3Amount);
     createDiv.appendChild(createH3Date);
     createDiv.appendChild(createP);
     createDiv.appendChild(createEditBtn);
     createDiv.appendChild(createDeleteBtn);
 
     //append createDiv to the main div of itemList
     itemStore.appendChild(createDiv);    

     }
}


// delete button onclick event
function onClick(event){
    let tempName = event.target.parentElement.querySelector(".itemNameH2");
    let tempAmount = event.target.parentElement.querySelector(".itemAmountH3");
    let tempDate = event.target.parentElement.querySelector(".itemDateH3");
    let tempRemark = event.target.parentElement.querySelector(".itemRemarkP");
    // console.log(event.target.parentElement);
    event.target.parentElement.remove();
    console.log(tempName.innerText);
    // console.log(tempAmount.innerText);
    // console.log(tempDate.innerText);
    // console.log(tempRemark.innerText);

    for(let i = 0; i< data.length; i++){
        console.log(data[i]);
        if(data[i].name == tempName.innerText && data[i].amount == tempAmount.innerText && data[i].remark == tempRemark.innerText && data[i].date == tempDate.innerText ){
            // console.log("value is found ", tempName.innerText);
            // console.log(data[i]._id);
            deleteFromCloud(data[i]._id);
            return;
        }
    }
    

    // let tempData = data.filter( (item) => {
    //     console.log(item);
    //     return  item.name != tempName.innerText ;
    // });
    // console.log(tempData);
    // data = tempData;
    // localStorage.setItem("data", JSON.stringify(tempData));
}


function onEdit(event){
    let item = event.target.parentElement;
    
        itemName.value = item.querySelector(".itemNameH2").innerText,
        itemAmount.value = item.querySelector(".itemAmountH3").innerText,
        itemDate.value = item.querySelector(".itemDateH3").innerText,
        itemRemark.value= item.querySelector(".itemRemarkP").innerText;

        // let tempData = data.filter( (item) => {
        //     console.log(item);
        //     return  item.name != itemName.innerText ;
        // });
        // console.log(tempData);
        // data = tempData;
        // localStorage.setItem("data", JSON.stringify(tempData));

        onClick(event);

}

