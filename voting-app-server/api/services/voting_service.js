const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

let votingService = {
  getVotingResults: function (reqParam, res) {
    let results = [];
    fs.createReadStream("files/results.csv")
      .pipe(
        csv({
          headers: ["City"],
          mapValues: ({ header, index, value }) => {
            value = value.replace(/['"\s]+/g, "");
            let row = {
              city: value.split(",")[0], 
              // "New York, 11014, DT, 17803, HC, 4923, JB, 2069, JFK" => [New York, 11014, DT, 17803, HC, 4923, JB, 2069, JFK] => [0]
              
              data: sortVotingResults(value.split(",")),
              //"New York, 11014, DT, 17803, HC, 4923, JB, 2069, JFK" => []
            };
            results.push(row);
            return value;
          },
        })
      )
      .on("data", (data) => {})
      .on("end", () => {

        res.status(200).json({
          message: "Successful",
          data: results,
        });
      });
  },
  
  saveVotingFile: function (reqParam, res) {
    if (reqParam.files) {
      const file = reqParam.files.file;
      const fileName = file.name;
      file.mv(
        `${path.basename(path.dirname(fileName))}/files/${fileName}`,
        (err) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              message: "Error while trying to upload file",
            });
          } else {
            res.status(200).json({
              message: "Uploaded successfully",
            });
          }
        }
      );
    } else {
      res.status(400).json({
        message: "There is no file",
      });
    }
  },
};

function sortVotingResults(data) {
  let results = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 2 != 0) {
      results.push({
        candidate: formatName(data[i + 1]) ,
        votes: isNaN(+data[i]) ? 'N/A' : data[i],
        percentage: calcPercentage(data[i], data),
        error: isNaN(+data[i])
      });
    }
  }
  return results;
}

function formatName(initials) {
  switch(initials) {
    case 'DT':
    return 'Donald Trump';
    break;
    case 'HC':
    return 'Hillary Clinton';
    break;
    case 'JB':
    return 'Joe Bidden';
    break;
    case 'JFK':
    return 'John F.Kennedy';
    break;
    case 'JR':
    return 'Jack Randall';
    break;
    default:
      return 'Invalid input of candidate name';
  }
}

function calcPercentage(candidateVotes, cityDataArray) {
  let totalCityVotes = 0;
  let percentage;
  for(let i = 0; i<cityDataArray.length; i++) {
    if (i % 2 != 0) {
      totalCityVotes = +totalCityVotes + +(cityDataArray[i])
    }
  }
  percentage = candidateVotes / totalCityVotes * 100;
  return  isNaN(+percentage) ? '' : percentage.toFixed(0);
}


module.exports = { votingService };
