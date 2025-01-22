"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js"
import { Scatter } from "react-chartjs-2"
import annotationPlugin from "chartjs-plugin-annotation"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Sun, Moon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TissueDropdown } from "./TissueDropdown"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, annotationPlugin)

const GeneEssentialityMap2 = ({ initialEnsemblId = "ENSG00000141510" }) => {
  const [ensemblId, setEnsemblId] = useState(initialEnsemblId)
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [tissues, setTissues] = useState<string[]>([])
  const [selectedTissues, setSelectedTissues] = useState<string[]>([])
  const [originalData, setOriginalData] = useState<any>(null)
  const chartRef = useRef<ChartJS>(null)
  const { theme, setTheme } = useTheme()

  const getPointColor = useCallback((geneEffect: number, currentTheme: string | undefined, alpha = 0.6) => {
    if (geneEffect <= -1) {
      return currentTheme === "dark" ? `rgba(239, 68, 68, ${alpha})` : `rgba(185, 28, 28, ${alpha})` // Red for dependency
    } else {
      return currentTheme === "dark" ? `rgba(59, 130, 246, ${alpha})` : `rgba(29, 78, 216, ${alpha})` // Blue for non-dependency
    }
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError("")
    setChartData(null)
    setTissues([])
    setSelectedTissues([])
    setOriginalData(null)

    try {
      const response = await fetch(`/api/gene-essentiality?ensemblId=${ensemblId}`)
      if (!response.ok) throw new Error("Failed to fetch data")
      const data = await response.json()

      const uniqueTissues = [...new Set(data.essentialityData.map((item: any) => item.tissueName))]
      setTissues(uniqueTissues)

      const scatterData = data.essentialityData.flatMap((item: any) =>
        item.screens
          .filter((screen: any) => screen.geneEffect !== null)
          .map((screen: any) => ({
            x: screen.geneEffect,
            y: uniqueTissues.indexOf(item.tissueName),
            tissue: item.tissueName,
            cellLine: screen.cellLineName,
            depmapId: screen.depmapId,
            disease: screen.diseaseFromSource,
            expression: screen.expression,
          })),
      )

      const newChartData = {
        datasets: [
          {
            label: "Gene Essentiality",
            data: scatterData,
            backgroundColor: scatterData.map((point: any) => getPointColor(point.x, theme)),
            borderColor: scatterData.map((point: any) => getPointColor(point.x, theme, 1)),
            borderWidth: 1,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
            pointHoverBorderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)",
            pointHoverBorderWidth: 2,
          },
        ],
      }

      setChartData(newChartData)
      setOriginalData(newChartData)
    } catch (err) {
      setError("Error fetching data. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [ensemblId, theme, getPointColor])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const toggleTissueSelection = (tissue: string) => {
    setSelectedTissues((prev) => (prev.includes(tissue) ? prev.filter((t) => t !== tissue) : [...prev, tissue]))
  }

  useEffect(() => {
    if (originalData && selectedTissues.length > 0) {
      const filteredData = originalData.datasets[0].data.filter((point: any) => selectedTissues.includes(point.tissue))
      setChartData({
        datasets: [
          {
            ...originalData.datasets[0],
            data: filteredData,
          },
        ],
      })
    } else if (originalData) {
      setChartData(originalData)
    }
  }, [selectedTissues, originalData])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Gene Effect",
          font: {
            size: 16,
            weight: "bold" as const,
            family: "Inter, sans-serif",
          },
          color: theme === "dark" ? "#E5E7EB" : "#1F2937",
        },
        ticks: {
          font: {
            size: 14,
            family: "Inter, sans-serif",
          },
          color: theme === "dark" ? "#D1D5DB" : "#4B5563",
        },
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Tissues",
          font: {
            size: 16,
            weight: "bold" as const,
            family: "Inter, sans-serif",
          },
          color: theme === "dark" ? "#E5E7EB" : "#1F2937",
        },
        ticks: {
          callback: (value: number) => tissues[value] || "",
          stepSize: 1,
          autoSkip: false,
          font: {
            size: 11,
            family: "Inter, sans-serif",
          },
          color: theme === "dark" ? "#D1D5DB" : "#4B5563",
          padding: 8,
        },
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const point = context.raw
            return [
              `Tissue: ${point.tissue}`,
              `Cell Line: ${point.cellLine}`,
              `Gene Effect: ${point.x.toFixed(2)}`,
              `Disease: ${point.disease}`,
              `Expression: ${point.expression?.toFixed(2) || "N/A"}`,
              `DepMap ID: ${point.depmapId}`,
            ]
          },
        },
        backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
        titleColor: theme === "dark" ? "#FFFFFF" : "#000000",
        bodyColor: theme === "dark" ? "#E5E7EB" : "#1F2937",
        titleFont: {
          size: 14,
          weight: "bold" as const,
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: -0.5,
            yMax: tissues.length - 0.5,
            xMin: -1,
            xMax: -1,
            borderColor: theme === "dark" ? "rgba(239, 68, 68, 0.5)" : "rgba(185, 28, 28, 0.5)",
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: "Essentiality Threshold",
              enabled: true,
              position: "start",
              font: {
                size: 14,
                weight: "bold" as const,
              },
              color: theme === "dark" ? "rgba(239, 68, 68, 1)" : "rgba(185, 28, 28, 1)",
            },
          },
        },
      },
    },
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <Card className="border-gray-800 rounded-2xl dark:border-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="sm:text-4xl md:text-4xl font-bold">Gene Essentiality Map</CardTitle>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </CardHeader>
        <CardContent>
          <motion.div
            className={`flex justify-center space-x-4 items-center border-gray-800 rounded-full transition-all duration-500 ${
              loading ? "transform scale-95" : "transform scale-100"
            }`}
          >
            <Input
              id="search-input"
              placeholder="Enter Ensembl Gene ID"
              value={ensemblId}
              onChange={(e) => setEnsemblId(e.target.value)}
              className="w-full border-gray-600 rounded-full focus:border-gray-600 focus:ring-gray-600"
            />
            <motion.button
              id="fetch-button"
              onClick={fetchData}
              disabled={loading}
              className="p-2 m-2 rounded-full bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white max-h-[40px] min-w-[100px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Loading..." : "Fetch Data"}
            </motion.button>
          </motion.div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {tissues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <TissueDropdown
              id="tissue-filter"
              tissues={tissues}
              selectedTissues={selectedTissues}
              onToggle={toggleTissueSelection}
            />
            {selectedTissues.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 flex flex-wrap gap-2"
              >
                {selectedTissues.map((tissue, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge variant="secondary" className="px-2 py-1" onClick={() => toggleTissueSelection(tissue)}>
                      {tissue}
                      <button
                        className="ml-1 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleTissueSelection(tissue)
                        }}
                      >
                        ×
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {chartData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center mt-4">
            <div className="flex justify-center mt-4 border w-fit p-2 border-gray-500 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-blue-400 dark:bg-blue-600 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-200">Neutral</p>
              </div>
              <div className="flex items-center space-x-4 ">
                <div className="w-4 h-4 bg-red-400 dark:bg-red-600 rounded-full"></div>
                <p className="text-gray-700 dark:text-gray-200">Dependency</p>
              </div>
            </div>
            <h2 className="text-center mt-4 text-2xl font-bold">Gene Effect/Tissue Dependency chart</h2>
          </div>
          <div id="chart-area" className="relative h-[150vh]">
            <Scatter data={chartData} options={chartOptions} ref={chartRef} />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default GeneEssentialityMap2

