"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const renderTitleBarChart = (result: any) => {
  const data = {
    labels: [
      "Title",
      "Meta Description",
      "Headings",
      "Page Load Speed",
      "Internal Page Links",
      "Internal Section Links",
    ],
    datasets: [
      {
        label: "SEO Grades",
        data: [
          result.isTitleUnique ? 3 : 1,
          result.metaDescriptionStatus === "Valid"
            ? 3
            : result.metaDescriptionStatus === "Missing"
            ? 0
            : 1,
          result.h1Feedback === "Good" ? 3 : 1,
          result.loadTimeFeedback === "Good" ? 3 : 1,
          result.internalPageLinksCount > 0 ? 3 : 1,
          result.internalSectionLinksCount > 0 ? 3 : 1,
        ],
        backgroundColor: [
          result.isTitleUnique ? "#d4edda" : "#f8d7da",
          result.metaDescriptionStatus === "Valid"
            ? "#d4edda"
            : result.metaDescriptionStatus === "Missing"
            ? "#f8d7da"
            : "#fff3cd",
          result.h1Feedback === "Good" ? "#d4edda" : "#f8d7da",
          result.loadTimeFeedback === "Good" ? "#d4edda" : "#f8d7da",
          result.internalPageLinksCount > 0 ? "#d4edda" : "#f8d7da",
          result.internalSectionLinksCount > 0 ? "#d4edda" : "#f8d7da",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "SEO Analysis Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export const renderKeywordBarChart = (keywordAnalysis: any[]) => {
  const data = {
    labels: keywordAnalysis.map((analysis) => analysis.keyword),
    datasets: [
      {
        label: "In Title",
        data: keywordAnalysis.map((analysis) => analysis.inTitleCount),
        backgroundColor: "#FFB6C1",
      },
      {
        label: "In Headings",
        data: keywordAnalysis.map((analysis) => analysis.inHeadingsCount),
        backgroundColor: "#ADD8E6",
      },
      {
        label: "In Body",
        data: keywordAnalysis.map((analysis) => analysis.inBodyCount),
        backgroundColor: "#98FB98",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Keyword Analysis",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};
