// Inspired by the Leetcode problem
// https://leetcode.com/problems/longest-palindromic-substring/

const FIND_DELAY = 50;
const check = document.getElementById("check");
const find = document.getElementById("find");
const test = document.getElementById("test");
const short = document.getElementById("short");
const medium = document.getElementById("medium");

const visual = document.getElementById("visualize-text");
let interval;
const short_TEST_STRING = 'abbazezalphaduethoohbookkoob';
const medium_TEST_STRING = 'magnificentcatstacaretheremanymoreplacesthatemphasizetheabilityabbazezalphaduethoohbookkoobtogetoutthereandwin';

const TEST_STRING = `
Say it ain't so, I will not go
Turn the lights off, carry me home

Na na, na na, na na, na na, na, na
Na na, na na, na na, na na, na, na
Na na, na na, na na, na na, na, na
Na na, na na, na na, na na, na, na

[Verse 2: Tom DeLonge]
Late night, come home, work sucks, I know
She left me roses by the stairs, surprises let me know she cares

[Chorus: Tom DeLonge]
Say it ain't so, I will not go
Turn the lights off, carry me home`;

test.addEventListener("click", () => {
  check.value = TEST_STRING;
  output();
});

short.addEventListener("click", () => {
  check.value = short_TEST_STRING;
  output();
});

medium.addEventListener("click", () => {
  check.value = medium_TEST_STRING;
  output();
});


find.addEventListener("click", output);

function addClassName(className, begin, end) {
  for (let i = begin; i < end; i++) {
    const child = visual.children[i];
    if (child) {
      child.classList.add(className);
    }
  }
}

function removeClassName(className) {
  for (let i = 0; i < visual.children.length; i++) {
    const child = visual.children[i];
    child.classList.remove(className);
  }
}

function cleanUpInput() {
  return check.value.replace(/[\s,\.\(\)\[\]\{\}\-\_\;\:\"\']/gi, "").toLowerCase();
}

function output() {
  visual.innerHTML = "";
  clearInterval(interval);
  check.value = cleanUpInput();
  const text = check.value;
  for (let i = 0; i < text.length; i++) {
    const letter = document.createElement("span");
    letter.textContent = text[i];
    visual.appendChild(letter);
  }
  longestPalindrome(text);
}

function expandCenter(s, begin, end) {
  removeClassName("checked");

  return new Promise((resolve) => {
    interval = setInterval(() => {
      if (begin >= 0 && end <= s.length - 1 && s[begin] === s[end]) {
        begin--;
        end++;
      } else {
        clearInterval(interval);
        resolve([begin + 1, end]);
      }
      addClassName("checked", begin, end);
    }, FIND_DELAY);
  });
}

async function longestPalindrome(s) {
  if (s.length <= 1) {
    return s;
  }

  let longest = "";

  for (let i = 0; i < s.length; i++) {
    let [begin, end] = await expandCenter(s, i, i);
    let len = s.substring(begin + 1, end);
    if (len.length > longest.length) {
      longest = len;
      removeClassName("longest");
      addClassName("longest", begin, end);
    }

    [begin, end] = await expandCenter(s, i, i + 1);
    len = s.substring(begin + 1, end);
    if (len.length > longest.length) {
      longest = len;
      removeClassName("longest");
      addClassName("longest", begin, end);
    }
  }

  removeClassName("checked");
  console.log("DONE!");
  return longest;
}
