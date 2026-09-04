const button = document.getElementById("continueBtn");

button.addEventListener("click", function () {

    const name = document.getElementById("name").value;
    const college=document.getElementById("college").value;
    const branch=document.getElementById("branch").value;
    const semester=document.getElementById("semester").value;
    const goal=document.getElementById("goal").value;

   alert(
"Name: " + name +
"\nCollege: " + college +
"\nBranch: " + branch +
"\nSemester: " + semester +
"\nGoal: " + goal
);

});