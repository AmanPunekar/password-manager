function maskPass(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}

function copyText(txt) {
  // Attempt to write text to clipboard
  navigator.clipboard.writeText(txt).then(
    () => {
      //   alert("Copied the text:" + txt);
      document.getElementById("alert").style.display = "inline";
      setTimeout(() => {
        document.getElementById("alert").style.display = "none";
      }, 2000);
    },
    () => {
      alert("Unable to copy");
    }
  );
}

const deletePass = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert(`Successfully deleted ${website} password`);
  showPass();
};

//logic to fill table
const showPass = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data == null || JSON.parse(data).length == 0) {
    tb.innerHTML = "NO Data To Show";
  } else {
    tb.innerHTML = ` <tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
  </tr>`;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      str += ` <tr>
                <td>${element.website}<img onclick="copyText('${
        element.website
      }')" src="copy.png" alt="Copy Button" width="15" height="15"></td>
                <td>${element.username}<img onclick="copyText('${
        element.username
      }')" src="copy.png" alt="Copy Button" width="15" height="15"></td>
                <td>${maskPass(element.password)}<img onclick="copyText('${
        element.password
      }')" src="copy.png" alt="Copy Button" width="15" height="15"></td>
                <td><button class="btnsm" onclick="deletePass('${
                  element.website
                }')">Delete</button></td>
            </tr>`;
    }
    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};
showPass();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);

  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password Saved");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPass();
});
