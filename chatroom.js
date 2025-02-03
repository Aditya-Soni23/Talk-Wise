// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjpXhY4h36fsquzyAQnno-jVIQyxtwxmI",
    authDomain: "family-chat-3f2b2.firebaseapp.com",
    projectId: "family-chat-3f2b2",
    storageBucket: "family-chat-3f2b2.firebasestorage.app",
    messagingSenderId: "969473823343",
    appId: "1:969473823343:web:c2800511ec806260e9339a",
    measurementId: "G-R2Y8F480ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Save the agent's username in sessionStorage upon successful login
const loggedInAgent = sessionStorage.getItem('loggedInAgent'); // Fetch agent's name

if (loggedInAgent) {
    document.getElementById('agent-username').textContent = loggedInAgent;
}

// Send message when clicked
document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function formatTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Adjust hours for 12-hour format

    return `${hours}:${minutes} ${period}`;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        const timestamp = Date.now();

        // Save message to Firebase Realtime Database
        const messagesRef = ref(db, 'messages');
        push(messagesRef, {
            sender: loggedInAgent || 'User', // Default to 'User' if not logged in
            message: message,
            timestamp: timestamp
        });

        messageInput.value = ''; // Clear input field
        checkForAgent(message.toLowerCase()); // Check for agent in the message
        
    }
}

// Fetch agent description from Firebase and send the response
function fetchAgentDescription(agentName) {
    const agentRef = ref(db, `agents/${agentName}`);

    onValue(agentRef, (snapshot) => {
        const agent = snapshot.val();

        if (agent && agent.description) {
            sendAgentDescription(agentName, agent.description);
        } else {
            console.log(`No description found for ${agentName}.`);
        }
    });
}

// Send the agent description message to the chat and save it to Firebase
function sendAgentDescription(agentName, description) {
    const audio = new Audio('gekko.mp3');
    //audio.play()
    const botMessage = ` ${agentName}: ${description}`;

    // Push the bot's response to Firebase
    const messagesRef = ref(db, 'messages');
    push(messagesRef, {
        sender: 'Gekko', // Bot's name
        message: botMessage,
        timestamp: Date.now() // Current timestamp
    });
}

// Check if any agent name is mentioned in the message
function checkForAgent(messageText) {
    const agentNames = [
        "wrud",
        "aditya",
        "admin",
        "aishwarya",
        "nand",
        "amita",
        "kamal",
"help",
"win",
"favorite",
"ready",
"chaos",
"control",
"hello",
"nice",
   "lunch", "chill", "work", "study", "movie", "plans", "hangout", "text", "coffee", "weekend"


    ];
     // Add more agents as needed
    console.log(`Checking message: ${messageText}`); // Debugging

    agentNames.forEach(agentName => {
        if (messageText.includes(agentName)) {
            console.log(`Found agent: ${agentName}`); // Debugging
            fetchAgentDescription(agentName); // Fetch and show agent description
        }
    });
}

// Fetch messages from Firebase and display in chat
const messagesRef = ref(db, 'messages');
onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = ''; // Clear previous messages

    // Play notification sound
    //const notificationSound = new Audio('ace.mp3'); // Ensure correct path

    for (const messageId in messages) {
        const message = messages[messageId];
        const messageContainer = document.createElement('div');

        if (message.sender === 'Gekko') {
            messageContainer.classList.add('message', 'gekko-message'); // Gekko's messages styling

            const gekkoIcon = document.createElement('img');
            gekkoIcon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDLwtTIc20YCHrG4LXpngr_oZP-ueLH_yjCg&s';
            gekkoIcon.alt = 'Gekko';
            gekkoIcon.classList.add('gekko-icon');

            messageContainer.prepend(gekkoIcon);
        } else if (message.sender === loggedInAgent) {
            messageContainer.classList.add('message', 'received');
        } else {
            messageContainer.classList.add('message', 'sent');
        }

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const username = document.createElement('span');
        username.classList.add('username');
        username.textContent = `${message.sender}: `;

        const messageText = document.createElement('span');
        messageText.textContent = message.message;

        const messageTime = document.createElement('span');
        messageTime.classList.add('message-time');
        messageTime.textContent = formatTime(message.timestamp); // Format timestamp

        messageContent.appendChild(username);
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);

        messageContainer.appendChild(messageContent);
        messagesContainer.appendChild(messageContainer);

        // Play the notification sound for each new message
        //notificationSound.play().catch((error) => console.warn('Audio playback failed:', error));
    }

    // Auto-scroll to the bottom when new messages are added
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});


// Reference to the Firebase Realtime Database where agent data will be stored
const agentRef = ref(db, 'agents/');

