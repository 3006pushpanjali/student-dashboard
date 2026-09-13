const button = document.getElementById("continueBtn");

button.addEventListener("click", function () {
    // 1. Capture the input values
    const name = document.getElementById("name").value;
    const college = document.getElementById("college").value;
    const branch = document.getElementById("branch").value;
    const semester = document.getElementById("semester").value;
    const goal = document.getElementById("goal").value;

    // 2. Package the data into an object and save it to the browser's memory
    const userProfile = {
        name: name,
        college: college,
        branch: branch,
        semester: semester,
        goal: goal
    };
    
    // Convert object to text format so localStorage can read it
    localStorage.setItem("studentProfile", JSON.stringify(userProfile));

    // 3. THIS line actually redirects the user to the dashboard
    window.location.href = "dashboard.html";
});