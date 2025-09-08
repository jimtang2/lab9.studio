interface Edu {
  school: string;
  url: string;
  major: string;
  minor?: string;
  degree: string;
  start: string;
  end: string;
  city: string;
}

const edu: Edu[] = [
  {
    school: "Cal Poly Pomona",
    url: "https://www.cpp.edu/",
    major: "General Civil Engineering",
    minor: "Fine Arts",
    degree: "Bachelor of Science",
    start: "2005",
    end: "2009",
    city: "Pomona, CA, US",
  },
  {
    school: "El Camino College",
    url: "https://www.elcamino.edu/",
    major: "General Engineering",
    minor: "Architecture",
    degree: "Associate Degree",
    start: "2004",
    end: "2005",
    city: "Torrance, CA, US",
  },
  {
    school: "Athénée Robert Catteau",
    url: "https://robertcatteau.weebly.com/",
    major: "Latin Mathematics",
    degree: "High School Diploma",
    start: "1989",
    end: "2002",
    city: "Brussels, Belgium",
  },
]

export default edu