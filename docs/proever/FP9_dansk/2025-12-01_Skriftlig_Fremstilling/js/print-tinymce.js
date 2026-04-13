function saveToTxt() {
  // Content from TinyMCE editor
  const editor = tinymce.get("6bda21fd-92cf-40b6-8050-f25548418070");
  const content = editor ? editor.getContent() : "";

  // Decode HTML entities (like &aring;, &aelig;, &nbsp;, etc.)
  const decodedContent = decodeHTML(content).replace(/<[^>]*>/g, "");

  // Get the subject text (so we can name txt file this)
  const subjectElement = document.getElementById("student_info_subject");
  let subject = subjectElement ? subjectElement.innerHTML.trim() : "";

  // Clean up the subject text:
  // Remove <br> tags and replace them with spaces
  // Replace multiple spaces with a single space
  subject = subject.replace(/<br\s*\/?>/g, " ");
  subject = subject.replace(/\s+/g, " ").trim();

  // Sanitize the subject text to ensure it's a valid file name
  const sanitizedSubject = subject.replace(/[^a-zA-Z0-9_-]/g, "_");

  // Get text from the uni login input
  const uniloginContent = document.getElementById("unilogin")
    ? document.getElementById("unilogin").value
    : "";

  // Get word count
  const wordCountElement = document.getElementById("word_count_text_wrapper");
  const wordCount = wordCountElement ? wordCountElement.textContent.trim() : "";

  // Get text from class input
  const className = document.getElementById("klasse")
    ? document.getElementById("klasse").value
    : "";

  // Get text from school input
  const schoolName = document.getElementById("skole")
    ? document.getElementById("skole").value
    : "";

  // Create text content for the .txt file
  const textContent = `Unilogin: ${uniloginContent}\n\nKlasse/Hold: ${className}\n\nSkole: ${schoolName}\n\nFag: ${subject}\n\nAntal ord: ${wordCount}\n\nBesvarelse:\n${decodedContent}`;

  // Create a Blob with the text content
  const blob = new Blob([textContent], { type: "text/plain" });

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  // Set the download filename based on sanitized subject (fallback if empty)
  link.download = sanitizedSubject
    ? `${sanitizedSubject}_backup.txt`
    : "Folkeskoleproeve_backup.txt";

  // Append the link to the document body, trigger the click event, and then remove the link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Function to decode HTML entities
function decodeHTML(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent || doc.documentElement.innerText;
}

const printButton = document.getElementById("printButton");
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
let isPrinting = false;
let originalTitle = document.title;

function handlePrintDialogClosed() {
  setTimeout(() => {
    isPrinting = false;
    printButton.disabled = false;

    if (isSafari) {
      document.title = originalTitle;
      const uniloginTextElement = document.getElementById(
        "hidden-unilogin-text"
      );
      if (uniloginTextElement) {
        uniloginTextElement.style.position = "";
      }
    }
  }, 250);
}

window.addEventListener("focus", () => {
  if (isPrinting) {
    handlePrintDialogClosed();
  }
});

const printMediaQuery = window.matchMedia("print");
printMediaQuery.addListener((mql) => {
  if (!mql.matches && isPrinting) {
    handlePrintDialogClosed();
  }
});

function prepareAndPrint() {
  setTimeout(saveToTxt, 0);
  const content = tinymce
    .get("6bda21fd-92cf-40b6-8050-f25548418070")
    .getContent();
  const uniloginContent = document.getElementById("unilogin")?.value || "";

  document.getElementById("hidden-tinymce-text").innerHTML = content;
  const uniloginTextElement = document.getElementById("hidden-unilogin-text");
  if (uniloginTextElement) {
    uniloginTextElement.innerHTML = uniloginContent;
  }

  originalTitle = document.title;
  if (isSafari) {
    document.title = `${originalTitle} unilogin: ${uniloginContent}`;
    if (uniloginTextElement) {
      uniloginTextElement.style.position = "absolute";
    }
  }

  window.print();

  setTimeout(() => {
    if (isPrinting) {
      handlePrintDialogClosed();
    }
  }, 3000);
}

// --- Add Event Listener to the Print Button ---
printButton.addEventListener("click", () => {
  if (isPrinting) return;

  isPrinting = true;
  printButton.disabled = true;
  prepareAndPrint();
});