// Add agent descriptions
set(agentRef, {
    wrud: {
        description:"planting the spike!"
    },
    aditya:{
        description:"Aditya Soni is the developer of this app."
    },
    admin:{
        description:"Aditya Soni is the developer of this app."
    },
    aishwarya:{
        description:"Aditya's sister is Aishwarya Soni."
    },
    nand:{
        description:"Aditya's fatherr is Nand Kumar."
    },
    amita:{
        description:"Aditya's mother is Amita Soni."
    },
    kamal:{
        description:"Nand's friend is Kamal Kant"
    },
    help: {
        description: "I'm always ready to assist. Let me know what you need!"
    },
    win: {
        description: "Let's win this round, team!"
    },
    favorite: {
        description: "I love every map, but Icebox is where I really shine!"
    },
    ready: {
        description: "I'm always ready, let's do this!"
    },
    chaos: {
        description: "Born from chaos, I'm ready for anything!"
    },
    control: {
        description: "I disrupt the battlefield and control the chaos!"
    },
    hello: {
        description: "What's up? Ready to dominate!"
    },
    nice: {
        description: "Nice job, team! Let's keep it up!"
    },
    boost: {
        description: "Boosting, get ready for the advantage!"
    },
    peek: {
        description: "Peeking, get ready to strike!"
    },
    lunch: {
        description: "Let's grab some lunch, I'm starving!"
    },
    chill: {
        description: "Just chilling, what about you?"
    },
    work: {
        description: "Got some work to do, but I'll take a break soon."
    },
    study: {
        description: "Studying hard, gotta pass that test!"
    },
    movie: {
        description: "Let's watch a movie later, got any suggestions?"
    },
    plans: {
        description: "Got any plans for the day?"
    },
    hangout: {
        description: "Let's hang out sometime this weekend!"
    },
    text: {
        description: "I'll text you later, need to finish this first."
    },
    coffee: {
        description: "I could really use a coffee right now!"
    },
    weekend: {
        description: "Weekend vibes! What are you up to?"
    }
    
    
    
});

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", function() {
    // Clear both localStorage and sessionStorage to remove logged-in agent
    localStorage.removeItem('loggedInAgent');
    sessionStorage.removeItem('loggedInAgent');

    // Redirect the user back to the login page
    window.location = "index.html"; // Update the path if your login page URL differs
});


document.getElementById("joinVoiceChatBtn").addEventListener("click", function() {
    window.open("https://meet.google.com/fsd-qnnx-tvh", "_blank");
});


// Get elements
const badgeButton = document.getElementById("badgeButton");
const badgePopup = document.getElementById("badgePopup");
const closePopup = document.querySelector(".close");

// Show popup when button is clicked
badgeButton.addEventListener("click", () => {
    badgePopup.style.display = "flex";
});

// Hide popup when close button is clicked
closePopup.addEventListener("click", () => {
    badgePopup.style.display = "none";
});

// Hide popup when clicking outside the content box
window.addEventListener("click", (e) => {
    if (e.target === badgePopup) {
        badgePopup.style.display = "none";
    }
});


const themebadgeButton = document.getElementById("themebadgeButton");
const themebadgePopup = document.getElementById("themebadgePopup");
const themeclosePopup = document.querySelector(".themeclose");

// Show popup when button is clicked
themebadgeButton.addEventListener("click", () => {
    themebadgePopup.style.display = "flex";
});

// Hide popup when close button is clicked
themeclosePopup.addEventListener("click", () => {
    themebadgePopup.style.display = "none";
});

// Hide popup when clicking outside the content box
window.addEventListener("click", (e) => {
    if (e.target === badgePopup) {
        themebadgePopup.style.display = "none";
    }
});


// Get the buttons
const theme1Button = document.getElementById("theme1");
const theme2Button = document.getElementById("theme2");
const theme3Button = document.getElementById("theme3");
const theme4Button = document.getElementById("theme4");
const theme5Button = document.getElementById("theme5");
const theme6Button = document.getElementById("theme6");
const theme7Button = document.getElementById("theme7");
const theme8Button = document.getElementById("theme8");
const theme9Button = document.getElementById("theme9");
const theme10Button = document.getElementById("theme10");
const theme11Button = document.getElementById("theme11");
const theme12Button = document.getElementById("theme12");

theme1Button.addEventListener("click", () => {
    // Sunset Vibes
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ff4b1f, #1fddff)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #2193b0, #6dd5ed)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #ff9a9e, #fad0c4)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #36d1dc, #5b86e5)";
});

theme2Button.addEventListener("click", () => {
    // Ocean Blues
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #1e3c72, #2a5298)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #00c6ff, #0072ff)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #30cfd0, #330867)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #56ab2f, #a8e063)";
});

theme3Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ff00ff, #00ffff)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #ff512f, #dd2476)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #f12711, #f5af19)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #12c2e9, #c471ed, #f64f59)";
});


theme4Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #232526, #414345)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #434343, #000000)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #141e30, #243b55)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #485563, #29323c)";
});


theme5Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ffefba, #ffffff)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #f4c4f3, #fc67fa)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #decba4, #3e5151)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #c94b4b, #4b134f)";
});


theme6Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #fc4a1a, #f7b733)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #ff9a9e, #fecfef)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #ff7eb3, #ff758c)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #ee9ca7, #ffdde1)";
});


theme7Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #12c2e9, #c471ed, #f64f59)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #833ab4, #fd1d1d, #fcb045)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #ff6a00, #ee0979)";
});


theme8Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #11998e, #38ef7d)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #56ab2f, #a8e063)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #43cea2, #185a9d)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #67b26f, #4ca2cd)";
});


theme9Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ff9a9e, #fad0c4)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #ffb6c1, #fbc2eb)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #fcb045, #ff9a9e)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #ffdde1, #f4c4f3)";
});


theme10Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #20002c, #cbb4d4)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #ff00ff, #00ffff)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #c94b4b, #4b134f)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #00c6ff, #0072ff)";
});
theme11Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #e6e9f0, #eef1f5)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #36d1dc, #5b86e5)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #30cfd0, #330867)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #00c6ff, #0072ff)";
});
theme12Button.addEventListener("click", () => {
    document.body.style.backgroundImage = "linear-gradient(to bottom right, #ff512f, #dd2476)";
    document.querySelector('.header').style.backgroundImage = "linear-gradient(to bottom right, #00c6ff, #0072ff)";
    document.querySelector('.chatroom-container').style.backgroundImage = "linear-gradient(to bottom right, #f12711, #f5af19)";
    document.querySelector('.side-panel').style.backgroundImage = "linear-gradient(to bottom right, #12c2e9, #c471ed, #f64f59)";
});
