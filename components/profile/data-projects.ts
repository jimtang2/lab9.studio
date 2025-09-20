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
    personal: true,
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
    personal: true,
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
      "Experiment with various data synchronization protocols and user experiences.",
    ],
    stack: [
      "SwiftUI",
      "SwiftData",
      "CloudKit",
    ],
    repoUrl: "https://github.com/jimtang2/audiohub",
    personal: true,
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
      "Bug squashing. Investigate and debug various end users issues reports.",
      "Triage. Discuss, plan, implement various feature requests with end users and infrastructure engineers.",
      "Propose and implement various automation processes to reduce bugs.",
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
    name: "Unified Authentication System Migration and Single-Sign-On",
    type: [
      "backend",
      "frontend",
    ],
    company: "CLSA CITIC",
    start: "4/2022",
    end: "8/2022",
    description: "Migration from fragmented to unified authentication system, using Keycloak.",
    items: [
      "Develop Keycloak authentication functions for various client applications.",
      "Configure and deploy Single-Sign-On middleware services.",
      "Iterate and discuss with end users on various authentication scenarios.",
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
    description: "Zoom integrated system to automate web meetings and webinars creation of corporate events.",
    items: [
      "Develop Zoom account and objects management functions.",
      "Develop interface component between events system and Zoom account.",
      "Develop automation scripts.",
      "Develop admin dashboard to expose system levers.",
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
      "React Native",
      "Go",
      "PostgreSQL",
      "Adobe XD",
    ],
    items: [
      "Define business requirements and develop preliminary technical specifications.",
      "Develop user stories.",
      "Develop wireframes and storyboards.",
      "Build web and mobile prototypes.",
    ],
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
    name: "Content Management System Enhancements",
    type: [
      "backend",
      "frontend",
    ],
    company: "Sure Promise",
    start: "4/2017",
    end: "9/2017",
    description: "Content management system to drive logistics and inventory processes powering multiple Shopify stores.",
    items: [
      "Develop applications data input and output systems and ensure logical consistency with business needs and expectations.",
      "Maintain good code quality.",
    ],
    stack: [
      "Django",
      "MySQL",
      "Javascript",
      "MaterialJS",
      "jQuery",
      "ReactJS",
    ],
  },
  {
    name: "theconsumerdatabase.com",
    type: [],
    company: "Lab9",
    start: "2016",
    end: "",
    description: "Consumer electronics specifications comparison engine.",
    items: [
      "Develop data crawler scripts and configuration.",
      "Data cleaning.",
      "Develop advanced search UI.",
    ],    stack: [
      "Selenium",
      "PhantomJS",
      "Go",
      "React",
    ],
    personal: true,
  },
  {
    name: "RoadTunes",
    type: [],
    company: "Lab9",
    start: "2015",
    end: "",
    description: "Experiment using iOS gyroscope acceleration data to modify music cadence.",
    items: [
      "Experiment and research with Objective-C iOS development",
    ],
    stack: [
      "Objective-C",
      "Core Data",
      "UIKit",
    ],
    personal: true,
  },
  // {
  //   name: "RubyDocs",
  //   type: [],
  //   company: "Lab9",
  //   start: "2015",
  //   end: "",
  //   description: "",
  //   stack: [

  //   ],
  //   demoUrl: ""
  // },
  // {
  //   name: "LightWeight!",
  //   type: [],
  //   company: "Lab9",
  //   start: "2015",
  //   end: "",
  //   description: "",
  //   stack: [

  //   ],
  //   demoUrl: ""
  // },
  {
    name: "Laserfiche Content Management System Migration",
    type: [
      "pm",
    ],
    company: "Laserfiche",
    start: "2011",
    end: "2009",
    description: "Data migration from legacy data silos to Laserfiche. Multiple clients include Royal London Group, Time Warner Cable, Wells Fargo Bank, Nara Bank, Santa Ana Police Department, and more.",
    items: [
      "Analyze migration data, configure migration software, test migration scripts and perform post-migration checks.",
      "Build custom ECM solution demos post-migration to showcase various Laserfiche business solutions.",
    ],
    stack: [
      "Laserfiche",
      "C#.NET",
    ],
  },
]

export default projectsData