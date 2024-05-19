const rubFirst = document.querySelector(".rub-first");
const usdFirst = document.querySelector(".usd-first");
const eurFirst = document.querySelector(".eur-first");
const gpbFirst = document.querySelector(".gbp-first");
const rubSecond = document.querySelector(".rub-second");
const usdSecond = document.querySelector(".usd-second");
const eurSecond = document.querySelector(".eur-second");
const gbpSecond = document.querySelector(".gbp-second");
const leftInput = document.querySelector(".left-input");
const rightInput = document.querySelector(".right-input");
const leftAllExchangeDivs = document.querySelectorAll(
  ".left-select-exchange-div div"
);
const rightAllExchangeDivs = document.querySelectorAll(
  ".right-select-exchange-div div"
);
const leftFoot = document.querySelector(".left-foot-p");
let leftValue = "RUB";
let rightValue = "USD";

rubFirst.style.backgroundColor = "#833ae0";
rubFirst.style.color = "white";
usdSecond.style.backgroundColor = "#833ae0";
usdSecond.style.color = "white";
rubFirst.click();
usdSecond.click();

// // left divs event
leftInput.addEventListener("click", () => {
  leftAllExchangeDivs.forEach((exchangeValue) => {
    exchangeValue.addEventListener("click", () => {
      leftInput.dispatchEvent(new Event("input"));
    });
  });
  rightAllExchangeDivs.forEach((exchangeValue) => {
    exchangeValue.addEventListener("click", () => {
      leftInput.dispatchEvent(new Event("input"));
    });
  });
});
// // right divs event
rightInput.addEventListener("click", () => {
  leftAllExchangeDivs.forEach((exchangeValue) => {
    exchangeValue.addEventListener("click", () => {
      rightInput.dispatchEvent(new Event("input"));
    });
  });
  rightAllExchangeDivs.forEach((exchangeValue) => {
    exchangeValue.addEventListener("click", () => {
      rightInput.dispatchEvent(new Event("input"));
    });
  });
});

leftAllExchangeDivs.forEach((exchangeValue) => {
  exchangeValue.addEventListener("click", () => {
    leftValue = exchangeValue.innerText;
    leftAllExchangeDivs.forEach((div) => {
      div.style.backgroundColor = "";
      div.style.color = "";
    });

    exchangeValue.style.backgroundColor = "#833ae0";
    exchangeValue.style.color = "white";
    fetch(
      `https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/${leftValue}`
    )
      .then((res) => res.json())
      .then((res) => {
        let conversionRateUsd = res.conversion_rates.USD;
        let conversionRateEur = res.conversion_rates.EUR;
        let conversionRateGbp = res.conversion_rates.GBP;
        if (leftValue == "RUB") {
          leftFoot.innerText = `1 ${leftValue} = ${conversionRateUsd} USD`;
        } else if (leftValue == "USD") {
          leftFoot.innerText = `1 ${leftValue} = ${1 / conversionRateUsd} RUB`;
        } else if (leftValue == "EUR") {
          leftFoot.innerText = `1 ${leftValue} = ${conversionRateEur} EUR`;
        } else if (leftValue == "GBP") {
          leftFoot.innerText = `1 ${leftValue} = ${conversionRateGbp} GBP`;
        }
      })
      .catch((error) =>
        console.error("Error fetching conversion rate:", error)
      );
  });
});

rightAllExchangeDivs.forEach((exchangeValue) => {
  exchangeValue.addEventListener("click", () => {
    rightValue = exchangeValue.innerText;
    rightAllExchangeDivs.forEach((div) => {
      div.style.backgroundColor = "";
      div.style.color = "";
    });

    exchangeValue.style.backgroundColor = "#833ae0";
    exchangeValue.style.color = "white";
  });
});

