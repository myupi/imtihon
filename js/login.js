let form = document.querySelector("form");

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  let { email, password } = evt.target.elements;
  let data = await fetch("https://reqres.in/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value.trim(),
      password: password.value.trim(),
    }),
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => error);
  
    if(data){
      localStorage.setItem("email", email.value.trim())
      localStorage.setItem("token", data.token);
      window.location.replace("../index.html")
    }
});
