interface Edu {
  school: string;
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
    major: "General Civil Engineering",
    minor: "Fine Arts",
    degree: "Bachelor of Science",
    start: "9/2005",
    end: "6/2008",
    city: "Pomona, CA, US",
  },
  {
    school: "El Camino College",
    major: "General Engineering",
    minor: "Architecture",
    degree: "Associate Degree",
    start: "9/2004",
    end: "6/2005",
    city: "Torrance, CA, US",
  },
  {
    school: "Athénée Robert Catteau",
    major: "Latin Mathematics",
    degree: "High School Diploma",
    start: "9/1989",
    end: "6/2002",
    city: "Brussels, Belgium",
  },
]

export default edu