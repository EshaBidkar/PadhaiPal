const lectureSections = document.getElementById('lecture-sections');
const gradeFilter = document.getElementById('grade-filter');
const subjectFilter = document.getElementById('subject-filter');

const lectures = [
  {
    title: "Grade 10 - Mathematics",
    grade: "Grade 10",
    subject: "Mathematics",
    videos: [
      { title: "Trigonometry Basics", link: "https://www.youtube.com/watch?v=I0Qv3R2qKvo" },
      { title: "Quadratic Equations", link: "https://www.youtube.com/watch?v=z-aP8HQA-dk" },
      { title: "Coordinate Geometry", link: "https://www.youtube.com/watch?v=LcfNU2LRBok" },
      { title: "Probability", link: "https://www.youtube.com/watch?v=KzfWUEJjG18" }
    ]
  },
  {
    title: "Grade 12 - Physics",
    grade: "Grade 12",
    subject: "Physics",
    videos: [
      { title: "Electrostatics", link: "https://www.youtube.com/watch?v=y2jahr0PcgQ" },
      { title: "Current Electricity", link: "https://www.youtube.com/watch?v=u8SVCNwmCxg" },
      { title: "Waves and Optics", link: "https://www.youtube.com/watch?v=942EmkxOhTM" },
      { title: "Modern Physics", link: "https://www.youtube.com/watch?v=3lTQqEehEhI&pp=ygUObW9kZXJuIHBoeXNpY3M%3D" }
    ]
  },
  {
    title: "Bachelors - Computer Science",
    grade: "Bachelors",
    subject: "Computer Science",
    videos: [
      { title: "Data Structures Basics", link: "https://www.youtube.com/watch?v=oz9cEqFynHU&t=42s&pp=ygUWZGF0YSBzdHJ1Y3R1cmVzIGJhc2ljcw%3D%3D" },
      { title: "Operating Systems Crash Course", link: "https://www.youtube.com/watch?v=26QPDBe-NB8&pp=ygURb3BlcmF0aW5nIHN5c3RlbXM%3D" },
      { title: "Database Management Systems", link: "https://www.youtube.com/watch?v=afpfMsfo4xk&pp=ygUEZGJtcw%3D%3D" },
      { title: "Machine Learning Intro", link: "https://www.youtube.com/watch?v=yN7ypxC7838&pp=ygUQbWFjaGluZSBsZWFybmluZw%3D%3D" }
    ]
  }
];

function extractYouTubeId(url) {
  const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
}

function renderLectures() {
  lectureSections.innerHTML = '';

  const selectedGrade = gradeFilter.value;
  const selectedSubject = subjectFilter.value;

  const filteredLectures = lectures.filter(category =>
    (selectedGrade === 'all' || category.grade === selectedGrade) &&
    (selectedSubject === 'all' || category.subject === selectedSubject)
  );

  filteredLectures.forEach(category => {
    const videoList = document.createElement('div');
    videoList.classList.add('video-list');

    category.videos.forEach(video => {
      const videoCard = document.createElement('div');
      videoCard.classList.add('video-card');
      videoCard.innerHTML = `
        <a href="${video.link}" target="_blank">
          <img src="https://img.youtube.com/vi/${extractYouTubeId(video.link)}/0.jpg" alt="${video.title}">
        </a>
        <p>${video.title}</p>
      `;
      videoList.appendChild(videoCard);
    });

    lectureSections.appendChild(videoList);
  });
}

gradeFilter.addEventListener('change', renderLectures);
subjectFilter.addEventListener('change', renderLectures);

renderLectures();
