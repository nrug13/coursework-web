// Define an object named countries with language codes as keys and country names as values
const countries = {
  "en-GB": "English",
  "az-AZ": "Azerbaijani",
};
let fromText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
let exchagelcon = document.querySelector(".change");
let selectTag = document.querySelectorAll("select");
let translateBtn = document.querySelector("button");

// Loop through each selectTag element and its corresponding id(index)
selectTag.forEach((tag, id) => {
  // Loop through each country_code in the countries object
  for (const country_code in countries) {
    let selected = ""; // Initialize selected variable with an empty string
    // Check if id is 0 and country_code is "en-GB", or if id is not 0 and country_code is "az-AZ"
    if (
      (id == 0 && country_code == "en-GB") ||
      (id != 0 && country_code == "az-AZ")
    ) {
      selected = "selected"; // If the conditions are met, set selected to "selected"
    }
    // Create an option element with the selected attribute based on the selected variable and the corresponding country_code and country name from the countries object
    let option = `<option ${selected} value="${country_code}">${[
      country_code,
    ]}</option>`;
    // Insert the option element as HTML before the end of the tag element
    tag.insertAdjacentHTML("beforeend", option);
  }
});

// Add click event listener to translateBtn
translateBtn.addEventListener("click", async () => {
  // Get input text value and remove white spaces
  const text = fromText.value.trim();
  // Get selected translation from and to languages
  const translateFrom = selectTag[0].value;
  const translateTo = selectTag[1].value;
  // If input text is empty, return
  if (!text) {
    return;
  }
  // Construct API URL with input text and translation languages
  const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  // Fetch translation data from API using async/await
  const response = await fetch(apiUrl);
  const data = await response.json();
  // Set the translated text to toText input value
  toText.value = data.responseData.translatedText;
});
exchagelcon.addEventListener("click", function () {
  let temp;
  let from = document.querySelectorAll("option[selected]")[0];
  let to = document.querySelectorAll("option[selected]")[1];
  temp = to.value;
  temp = to.value;
  to.value = from.value;
  to.textContent = from.value;
  from.value = temp;
  from.textContent = temp;
});
function cleaner() {
  let textAreas = document.querySelectorAll("textarea");
  textAreas.forEach(function (area) {
    area.value = "";
  });
}
cleaner();
