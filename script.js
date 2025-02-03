const agentPasswords = {
    "🛠️Aditya Soni": "adi23tya", // Jett password
    "Nand": "na29nd", // Phoenix password
    "Amita": "ami18ta", // Sage password
    "Aishwarya": "aish16ya", // Reyna password
    "Kamal": "kk151", // Reyna password
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
        localStorage.setItem('loggedInAgent', agent); // This stores the agent in localStorage

        alert(`Successfully logged in as ${agent}! Redirecting to chatroom...`);

        // Redirect to the chatroom (you can change the URL as needed)
        window.location.href = "chatroom.html"; // replace with the actual chatroom URL
    } else {
        alert("Wrong password. Please try again.");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    // Check if the user is already logged in by looking for loggedInAgent in localStorage
    const loggedInAgent = localStorage.getItem('loggedInAgent');
    console.log("Logged-in agent:", loggedInAgent);  // Debugging: Check what is stored

    if (loggedInAgent) {
        // If the agent is found in localStorage, redirect to the chatroom
        sessionStorage.setItem('loggedInAgent', loggedInAgent);  // Set the agent for the session
        window.location.href = "chatroom.html"; // Redirect to the chatroom
    }
});
