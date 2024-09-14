const resumeData = {
  firstName: "James",
  lastName: "Carter",
  jobTitle: "Full Stack Developer",
  address: "525 N Tryon Street, NC 28117",
  phone: "1234567890",
  email: "example@gmail.com",
  themeColor: "#ff6666",
  summary:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Passionate and results-driven full stack developer with experience building responsive and scalable web applications. Skilled in both front-end and back-end technologies, and a strong focus on creating seamless user experiences.",
  experience: [
    {
      id: 1,
      title: "Full Stack Developer",
      companyName: "Amazon",
      city: "New York",
      state: "NY",
      startDate: "Jan 2021",
      endDate: "",
      currentlyWorking: true,
      workSummary:
        "Designed, developed, and maintained full-stack applications to streamline internal processes and improve user experience. Implemented responsive user interfaces using React, Redux, and Tailwind CSS. Built RESTful APIs and microservices using Node.js and Express. Integrated cloud services like AWS for scalable and secure application deployment. Collaborated with cross-functional teams, including designers, product managers, and QA engineers.",
    },
  ],
  skills: [
    { id: 1, name: "JavaScript", rating: 95 },
    { id: 2, name: "React", rating: 90 },
    { id: 3, name: "Node.js", rating: 85 },
    { id: 4, name: "CSS", rating: 80 },
    { id: 5, name: "MongoDB", rating: 75 },
    { id: 9, name: "Rust", rating: 90 },
  ],
  education: [
    {
      id: 1,
      universityName: "Western Illinois University",
      startDate: "Aug 2018",
      endDate: "Dec 2019",
      degree: "Master",
      major: "Computer Science",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
};

export { resumeData };
