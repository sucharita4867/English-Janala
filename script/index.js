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

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <p>cat</p>
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
