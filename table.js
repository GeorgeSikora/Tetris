

function pickScoreToTable(result) {

  let output = [];
  let myScoreWritten = false;
  console.log(result.length);

  for (let i = 0; i < result.length; i++) {

    append(output, tableScore[i]);
    let score = split(tableScore[i], ':')[1];
    console.log(i, score);


    if (score <= field.score && !myScoreWritten) {
      console.log(i, field.score);
      append(output, "myname" + ":" + field.score);

      myScoreWritten = true;
    }
  }
  
}
