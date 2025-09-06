interface Job {
  company: string;
  url?: string;
  department: string;
  title: string;
  start: string;
  end: string;
  city: string;
  description: string;
  stack: string[];
}

const jobs: Job[] = [
  {
    company: "CLSA CITIC",
    url: "https://www.clsa.com/",
    department: "Research IT",
    title: "Sr Software Engineer",
    start: "4/2019",
    end: "6/2023",
    city: "Hong Kong",
    description: "",
    stack: [
      "Go",
      "PostgreSQL",
      "ReactJS",
      "Coldfusion",
      "NGINX",
      "Wordpress",
      "Ruby on Rails",
    ],
  },
  {
    company: "Actelligent Capital",
    url: "https://www.actelligent-capital.com/",
    department: "IT",
    title: "Software Engineer",
    start: "3/2018",
    end: "7/2018",
    city: "Hong Kong",
    description: "",
    stack: [
      "Go",
      "PostgreSQL",
      "ReactJS",
    ],
  },
  {
    company: "Pinnacle Holdings",
    url: "http://www.pinnacle-holdings.hk/",
    department: "IT",
    title: "Sr Software Engineer",
    start: "10/2017",
    end: "1/2018",
    city: "Hong Kong",
    description: "",
    stack: [
      "Java",
      "ReactJS",
      "Webpack",
    ],
  },
  {
    company: "Sure Promise",
    url: "https://www.facebook.com/surepromiselimited/",
    department: "IT",
    title: "Software Engineer",
    start: "4/2017",
    end: "9/2017",
    city: "Hong Kong",
    description: "",
    stack: [
      "Django",
      "MySQL",
      "jQuery",
      "ReactJS",
    ],
  },
  {
    company: "Freelance",
    department: "IT",
    title: "Developer",
    start: "3/2014",
    end: "9/2017",
    city: "Hong Kong",
    description: "",
    stack: [
      "Django",
      "MySQL",
      "jQuery",
      "ReactJS",
    ],
  },
  {
    company: "Laserfiche",
    department: "Laseriche UK Services",
    title: "Consultant",
    start: "5/2012",
    end: "11/2013",
    city: "London, UK",
    description: "",
    stack: [
      "Javascript",
      "jQuery",
      "MSSQL",
      "C#",
    ],
  },
  {
    company: "Laserfiche",
    department: "Professional Services IT",
    title: "Technical Engineer",
    start: "5/2009",
    end: "11/2012",
    city: "Long Beach, CA",
    description: "",
    stack: [
      "Javascript",
      "jQuery",
      "MSSQL",
      "C#",
    ],
  },
  {
    company: "Laserfiche",
    department: "Marketing",
    title: "Digital Marketing Intern",
    start: "5/2006",
    end: "9/2009",
    city: "Long Beach, CA",
    description: "",
    stack: [
      "Javascript",
      "jQuery",
      "MSSQL",
      "C#",
    ],
  },
]

export default jobs