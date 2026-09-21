// --- 1. GREETING INTEGRATION ---
const activeSession = localStorage.getItem("studentProfile");

if (activeSession) {
  const accountInfo = JSON.parse(activeSession);
  document.getElementById("welcome-message").textContent = `Welcome, ${accountInfo.name}!`;
}

// --- 2. PEER BOOK SWAP LOGIC ---
const swapCollection = document.getElementById("swap-collection");
const publishSwapBtn = document.getElementById("publish-swap-btn");

const starterExchanges = [
  { availableTitle: "Engineering Mathematics", wantedTitle: "Data Structures C++", studentOwner: "Sneha" },
  { availableTitle: "Physics Vol 1", wantedTitle: "Digital Logic Design", studentOwner: "Aarav" }
];

let swapFeed = JSON.parse(localStorage.getItem("storedPeerSwaps")) || starterExchanges;

function displayBookSwaps() {
  swapCollection.innerHTML = "";

  swapFeed.forEach((swap, pos) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <div>
        <strong>${swap.availableTitle}</strong>
        <span class="peer-note">Swap for: ${swap.wantedTitle} (Listed by: ${swap.studentOwner})</span>
      </div>
      <div>
        <button class="loan-action-btn" onclick="initiateSwapRequest('${swap.studentOwner}')">Swap</button>
        <button style="cursor:pointer; background:none; border:none; color:#ff5252; margin-left:10px;" onclick="deleteSwapOffer(${pos})">✕</button>
      </div>
    `;
    swapCollection.appendChild(li);
  });
}

publishSwapBtn.addEventListener("click", () => {
  const availableTitle = document.getElementById("offered-book-input").value.trim();
  const wantedTitle = document.getElementById("requested-book-input").value.trim();

  let studentOwner = "Peer";
  if (activeSession) {
    studentOwner = JSON.parse(activeSession).name || "Peer";
  }

  if (!availableTitle || !wantedTitle) {
    alert("Please enter both the book you have and the book you need.");
    return;
  }

  swapFeed.push({ availableTitle, wantedTitle, studentOwner });
  localStorage.setItem("storedPeerSwaps", JSON.stringify(swapFeed));

  document.getElementById("offered-book-input").value = "";
  document.getElementById("requested-book-input").value = "";

  displayBookSwaps();
});

window.deleteSwapOffer = function(pos) {
  swapFeed.splice(pos, 1);
  localStorage.setItem("storedPeerSwaps", JSON.stringify(swapFeed));
  displayBookSwaps();
};

window.initiateSwapRequest = function(ownerName) {
  alert(`Trade notification sent to ${ownerName}!`);
};

displayBookSwaps();