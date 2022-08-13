const critMap = {
  "crit-1": criterionScore1,
  "crit-2": criterionScore2,
  'crit-3': criterionScore3,
  // 'crit-4': criterionScore4,
  // 'crit-5': criterionScore5,
  // 'crit-6': criterionScore6,
};

function criterionScoreCalc(allInputs, resultId) {
  var total = 0;

  allInputs.forEach((id) => {
    const el = document.getElementById(id);

    if (el) {
      total += parseInt(el.innerText, 10) || 0;
    }
  });

  document.getElementById(resultId).innerText = (
    total / allInputs.length
  ).toFixed(2);

  criteriaAverage();
}

function criterionScore1() {
  criterionScoreCalc(["indi-1"], "crit-1");
}

function criterionScore2() {
  criterionScoreCalc(["indi-21", "indi-22", "indi-23"], "crit-2");
}

function criterionScore3() {
  criterionScoreCalc(["indi-31"], "crit-3");
}

function criterionScore4() {
  criterionScoreCalc(["indi-41", "indi-42", "indi-43"], "crit-4");
}

function criterionScore5() {
  criterionScoreCalc(["indi-51", "indi-52", "indi-53"], "crit-5");
}

function criterionScore6() {
  criterionScoreCalc(["indi-61", "indi-62", "indi-63"], "crit-6");
}


// Criteria Average
function criteriaAverage() {
  var total = 0;

  const allCriteria = Object.keys(critMap);

  allCriteria.forEach((id) => {
    const critEl = document.getElementById(id);

    if (critEl) {
      total += parseInt(critEl.innerText, 10) || 0;
    }
  });

  document.getElementById("critavg").innerHTML = (
    total / allCriteria.length
  ).toFixed(2);

  //console.log(total / allCriteria.length);
  const feedbackAvg = total / allCriteria.length;
  console.log(feedbackAvg);

  if(feedbackAvg <= 0.9){
     document.getElementById("feedbackXt1").innerHTML = "Missing or Minimal: You have either missed the attempt to incorporate the learner-centric approach in the design of this dimension, or it is at a minimal level. You should reflect back on the pedagogy design for this dimension by going through individual indicators for different criteria.";
  }
  else if(feedbackAvg <= 1.5){
    document.getElementById("feedbackXt1").innerHTML = "Inadequate to towards adequate: You are on the path to make an appreciable attempt to incorporate the learner-centric activities in the design of this dimension. Reflecting back on the individual indicators for different criteria of the dimension will help you in improving on the learner-centric pedagogy.";
  }
  else if(feedbackAvg <= 2){
    document.getElementById("feedbackXt1").innerHTML = "Adequate to Appreciable: You have made an appreciable attempt to incorporate several aspects of the learner-centric approach in the design of this dimension. To improve further, you may reflect back on the design of this dimension by reviewing individual indicators to identify the ones which can still be addressed.";
  }
  else if(feedbackAvg <= 3){
    document.getElementById("feedbackXt1").innerHTML = "Distinguished: You have made a distinguished attempt to incorporate the learner-centric activities in the design of this dimension. You have successfully implemented most of the listed criteria in your design. If desired, you may still review individual indicators in this dimension to map the ones which may have been missed, and reflect on incorporating those in your future attempt.";
  }
}

function handleInputClick(value, scoreId, critId) {
  document.getElementById(scoreId).innerText = value;

  const critFunction = critMap[critId];

  if (critFunction) critFunction();
}
