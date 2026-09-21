// --- 1. GREETING INTEGRATION ---
const activeSession = localStorage.getItem("studentProfile");

if (activeSession) {
  const accountInfo = JSON.parse(activeSession);
  document.getElementById("welcome-message").textContent = `Welcome, ${accountInfo.name}!`;
}

// --- 2. CAMPUS LENDING LIBRARY LOGIC ---
const catalogCollection = document.getElementById("catalog-collection");
const activeLoansList = document.getElementById("active-loans-list");
const totalLoanCount = document.getElementById("total-loan-count");

const starterInventory = [
  { bookId: 101, bookTitle: "Introduction to Algorithms", inStock: 3 },
  { bookId: 102, bookTitle: "Operating System Concepts", inStock: 2 },
  { bookId: 103, bookTitle: "Database System Concepts", inStock: 4 },
  { bookId: 104, bookTitle: "Computer Networks by Tanenbaum", inStock: 1 }
];

let libraryStock = JSON.parse(localStorage.getItem("storedLibraryStock")) || starterInventory;
let studentLoans = JSON.parse(localStorage.getItem("storedBorrowedList")) || [];

function persistLibraryData() {
  localStorage.setItem("storedLibraryStock", JSON.stringify(libraryStock));
  localStorage.setItem("storedBorrowedList", JSON.stringify(studentLoans));
}

function displayCatalog() {
  catalogCollection.innerHTML = "";

  libraryStock.forEach((book) => {
    const hasCopies = book.inStock > 0;
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <span>${book.bookTitle} (<strong class="${hasCopies ? 'safe' : 'warning'}">${book.inStock} left</strong>)</span>
      <button 
        class="loan-action-btn" 
        ${!hasCopies ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} 
        onclick="checkoutBook(${book.bookId})">
        ${hasCopies ? 'Borrow' : 'Checked Out'}
      </button>
    `;
    catalogCollection.appendChild(div);
  });
}

function displayStudentLoans() {
  totalLoanCount.textContent = studentLoans.length;
  activeLoansList.innerHTML = "";

  if (studentLoans.length === 0) {
    activeLoansList.innerHTML = `<li style="color: #90E0EF; list-style: none;">No books checked out currently.</li>`;
    return;
  }

  studentLoans.forEach((loanItem, index) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.innerHTML = `
      <div>
        <span>${loanItem.bookTitle}</span>
        <span class="peer-note">Due in: 14 academic days</span>
      </div>
      <button class="release-loan-btn" onclick="checkinBook(${index}, ${loanItem.bookId})">Return</button>
    `;
    activeLoansList.appendChild(li);
  });
}

window.checkoutBook = function(selectedId) {
  const matchedBook = libraryStock.find(b => b.bookId === selectedId);
  if (!matchedBook || matchedBook.inStock <= 0) return;

  matchedBook.inStock--;
  studentLoans.push({ bookId: matchedBook.bookId, bookTitle: matchedBook.bookTitle });

  persistLibraryData();
  displayCatalog();
  displayStudentLoans();
};

window.checkinBook = function(loanIndex, returnedId) {
  studentLoans.splice(loanIndex, 1);
  const matchedBook = libraryStock.find(b => b.bookId === returnedId);
  if (matchedBook) matchedBook.inStock++;

  persistLibraryData();
  displayCatalog();
  displayStudentLoans();
};

displayCatalog();
displayStudentLoans();