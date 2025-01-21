

// Define a dictionary for agent-password pairs
const agentPasswords = {
    "Aditya": "adi23tya", // Jett password
    "Nand": "na29nd", // Phoenix password
    "Amita": "ami18ta", // Sage password
    "Aishwarya": "aish16ya", // Reyna password
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the form from submitting and reloading the page

    const agent = document.getElementById("agent").value;
    const password = document.getElementById("password").value;

    console.log(`Agent: ${agent}, Password: ${password}`); // Debugging

    // Check if the agent and password are valid
    if (!agent || !password) {
        alert("Please select an agent and enter a password.");
        return;
    }

    // Compare the entered password with the stored password
    if (agentPasswords[agent] === password) {
        // Store the logged-in agent's name in sessionStorage
        sessionStorage.setItem('loggedInAgent', agent);

        alert(`Successfully logged in as ${agent}! Redirecting to chatroom...`);

        // Redirect to the chatroom (you can change the URL as needed)
        window.location.href = "chatroom.html"; // replace with the actual chatroom URL
    } else {
        alert("Wrong password. Please try again.");
    }
});
