let emailDisplay = document.getElementById("email-display");
let submitButton = document.getElementById("submit-button");
const nameInput = document.getElementById("name-input");

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

// ------------------------------

submitButton.addEventListener("click", async function () {
  submitButton.innerText = "Loading...";
  try {
    const name = nameInput.value;
    const response = await fetchAPI(name);
    emailDisplay.innerText = "Success";
    // do something with the response
  } catch (error) {
    submitButton.innerText = "Error";
    console.error(error);
  }
});
