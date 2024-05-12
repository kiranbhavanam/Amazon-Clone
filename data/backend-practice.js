const xhr = new XMLHttpRequest();
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
// console.log("hi");
xhr.open("GET", "https:supersimplebackend.dev");
xhr.send();
