// HTML ELEMENTS 
const 
ammountInput = document.querySelector('.ammountInput'),
nameInput = document.querySelector('.nameInput'),
submitBtn = document.querySelector('.submitBtn'),
form = document.querySelector('.form'),
tbody= document.querySelector('tbody'),
addrem=document.querySelector('.addrem'),
yesBtn=document.querySelector('.gbtn'),
P=document.querySelector('.p'),
noBtn=document.querySelector('.rbtn'),
totalBtn=document.querySelector('.tbtn'),
totalOut=document.querySelector('.totalOutput'),img=document.querySelector('img');

// CONSTRUCTORS ES5 
function Mosque(name,ammount,date) {
  this.name=name
  this.date=date
  this.ammount=ammount
}
function UI(){

}
UI.prototype.addBookToList = function (record) {
  let td =document.createElement('tr')
  td.innerHTML=
  `<td>${record.name}</td>
  <td>${record.ammount}</td>
  <td>${record.date}</td>
  <td><i class="fas fa-remove"></i></td>
  `
  tbody.append(td);
}
function Store(){
  
}
Store.prototype.addRecordToLS = function(record){
  let records;
  if (localStorage.getItem('recs')===null) {
    records=[];
  }else{
    records= JSON.parse(localStorage.getItem('recs'))
  }
  records.push(record);
  localStorage.setItem('recs',JSON.stringify(records))
}
// THINGS
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let daet = new Date();
let Dates= `${days[daet.getDay()]}-${daet.getDate()}-${daet.getMonth()}-${daet.getFullYear()}`;
// EVENT LISTENERS 
form.addEventListener('submit',(e)=>{
  if(nameInput.value===''||ammountInput.value===''){
    addrem.textContent='Please fill in all fields';
    addrem.style.background='red';
    addrem.style.display=`block`;
    setTimeout(()=>{
      addrem.style.display=`none`;
    },1000);
  }
  else{
  let mosque = new Mosque(nameInput.value,ammountInput.value,Dates);
  let ui = new UI();
  ui.addBookToList(mosque)
  let stare = new Store();
  stare.addRecordToLS(mosque)
  console.log(localStorage.getItem('recs'));
  addrem.textContent='Record added and Saved';
  addrem.style.background=`green`;
  addrem.style.display=`block`;
  setTimeout(()=>{
    addrem.style.display=`none`;
  },1000);
  }
  nameInput.value='';
  ammountInput.value='';
  e.preventDefault();
})
document.body.addEventListener('click',(e)=>{
  if(e.target.className==='fas fa-remove'){
    P.style.transform='scale(1)';
    yesBtn.addEventListener('click',()=>{
    e.target.parentElement.parentElement.remove();
    addrem.textContent='Record removed';
    addrem.style.display =`block`;
    addrem.style.background=`red`;
    setTimeout(()=>{
      addrem.style.display=`none`;
    },1000)
    removeFromLS(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    P.style.transform=`scale(0)`;
    })
    noBtn.addEventListener('click',()=>{
      P.style.transform=`scale(0)`;
    })
  }
})
document.addEventListener('DOMContentLoaded',()=>{
  let records;
  if (localStorage.getItem('recs')===null) {
    records=[];
  }else{
    records= JSON.parse(localStorage.getItem('recs'))
  }
  records.forEach((record)=>{
    let td =document.createElement('tr')
  td.innerHTML=
  `<td>${record.name}</td>
  <td>${record.ammount}</td>
  <td>${record.date}</td>
  <td><i class="fas fa-remove"></i></td>
  `
  tbody.append(td);
  })
  localStorage.setItem('recs',JSON.stringify(records))
})
totalBtn.addEventListener('click',()=>{
  img.style.display='block';
  setTimeout(()=>{
    img.style.display='none';
  },2000)
  let pops =JSON.parse(localStorage.getItem('recs'))
  let sum = 0;
  for(i=0;i<pops.length;i++){
    console.log(pops[i].ammount);
    sum+=Number(pops[i].ammount)
    console.log(sum);
  }
  totalOut.style.display='none';
  setTimeout(()=>{
      totalOut.style.display='block';
      totalOut.innerText=`Total = ${sum} Naira`
  },2100)
})
// FUNCTION 
function removeFromLS(rem){
  let records;
  if (localStorage.getItem('recs')===null) {
    records=[];
  }else{
    records= JSON.parse(localStorage.getItem('recs'))
  } 
  records.forEach((record,index)=>{
    if(record.ammount===rem){
      records.splice(index,1)
    }
  })
  localStorage.setItem('recs',JSON.stringify(records))

}
