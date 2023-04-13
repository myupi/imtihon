import { Api } from "./api.js";

let token = localStorage.getItem("token") || false;
let email = localStorage.getItem("email") || false;
let Name = document.querySelector(".name");
let tableBody = document.querySelector("tbody");
let template = document.querySelector("template");
let search = document.querySelector("#search");
let logOut = document.querySelector("#logOut");
let newStudent = document.querySelector("#newStudent");
let postSection = document.querySelector("#post");
let closeBtn = document.querySelector("#closeBtn");
let form = document.querySelector("form");

if (!token) {
}

logOut.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("../login.html");
});

Name.innerHTML = email;

async function GetUser() {
  let data = await Api.GET("users");
  renderUser(data, tableBody);
  search.addEventListener("input", async (e) => {
    let value = e.target.value.toLowerCase();
    let find = data.filter((user) => user.name.toLowerCase().includes(value));
    renderUser(find, tableBody);
  });
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let { name, username, email, zipcode, city, phone } = e.target.elements;
    console.log(
      name.value,
      username.value,
      email.value,
      zipcode.value,
      city.value,
      phone.value
    );
    let data = await Api.GET("users");
    let obj = {
      id: data.length + 1,
      name: name.value,
      username: username.value,
      email: email.value,
      address: {
        city: city.value,
        zipcode: zipcode.value,
      },
      phone: phone.value,
    };

    let result = await Api.POST("users", obj);
    console.log(result);

    let userCard = template.content.cloneNode(true);
    let tr = userCard.querySelector("tr");
    let Uname = tr.querySelector(".Uname");
    let id = tr.querySelector(".id");
    let zip = tr.querySelector(".zipcode");
    let userName = tr.querySelector(".username");
    let citi = tr.querySelector(".city");
    let tel = tr.querySelector(".tel");
    let mail = tr.querySelector(".mail");
    let deleted = tr.querySelector(".delete");

    Uname.textContent = obj.name;
    id.textContent = obj.id;
    zip.textContent = obj.address.zipcode;
    userName.textContent = obj.username;
    citi.textContent = obj.address.city;
    tel.href = `tel:${obj.phone}`;
    mail.href = `mailto:${obj.email}`;
    deleted.dataset.id = obj.id;

    deleted.addEventListener("click", async (e) => {
      let par = e.target.parentNode.parentNode;
      let tr = par.parentNode;
      await Api.DELETE(`${par.dataset.id}`);
      tr.removeChild(par);
      alert(`removed`);
    });

    tableBody.append(tr);

    postSection.style.transform = "translateX(100%)";
  });
}
GetUser();

function renderUser(arr, element) {
  element.innerHTML = null;
  arr.forEach((user) => {
    let userCard = template.content.cloneNode(true);
    let tr = userCard.querySelector("tr");
    let Uname = tr.querySelector(".Uname");
    let id = tr.querySelector(".id");
    let zipcode = tr.querySelector(".zipcode");
    let userName = tr.querySelector(".username");
    let city = tr.querySelector(".city");
    let tel = tr.querySelector(".tel");
    let mail = tr.querySelector(".mail");
    let deleted = tr.querySelector(".delete");

    Uname.textContent = user.name;
    id.textContent = user.id;
    zipcode.textContent = user.address.zipcode;
    userName.textContent = user.username;
    city.textContent = user.address.city;
    tel.href = `tel:${user.phone}`;
    mail.href = `mailto:${user.email}`;
    deleted.dataset.id = user.id;

    deleted.addEventListener("click", async (e) => {
      let par = e.target.parentNode.parentNode;
      let tr = par.parentNode;
      await Api.DELETE(`${par.dataset.id}`);
      tr.removeChild(par);
      alert(`removed`);
    });

    element.append(tr);
  });
}

newStudent.addEventListener("click", () => {
  postSection.style.transform = "translateX(0)";
});
closeBtn.addEventListener("click", () => {
  postSection.style.transform = "translateX(100%)";
});


