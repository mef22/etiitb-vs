const critMap = {
  "crit-1": criterionScore1,
  "crit-2": criterionScore2,
  "crit-3": criterionScore3,
  "crit-4": criterionScore4,
  "crit-5": criterionScore5,
  "crit-6": criterionScore6,
};

const critIndividualsMap = {
  "crit-1": ["indi-1", "indi-2"],
  "crit-2": ["indi-21", "indi-22"],
  "crit-3": ["indi-31", "indi-32"],
  "crit-4": ["indi-41"],
  "crit-5": ["indi-51"],
  "crit-6": ["indi-61"],
};

var moocName = "";

$ = function (id) {
  return document.getElementById(id);
};

var hide = function (id) {
  $(id).style.display = "none";
};

function editMoocName() {
  document.getElementById("mooc-id").removeAttribute("disabled");
}

function validateMooc(event) {
  event.preventDefault();
  var empt = document.forms["form1"]["mooc-name"].value;
  if (empt == "") {
    // alert("Please input a MOOC name");
    // return false;
    moocName = "";
  } else {
    // alert('Thanks, you can now proceed further');
    // return true;
    moocName = empt;
    document.getElementById("mooc-id").style.borderColor = "#ffe7d9";
    document.getElementById("mooc-id").setAttribute("disabled", "disabled");
    //document.getElementById('container').scrollTop = 20;
  }
}

function criterionScoreCalc(allInputs, resultId) {
  var total = 0;

  allInputs.forEach((id) => {
    const el = document.getElementById(id);

    if (el) {
      total += parseFloat(el.innerText) || 0;
    }
  });

  document.getElementById(resultId).innerText = (
    total / allInputs.length
  ).toFixed(2);

  criteriaAverage();
}

function criterionScore1() {
  criterionScoreCalc(critIndividualsMap["crit-1"], "crit-1");
}

function criterionScore2() {
  criterionScoreCalc(critIndividualsMap["crit-2"], "crit-2");
}

function criterionScore3() {
  criterionScoreCalc(critIndividualsMap["crit-3"], "crit-3");
}

function criterionScore4() {
  criterionScoreCalc(critIndividualsMap["crit-4"], "crit-4");
}

function criterionScore5() {
  criterionScoreCalc(critIndividualsMap["crit-5"], "crit-5");
}

function criterionScore6() {
  criterionScoreCalc(critIndividualsMap["crit-6"], "crit-6");
}

function refreshRadioButtons() {
  Array.from(
    document.querySelectorAll("input[type=radio]:checked"),
    (input) => (input.checked = false)
  ); //refresh is working, but gotta make the old values go away too.

  document.getElementById("indi-1").innerText = "";
  document.getElementById("indi-2").innerText = "";
  document.getElementById("crit-1").innerText = "";

  document.getElementById("indi-21").innerText = "";
  document.getElementById("indi-22").innerText = "";
  document.getElementById("crit-2").innerText = "";

  document.getElementById("indi-31").innerText = "";
  document.getElementById("indi-32").innerText = "";
  document.getElementById("crit-3").innerText = "";

  document.getElementById("indi-41").innerText = "";
  document.getElementById("crit-4").innerText = "";

  document.getElementById("indi-51").innerText = "";
  document.getElementById("crit-5").innerText = "";

  document.getElementById("indi-61").innerText = "";
  document.getElementById("crit-6").innerText = "";

  document.getElementById("critavg").innerText = "";
  moocName = "";
  //document.getElementById("mooc-id").value = "";
  document.getElementById("feedbackXt1").innerText = "";
}

// Criteria Average
function criteriaAverage() {
  var total = 0;

  const allCriteria = Object.keys(critMap);

  allCriteria.forEach((id) => {
    const critEl = document.getElementById(id);

    if (critEl) {
      total += parseFloat(critEl.innerText) || 0;
    }
  });

  document.getElementById("critavg").innerHTML = (
    total / allCriteria.length
  ).toFixed(2);

  //console.log(total / allCriteria.length);
  const feedbackAvg = total / allCriteria.length;

  let currentChecked = 0;
  let checkedTotal = 0;

  Object.keys(critIndividualsMap).forEach((critKey) => {
    const items = critIndividualsMap[critKey];

    checkedTotal += items.length;

    items.forEach((item) => {
      const elText = document.getElementById(item)?.innerText;

      if (elText !== "") {
        currentChecked += 1;
      }
    });
  });

  if (checkedTotal === currentChecked) {
    if (feedbackAvg <= 0.9) {
      document.getElementById("feedbackXt1").innerHTML =
        "Missing or Minimal: You have either missed the attempt to incorporate the learner-centric approach in the design of this dimension, or it is at a minimal level. You should reflect back on the pedagogy design for this dimension by going through individual indicators for different criteria.";
    } else if (feedbackAvg <= 1.4) {
      document.getElementById("feedbackXt1").innerHTML =
        "Inadequate: You have made an attempt to incorporate the learner-centric activities in the design of this dimension. However, it seems inadequate. Reflecting back on the individual indicators for different criteria of the dimension will help you in improving on the learner-centric pedagogy.";
    } else if (feedbackAvg <= 1.9) {
      document.getElementById("feedbackXt1").innerHTML =
        "Towards adequate: You are on the path to make an adequate attempt to incorporate the learner-centric activities in the design of this dimension. Reflecting back on the individual indicators for different criteria of the dimension will help you in improving the pedagogy design.";
    } else if (feedbackAvg <= 2.4) {
      document.getElementById("feedbackXt1").innerHTML =
        "Adequate: You have made an adequate attempt to incorporate several aspects of the learner-centric approach in the design of this dimension. To improve further, you may reflect back on the design of this dimension by reviewing individual indicators to identify the ones which can still be addressed.";
    } else if (feedbackAvg <= 2.9) {
      document.getElementById("feedbackXt1").innerHTML =
        "Towards proficient: You have made a near proficient attempt to incorporate most aspects of the learner-centric approach in the design of this dimension. To improve further, you may still review individual indicators in this dimension to map the ones which have been missed, and reflect on incorporating those in your future attempt.";
    } else if (feedbackAvg <= 3) {
      document.getElementById("feedbackXt1").innerHTML =
        "Proficient: You have made a proficient attempt to incorporate the learner-centric activities in the design of this dimension. You have successfully implemented all the listed criteria in your design.";
    }
  } else {
    document.getElementById("feedbackXt1").innerHTML = "";
  }
}

function handleInputClick(event, value, scoreId, critId) {
  if (moocName == "") {
    event?.preventDefault && event.preventDefault();
    event?.stopPropogation && event.stopPropogation();

    document.getElementById("popup2").style.display = "block";
    document.documentElement.scrollTop = 0;
    document.getElementById("mooc-id").style.borderColor = "red";
    return;
  }

  document.getElementById(scoreId).innerText = value;

  const critFunction = critMap[critId];

  if (critFunction) critFunction();
}