leftInput.addEventListener("input", () => {
  let leftInputNumber = parseFloat(leftInput.value);
  let rightInputNumber = parseFloat(rightInput.value);
  leftInput.value = leftInput.value.replace(/,/g, ".");
  leftInput.value = leftInput.value.replace(/[^0-9\.]/g, "");
  const inputValueNumber = parseFloat(leftInput.value);

  if (!isNaN(inputValueNumber)) {
    fetch(
      "https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/RUB"
    )
      .then((res) => res.json())
      .then((res) => {
        let conversionRateUsd = res.conversion_rates.USD;
        let conversionRateEur = res.conversion_rates.EUR;
        let conversionRateGbp = res.conversion_rates.GBP;

        if (leftValue == "RUB" && rightValue == "USD") {
          leftFoot.innerText = `1RUB = ${res.conversion_rates.USD}USD`;
        } else if (leftValue == "RUB" && rightValue == "EUR") {
          leftFoot.innerText = `1RUB = ${res.conversion_rates.EUR}EUR`;
        } else if (leftValue == "RUB" && rightValue == "GBP") {
          leftFoot.innerText = `1RUB = ${res.conversion_rates.GBP}GBP`;
        }
        if (leftValue == "RUB" && rightValue == "USD") {
          rightInput.value = leftInputNumber * conversionRateUsd;

          console.log("USD Conversion Applied");
        } else if (leftValue == "RUB" && rightValue == "EUR") {
          rightInput.value = leftInputNumber * conversionRateEur;

          console.log("EUR Conversion Applied");
        } else if (leftValue == "RUB" && rightValue == "GBP") {
          rightInput.value = leftInputNumber * conversionRateGbp;

          console.log("GBP Conversion Applied");
        } else if (leftValue == "RUB" && rightValue == "RUB") {
          rightInput.value = leftInput.value;
        }
      });
  } else {
    rightInput.value = "";
  }
  fetch(
    "https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/USD"
  )
    .then((res) => res.json())
    .then((res) => {
      let conversionRateRub = res.conversion_rates.RUB;
      let conversionRateEur = res.conversion_rates.EUR;
      let conversionRateGbp = res.conversion_rates.GBP;

      if (leftValue == "USD" && rightValue == "RUB") {
        leftFoot.innerText = `1USD = ${res.conversion_rates.RUB}RUB`;
      } else if (leftValue == "USD" && rightValue == "EUR") {
        leftFoot.innerText = `1USD = ${res.conversion_rates.EUR}EUR`;
      } else if (leftValue == "USD" && rightValue == "GBP") {
        leftFoot.innerText = `1USD = ${res.conversion_rates.GBP}GBP`;
      }

      if (leftValue == "USD" && rightValue == "RUB") {
        rightInput.value = leftInputNumber * conversionRateRub;

        console.log("USD Conversion Applied");
      } else if (leftValue == "USD" && rightValue == "EUR") {
        rightInput.value = leftInputNumber * conversionRateEur;
        console.log("EUR Conversion Applied");
      } else if (leftValue == "USD" && rightValue == "GBP") {
        rightInput.value = leftInputNumber * conversionRateGbp;
        console.log("GBP Conversion Applied");
      } else if (leftValue == "USD" && rightValue == "USD") {
        rightInput.value = leftInput.value;
      }
    });
  fetch(
    "https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/EUR"
  )
    .then((res) => res.json())
    .then((res) => {
      let conversionRateRub = res.conversion_rates.RUB;
      let conversionRateUsd = res.conversion_rates.USD;
      let conversionRateGbp = res.conversion_rates.GBP;

      if (leftValue == "EUR" && rightValue == "RUB") {
        leftFoot.innerText = `1EUR = ${res.conversion_rates.RUB}RUB`;
      } else if (leftValue == "EUR" && rightValue == "USD") {
        leftFoot.innerText = `1EUR = ${res.conversion_rates.USD}USD`;
      } else if (leftValue == "EUR" && rightValue == "GBP") {
        leftFoot.innerText = `1EUR = ${res.conversion_rates.GBP}GBP`;
      }

      if (leftValue == "EUR" && rightValue == "RUB") {
        rightInput.value = leftInputNumber * conversionRateRub;
        console.log("USD Conversion Applied");
      } else if (leftValue == "EUR" && rightValue == "USD") {
        rightInput.value = leftInputNumber * conversionRateUsd;
        console.log("EUR Conversion Applied");
      } else if (leftValue == "EUR" && rightValue == "GBP") {
        rightInput.value = leftInputNumber * conversionRateGbp;
        console.log("GBP Conversion Applied");
      } else if (leftValue == "EUR" && rightValue == "EUR") {
        rightInput.value = leftInput.value;
      }
    });
  fetch(
    "https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/GBP"
  )
    .then((res) => res.json())
    .then((res) => {
      let conversionRateRub = res.conversion_rates.RUB;
      let conversionRateUsd = res.conversion_rates.USD;
      let conversionRateEur = res.conversion_rates.EUR;
      if (leftValue == "GBP" && rightValue == "RUB") {
        leftFoot.innerText = `1GBP = ${res.conversion_rates.RUB}RUB`;
      } else if (leftValue == "GBP" && rightValue == "USD") {
        leftFoot.innerText = `1GBP = ${res.conversion_rates.USD}USD`;
      } else if (leftValue == "GBP" && rightValue == "EUR") {
        leftFoot.innerText = `1GBP = ${res.conversion_rates.EUR}EUR`;
      }

      if (leftValue == "GBP" && rightValue == "RUB") {
        rightInput.value = leftInputNumber * conversionRateRub;
        console.log("USD Conversion Applied");
      } else if (leftValue == "GBP" && rightValue == "USD") {
        rightInput.value = leftInputNumber * conversionRateUsd;
        console.log("EUR Conversion Applied");
      } else if (leftValue == "GBP" && rightValue == "EUR") {
        rightInput.value = leftInputNumber * conversionRateEur;
        console.log("GBP Conversion Applied");
      } else if (leftValue == "GBP" && rightValue == "GBP") {
        rightInput.value = leftInput.value;
      }
    });
});
// api key : afd60b8ca496287edea18b74
// second api key : 0cbc4c2ca79681c30a5f971f

