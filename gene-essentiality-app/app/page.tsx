"use client"

import { useEffect } from "react";
import Driver from "driver.js"; // Correct default import
import "../public/css/driver.css";
import { motion } from "framer-motion";
import GeneEssentialityMap2 from "../components/GeneEssentialityMap2";

export default function Home() {
  useEffect(() => {
    const driverObj = new Driver({
      showProgress: true,
      steps: [
        { element: "#title", popover: { title: "Welcome", description: "This is the Gene Essentiality Map tool." } },
        {
          element: "#search-input",
          popover: { title: "Search", description: "Enter an Ensembl Gene ID here to fetch data." },
        },
        {
          element: "#fetch-button",
          popover: { title: "Fetch Data", description: "Click this button to load the gene essentiality data." },
        },
        {
          element: "#tissue-filter",
          popover: {
            title: "Filter Tissues",
            description: "Use this dropdown to filter the data by specific tissues.",
          },
        },
        {
          element: "#chart-area",
          popover: {
            title: "Gene Essentiality Chart",
            description: "This chart displays the gene effect across different tissues.",
          },
        },
      ],
    });

    driverObj.start(); // Start the driver tour
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen p-8 md:p-24"
    >
      <motion.h1
        id="title"
        className="text-4xl font-bold mb-8 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Gene Essentiality Map
      </motion.h1>
      <GeneEssentialityMap2 />
    </motion.main>
  );
}
