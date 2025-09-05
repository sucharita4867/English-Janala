const createElement = (arr) => {
  const htmlElements = arr.map((el) => `<span class ="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  // console.log(lessonBtn);
  lessonBtn.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  manageSpinner(true);
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  // console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  
  <div class="">
                                    <h2 class="text-2xl font-bold">${
                                      word.word
                                    } ( <i class="fa-solid fa-microphone-lines"></i>
                                          :${word.pronunciation})</h2>
                              </div>
                              <div class="">
                                    <h2 class=" font-bold">Meaning</h2>
                                    <p>${word.meaning}</p>
                              </div>
                              <div class="">
                                    <h2 class=" font-bold">Example</h2>
                                    <p>${word.sentence}</p>
                              </div>
                              <div class="">
                                    <h2 class=" font-bold">Synonym</h2>
                                    <div class="">${createElement(
                                      word.synonyms
                                    )}</div>
                              </div>
  
  `;
  document.getElementById("word-modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full rounded-xl space-y-6font-bengali py-8">
                        <figure class="flex justify-center">
                              <img src="./assets/alert-error.png" alt="">
                        </figure>
                        <p class="text-xl font-medium text-gray-400 ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                        <h1 class="text-4xl font-bold">নেক্সট Lesson এ যান</h1>
                  </div>
    `;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class=" bg-white rounded-xl text-center shadow-sm py-10 px-5 space-y-4">
                        <h1 class="text-2xl font-bold">${
                          word.word ? word.word : "শব্দ পাওয়া যায়নি"
                        }</h1>
                        <p class="font-semibold">Meaning /Pronounciation</p>
                        <div class="text-2xl font-medium font-bengali">"${
                          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
                        }
                         / ${
                           word.pronunciation
                             ? word.pronunciation
                             : "pronunciation পাওয়া যায়নি"
                         }"</div>
                        <div class="flex justify-between items-center">
                              <button onclick="loadWordDetail(${
                                word.id
                              })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i
                                          class="fa-solid fa-circle-info"></i></button>
                              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i
                                          class="fa-solid fa-volume-high"></i></button>
                        </div>
                  </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};
const displayLesson = (lessons) => {
  // 1 get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  //   console.log(levelContainer);
  // 2 get into every lesson
  for (let lesson of lessons) {
    // 3 create element

    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" >
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
    </button>
    `;
    // 4 append into container
    levelContainer.append(buttonDiv);
  }
};
loadLessons();
