let blockchainHash = "";
let blockchainTimestamp = "";

async function generateHash(file) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(digest));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function storeDocument() {
  const fileInput = document.getElementById("fileInput");
  if (!fileInput.files.length) {
    alert("Select a file first");
    return;
  }

  const file = fileInput.files[0];
  blockchainHash = await generateHash(file);
  blockchainTimestamp = new Date().toLocaleString();

  document.getElementById("storedHash").innerText =
    "Blockchain Hash: " + blockchainHash;

  document.getElementById("timestamp").innerText =
    "Timestamp: " + blockchainTimestamp;
}

async function verifyDocument() {
  const verifyInput = document.getElementById("verifyInput");
  if (!verifyInput.files.length) {
    alert("Select a file first");
    return;
  }
 const file = verifyInput.files[0];
  const newHash = await generateHash(file);
  const result = document.getElementById("result");

  if (newHash === blockchainHash && blockchainHash !== "") {
    result.innerHTML = "✅ Document Authentic";
    result.className = "success";
  } else {
    result.innerHTML = "❌ Document Tampered or Not Found";
    result.className = "error";
  }
}
