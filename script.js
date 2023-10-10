//select the entry from form
let itemName = document.querySelector("#itemName");
let itemDate = document.querySelector("#itemDate");
let itemAmount = document.querySelector("#itemAmount");
let itemRemark = document.querySelector("#itemRemark");
let itemAdd = document.querySelector("#itemAdd");
let itemForm = document.querySelector("#itemForm");

//select where data will store
let itemStore = document.querySelector(".itemStore");

// create local Data base 
let data = [
    // {
    //     name: "Car insurence",
    //     amount : "1200",
    //     date : "10-10-2023",
    //     remark : "none"
    // },
    // {
    //     name: "Bike insurence",
    //     amount : "100",
    //     date : "10-10-2023",
    //     remark : "bike insurence "
    // }
]

if( localStorage.getItem("data") != null){ 
    data = JSON.parse(localStorage.getItem("data"))
}
else{
    localStorage.setItem("data", JSON.stringify(data));
}

data = JSON.parse(localStorage.getItem("data"))

enterToList(data);



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

    data.push(temp);
    itemStore.innerHTML = "";
    localStorage.setItem("data", JSON.stringify(data));

    //function to create div and enter the input data to itemList
    enterToList(data);

    //remove input values form the input 
    itemName.value = "";
    itemAmount.value = "";
    itemDate.value = "";
    itemRemark.value = "";

}

function enterToList(data){
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
    console.log(event.target.parentElement);
    event.target.parentElement.remove();
    console.log(tempName.innerText);
    console.log(tempAmount.innerText);
    console.log(tempDate.innerText);
    console.log(tempRemark.innerText);
    

    let tempData = data.filter( (item) => {
        console.log(item);
        return  item.name != tempName.innerText ;
    });
    console.log(tempData);
    data = tempData;
    localStorage.setItem("data", JSON.stringify(tempData));
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

