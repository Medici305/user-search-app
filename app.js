// Elements
const form = document.getElementById("myForm");
const searchInput = document.getElementById("searchInput");
const submitButton = document.querySelector(".submit");
let searchValue;

// Functions
const fetchData = async (search) => {
  const getData = await fetch(`https://api.github.com/users/${search}`);
  const response = await getData.json();
  //console.log(response);
  return response;
};

const getDate = (num) => {
  let seperate = num.split("-");
  [a, b, c] = seperate;
  const day = c.slice(0, 2);
  const completeDate = `${a}, ${b}, ${day}`;
  let date = new Date(completeDate);
  let longMonth = date.toLocaleString("en-us", { month: "short" });
  return `Joined ${day} ${longMonth} ${a}`;
};

const displayData = (data) => {
  console.log(data);
  const userName = document.querySelector(".username");
  const handle = document.querySelector(".handle");
  const joined = document.querySelector(".date-joined");
  const dp = document.querySelector(".profile-pic");
  const bio = document.querySelector(".bio");
  const repos = document.querySelector(".repos");
  const following = document.querySelector(".following");
  const followers = document.querySelector(".followers");
  const location = document.querySelector(".location");
  const twitter = document.querySelector(".twitter");
  const website = document.querySelector(".website");
  const company = document.querySelector(".company");
  dp.src = data.avatar_url;
  userName.innerHTML = data.name;
  handle.innerHTML = `@${data.login.toLowerCase()}`;
  const dateJoined = getDate(data.created_at);
  joined.innerHTML = dateJoined;
  repos.innerHTML = data.public_repos;
  following.innerHTML = data.following;
  followers.innerHTML = data.followers;
  location.innerHTML = data.location;
  twitter.innerHTML = data.twitter_username;
  website.innerHTML = data.url;
  company.innerHTML = data.company;
  bio.innerHTML = data.bio;
};

const retrieveData = async () => {
  const newValue = searchValue.split(" ").join("");
  searchInput.value = "";
  let returnedData = await fetchData(newValue);
  displayData(returnedData);
};

// Event handlers
form.addEventListener("submit", function (e) {
  e.preventDefault();
  retrieveData();
});

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  retreiveData();
});

searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value;
});
