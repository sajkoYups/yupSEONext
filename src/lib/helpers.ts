export const calculateGrade = (result: any) => {
  const grades: any = {};

  grades.title = result.isTitleUnique ? "A" : "C";
  grades.metaDescription =
    result.metaDescriptionStatus === "Valid"
      ? "A"
      : result.metaDescriptionStatus === "Missing"
      ? "F"
      : "C";
  grades.headings = result.h1Feedback === "Good" ? "A" : "C";
  grades.pageLoadSpeed = result.loadTimeFeedback === "Good" ? "A" : "C";
  grades.internalLinks = result.internalPageLinksCount > 0 ? "A" : "C";

  return grades;
};

export const getGradeClass = (grade: string) => {
  switch (grade) {
    case "A":
      return "bg-green-100 text-green-800";
    case "B":
      return "bg-blue-100 text-blue-800";
    case "C":
    case "F":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
