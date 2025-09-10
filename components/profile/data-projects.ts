import { type Project } from "./types"

const projectsData: Project[] = [
  {
    name: "www.lab9.studio",
    type: [
      "backend",
      "frontend",
      "mobile",
      "devops",
      "ux",
    ],
    company: "Lab9",
    start: "7/2025",
    end: "Present",
    description: "Public playground project.",
    items: [
      "Develop infrastructure, UI and code structure with modularity, extensibility and clarity as primary focus.",
      "Experiment with various code structures, patterns and libraries.",
      "Experiment with various implementations and visual styles.",
    ],
    // websiteUrl: "https://www.lab9.studio",
    repoUrl: "https://github.com/jimtang2/lab9.studio",
    stack: [
      "Next",
      "Tailwind",
      "Typescript",
      "Webpack",
      "PostgreSQL",
      "Spring Boot",
      "AWS",
      "GitHub Actions",
    ],
  },
  {
    name: "Tetris WASM",
    type: [
      "backend",
      "frontend",
    ],
    company: "Lab9",
    start: "15/4/2025",
    end: "16/4/2025",
    description: "Built for fun.",
    stack: [
      "Rust",
      "Next",
      "Wasm",
      "Vercel",
    ],
    items: [
      "Experiment with LLM output reliability and quality.",
      "Experiment with Rust and WASM.",
      "Test Vercel NextJS hosting.",
    ],
    demoUrl: "https://tetris-wasm-three.vercel.app/",
    repoUrl: "https://github.com/jimtang2/tetris-wasm",
  },
  {
    name: "AudioHub",
    type: [
      "mobile",
    ],
    company: "Lab9",
    start: "17/4/2025",
    end: "22/4/2025",
    description: "Prototype audiobooks synchronization app for iOS and WatchOS with metadata providers.",
    items: [
      "XCode project built in SwiftUI.",
      "Experiment with various synchronization methods and user experiences.",
    ],
    stack: [
      "SwiftUI",
    ],
    demoUrl: "",
    repoUrl: "https://github.com/jimtang2/audiohub",
  },
  // {
  //   name: "AstroCharts",
  //   type: [],
  //   company: "Lab9",
  //   start: "17/4/2025",
  //   end: "22/4/2025",
  //   description: "",
  //   stack: [

  //   ],
  //   demoUrl: "",
  //   repoUrl: "https://github.com/jimtang2/audiohub",
  // },
  {
    name: "Research and Marketing Website – www.clsa.com",
    type: [
      "backend",
      "frontend",
      "devops",
    ],
    company: "CLSA CITIC",
    start: "4/2019",
    end: "6/2023",
    description: "Maintenance and enhancement of a complex system of web applications built with various legacy technologies.",
    items: [
      "Debug various internal and external system components.",
      "Reduce bugs by implementing various systems and automation processes.",
      "Enhance content management applications.",
    ],
    stack: [
      "Coldfusion",
      "Wordpress",
      "Go",
      "Nginx",
      "ReactJS",
      "IIS",
    ],
    websiteUrl: "https://www.clsa.com",
  },
  {
    name: "Unified Authentication System Migration",
    type: [
      "backend",
      "frontend",
    ],
    company: "CLSA CITIC",
    start: "4/2022",
    end: "8/2022",
    description: "Migration to unified authentication system using Keycloak.",
    items: [
      'Develop unified-authentication-enabled container deployment template.',
      "Deliver Single-Sign-On function to various existing client applications.",
      "Update authentication system. ",
    ],
    stack: [
      "Keycloak",
      "Gatekeeper",
      "Go",
      "Docker",
    ],
    websiteUrl: "https://forums.clsa.com",
  },
  {
    name: "Events System Zoom Integration",
    type: [
      "backend",
      "frontend",
    ],
    company: "CLSA CITIC",
    start: "9/2019",
    end: "9/2020",
    description: "Zoom integrated system to automate web meetings and webinars creation of all scheduled forum events.",
    items: [
      "Develop Zoom account and objects management system.",
      "Develop events system and Zoom component interface.",
      "Develop admin dashboard.",
      "Document, test, project management.",
    ],
    stack: [
      "Go",
      "React",
      "ZoomAPI",
      "RabbitMQ",
    ],
    websiteUrl: "https://forums.clsa.com",
  },
  {
    name: "Prototypes & Wireframes",
    type: [
      "ux",
    ],
    company: "Actelligent Capital",
    start: "3/2018",
    end: "7/2018",
    description: "System specifications and requirements gathering for FinTech startup.",
    stack: [
      "React",
      "Go",
      "PostgreSQL",
      "Adobe XD",
    ],
    items: [
      "Identify various technical requirements and define preliminary specifications.",
      "Develop wireframes storyboards.",
    ],
    demoUrl: ""
  },
  // {
  //   name: "Frontend Continuous Integration Pipeline",
  //   type: [
  //     "frontend",
  //   ],
  //   company: "Pinnacle Holdings",
  //   start: "10/2017",
  //   end: "1/2018",
  //   description: "",
  //   items: [
  //     "",
  //   ],
  //   stack: [
  //     "React",
  //     "Webpack",
  //     "Jenkins",
  //     "Kubernetes",
  //     "GCP",
  //   ],
  //   demoUrl: ""
  // },
  {
    name: "Content Management System",
    type: [
      "backend",
      "frontend",
    ],
    company: "Sure Promise",
    start: "4/2017",
    end: "9/2017",
    description: "Content management system for multiple Shopify stores to manage logistical processes.",
    items: [
      "Develop features and enhancements.",
    ],
    stack: [
      "Django",
      "MySQL",
      "Javascript",
      "MaterialJS",
      "jQuery",
      "ReactJS",
    ],
    demoUrl: ""
  },
  {
    name: "theconsumerdatabase.com",
    type: [],
    company: "Lab9",
    start: "2016",
    end: "",
    description: "",
    stack: [

    ],
    demoUrl: ""
  },
  {
    name: "RoadTunes",
    type: [],
    company: "Lab9",
    start: "2015",
    end: "",
    description: "",
    stack: [

    ],
    demoUrl: ""
  },
  {
    name: "RubyDocs",
    type: [],
    company: "Lab9",
    start: "2015",
    end: "",
    description: "",
    stack: [

    ],
    demoUrl: ""
  },
  {
    name: "LightWeight!",
    type: [],
    company: "Lab9",
    start: "2015",
    end: "",
    description: "",
    stack: [

    ],
    demoUrl: ""
  },
  {
    name: "Royal London Group Content Management System",
    type: [],
    company: "Laserfiche",
    start: "2010",
    end: "",
    description: "",
    stack: [

    ],
    demoUrl: ""
  },
  {
    name: "Time Warner Cable Content Management System",
    type: [],
    company: "Laserfiche",
    start: "2007",
    end: "",
    description: "",
    stack: [

    ],
    items: [
      "Analyze and review all system specifications.",
    ],
  },
]

export default projectsData