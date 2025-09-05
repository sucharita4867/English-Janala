const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
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
                              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i
                                          class="fa-solid fa-circle-info"></i></button>
                              <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i
                                          class="fa-solid fa-volume-high"></i></button>
                        </div>
                  </div>
    `;
    wordContainer.append(card);
  });
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary" >
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
    </button>
    `;
    // 4 append into container
    levelContainer.append(buttonDiv);
  }
};
loadLessons();