// RIGHT PART
rightInput.addEventListener("input", () => {
  let leftInputNumber = parseFloat(leftInput.value);
  let rightInputNumber = parseFloat(rightInput.value);
  leftInput.value = leftInput.value.replace(/,/g, ".");
  leftInput.value = leftInput.value.replace(/[^0-9\.]/g, "");
  const inputValueNumber = parseFloat(rightInput.value);
  if (!isNaN(inputValueNumber)) {
    fetch(
      "https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/RUB"
    )
      .then((res) => res.json())
      .then((res) => {
        let conversionRateUsd = res.conversion_rates.USD;
        let conversionRateEur = res.conversion_rates.EUR;
        let conversionRateGbp = res.conversion_rates.GBP;

        if (leftValue == "RUB" && rightValue == "USD") {
          leftInput.value = rightInputNumber * conversionRateUsd;
          console.log("USD Conversion Applied");
        } else if (leftValue == "RUB" && rightValue == "EUR") {
          leftInput.value = rightInputNumber * conversionRateEur;
          console.log("EUR Conversion Applied");
        } else if (leftValue == "RUB" && rightValue == "GBP") {
          leftInput.value = rightInputNumber * conversionRateGbp;
          console.log("GBP Conversion Applied");
        } else if (leftValue == "RUB" && rightValue == "RUB") {
          leftInput.value = rightInput.value;
        }
      });
  } else {
    rightInput.value = "";
  }
  fetch(
    "https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/USD"
  )
    .then((res) => res.json())
    .then((res) => {
      let conversionRateRub = res.conversion_rates.RUB;
      let conversionRateEur = res.conversion_rates.EUR;
      let conversionRateGbp = res.conversion_rates.GBP;
      if (leftValue == "USD" && rightValue == "RUB") {
        leftInput.value = rightInputNumber * conversionRateRub;

        console.log("USD Conversion Applied");
      } else if (leftValue == "USD" && rightValue == "EUR") {
        leftInput.value = rightInputNumber * conversionRateEur;
        console.log("EUR Conversion Applied");
      } else if (leftValue == "USD" && rightValue == "GBP") {
        leftInput.value = rightInputNumber * conversionRateGbp;
        console.log("GBP Conversion Applied");
      } else if (leftValue == "USD" && rightValue == "USD") {
        leftInput.value = rightInput.value;
      }
    });
  fetch(
    "https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/EUR"
  )
    .then((res) => res.json())
    .then((res) => {
      let conversionRateRub = res.conversion_rates.RUB;
      let conversionRateUsd = res.conversion_rates.USD;
      let conversionRateGbp = res.conversion_rates.GBP;
      if (leftValue == "EUR" && rightValue == "RUB") {
        leftInput.value = rightInputNumber / conversionRateRub;
        console.log("USD Conversion Applied");
      } else if (leftValue == "EUR" && rightValue == "USD") {
        leftInput.value = rightInputNumber / conversionRateUsd;
        console.log("EUR Conversion Applied");
      } else if (leftValue == "EUR" && rightValue == "GBP") {
        leftInput.value = rightInputNumber / conversionRateGbp;
        console.log("GBP Conversion Applied");
      } else if (leftValue == "EUR" && rightValue == "EUR") {
        leftInput.value = rightInput.value;
      }
    });
  fetch(
    "https://v6.exchangerate-api.com/v6/0cbc4c2ca79681c30a5f971f/latest/GBP"
  )
    .then((res) => res.json())
    .then((res) => {
      let conversionRateRub = res.conversion_rates.RUB;
      let conversionRateUsd = res.conversion_rates.USD;
      let conversionRateEur = res.conversion_rates.EUR;
      if (leftValue == "GBP" && rightValue == "RUB") {
        leftInput.value = rightInputNumber / conversionRateRub;
        console.log("USD Conversion Applied");
      } else if (leftValue == "GBP" && rightValue == "USD") {
        leftInput.value = rightInputNumber / conversionRateUsd;
        console.log("EUR Conversion Applied");
      } else if (leftValue == "GBP" && rightValue == "EUR") {
        leftInput.value = rightInputNumber / conversionRateEur;
        console.log("GBP Conversion Applied");
      } else if (leftValue == "GBP" && rightValue == "GBP") {
        leftInput.value = rightInput.value;
      }
    });
});
