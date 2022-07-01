var dayjs = require("dayjs");
const fs = require("fs");

const transformDate = function (data) {
  let students = data
  
  for (i = 0; i < students.length; i++) {
    if(dayjs(students[i].birth, 'YYYY-MM-DD').isValid())
      students[i].birth = dayjs(students[i].birth)
      .locale("fr")
      .format("dddd D MMMM YYYY");
  fs.writeFileSync("./Data/Students.json", JSON.stringify({'students':students}))
}

};

module.exports = {
  transformDate,
};