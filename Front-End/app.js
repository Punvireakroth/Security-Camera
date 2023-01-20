let emailDisplay = document.getElementById("email-display");
let submitButton = document.getElementById("submit-button");
const nameInput = document.getElementById("name-input");

//hide data when page load

async function fetchAPI(name) {
  try {
    const response = await fetch("http://localhost:5000/api/product/getbill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: name }),
    });
    const data = await response.json();
    emailDisplay.innerHTML = `You should see the email: ${data.email}`;
  } catch (error) {
    console.error(error);
  }
}

// Create a logtime function
async function logTime() {
  try {
    const response = await fetch("http://localhost:5000/api/product/logtime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    console.log(`Time logged: ${data.time}`);
  } catch (error) {
    console.error(error);
  }
}

// ------------------------------

submitButton.addEventListener("click", async function () {
  submitButton.innerText = "Loading...";
  try {
    const name = nameInput.value;
    const response = await fetchAPI(name);
    logTime();
    emailDisplay.innerText = "Success";
    emailDisplay.display = "block";
    // do something with the response
  } catch (error) {
    submitButton.innerText = "Error";
    console.error(error);
  }
});

// query data
fetch("db.json")
  .then((response) => response.json())
  .then((jsonData) => {
    let container = document.getElementById("container");
    for (let i = 0; i < jsonData.length; i++) {
      let time = new Date(jsonData[i].time["$$date"]);
      let div = document.createElement("div");
      div.innerHTML = time;
      container.appendChild(div);
    }
  });
