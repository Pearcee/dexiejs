const db = new Dexie('NameApp')

db.version(1).stores({ names: '++id,name,age' })

db.names.bulkPut([
  { id: 1, name: "Josephine", age: 21 },
  { id: 2, name: "Per", age: 75 },
  { id: 3, name: "Simon", age: 5 },
  { id: 4, name: "Sara", age: 50, notIndexedProperty: 'foo' }
])


const appNav = document.getElementById('appNav')
const appHead = document.getElementById('appHead')
const appAdd = document.getElementById('appAdd')
const appTable = document.getElementById('appTable')
const appFoot = document.getElementById('appFoot')


appInput.onsubmit = async (event) => {
  event.preventDefault()
  const name = document.getElementById('nameInput').value
  const age = document.getElementById('ageInput').value
  await db.names.add({ name, age })
  await populateNewDiv()
  appInput.reset()
}

const populateNewDiv = async () => {
  const allItems = await db.names.reverse().toArray()
  appTable.innerHTML = allItems.map(item => `

  <tr>
    <td class="w3-col m10">${item.name}</td>
    <td class="w3-col m1 w3-right-align">${item.age}</td>
    <td class="w3-col m1 w3-button w3-center"  onclick="this.parentElement.style.display='none'">&times;</span></td>
  </tr>

  `).join('')
}

window.onload = populateNewDiv

var acc = document.getElementsByClassName("accordion");
var i;


// function openCity(evt, cityName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//       tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " active";
//   }


console.log("Its me")

// Used to toggle the menu on small screens when clicking on the menu button
// function menuFn() {
//   var x = document.getElementById("navDemo");
//   if (x.className.indexOf("w3-show") == -1) {
//     x.className += " w3-show";
//   } else {
//     x.className = x.className.replace(" w3-show", "");
//   }
// }

closeSidebar();
function openSidebar() {
  document.getElementById("mySidebar").style.display = "block";
}

function closeSidebar() {
  document.getElementById("mySidebar").style.display = "none";
}