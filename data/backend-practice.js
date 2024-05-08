const xhr = new XMLHttpRequest();
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
// console.log("hi");
xhr.open("GET", "www.themealdb.com/api/json/v1/1/random.php");
xhr.send();
