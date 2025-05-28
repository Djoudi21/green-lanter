"use client"

import {useEffect, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Calculator,
  CheckCircle,
  ExternalLink,
  Globe,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"
import {ScannerInterface} from "@/app/scanner/scanner-interface";
import {EnvironmentalBadge} from "@/app/scanner/environmental-badge";
import {AdditionalPages} from "@/app/scanner/additional-pages";
import {
  AdditionalPageResult,
  FullScanCarbonAnalysisResponseApi,
  ScanResults,
  WebsiteCarbonApiResponse
} from "@/types/scanner";
import { FullScanCTA } from "./full-scan-cta"
import {ScanProgress} from "@/app/scanner/scan-progress";

export function mapWebsiteCarbonResponsesToAdditionalPages(
    responses: WebsiteCarbonApiResponse[] | undefined,
): AdditionalPageResult[] {
  if(!responses) return []
  return responses.map((response, index) => ({
    id: `${index}-${response.url}`, // Create a unique ID based on index and URL
    url: response.url,
    path: new URL(response.url).pathname,
    green: response.green ?? null,
    bytes: response.bytes,
    cleanerThan: response.cleanerThan,
    co2Grams: response.statistics.co2.grid.grams,
    scanDate: new Date(),
  }));
}


// Global counter for pages scanned (in a real app, this would be stored in a database)
let globalPagesScanned = 0 // Starting number

export default function WebScanner() {
  const [url, setUrl] = useState("")
  // const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState<ScanResults | null>(null)
  const [error, setError] = useState("")
  const [fullScanProgress, setFullScanProgress] = useState(0)
  const [scanInProgress, setScanInProgress] = useState(false)
  const [fullScanPagesFound, setFullScanPagesFound] = useState(0)
  const [isCounterAnimating, setIsCounterAnimating] = useState(false)
  const [pagesScanned, setPagesScanned] = useState(globalPagesScanned)
  const [isFullScan, setIsFullScan] = useState(false)

  // Simulate real-time counter updates
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Randomly increment the counter (simulating other users scanning)
  //     if (Math.random() > 0.7) {
  //       // 30% chance every 3 seconds
  //       globalPagesScanned += Math.floor(Math.random() * 3) + 1
  //       setPagesScanned(globalPagesScanned)
  //       setIsCounterAnimating(true)
  //       setTimeout(() => setIsCounterAnimating(false), 500)
  //     }
  //   }, 3000)
  //
  //   return () => clearInterval(interval)
  // }, [])

  // Simulate full website scan progress
  // useEffect(() => {
  //   if (fullScanInProgress) {
  //     const totalPages = fullScanPagesFound
  //     let currentPage = 0
  //
  //     const interval = setInterval(() => {
  //       currentPage += 1
  //       const progress = Math.min((currentPage / totalPages) * 100, 100)
  //       setFullScanProgress(progress)
  //
  //       if (currentPage >= totalPages) {
  //         clearInterval(interval)
  //         setFullScanInProgress(false)
  //
  //         // Update the results with additional pages
  //         if (results) {
  //           const updatedResults = { ...results }
  //           updatedResults.numberOfPagesScanned = totalPages
  //
  //           // Generate additional pages
  //           const additionalPages: AdditionalPageResult[] = []
  //           const commonPaths = [
  //             "/about",
  //             "/contact",
  //             "/blog",
  //             "/products",
  //             "/services",
  //             "/pricing",
  //             "/support",
  //             "/news",
  //             "/team",
  //             "/faq",
  //             "/privacy",
  //             "/terms",
  //             "/careers",
  //             "/portfolio",
  //             "/testimonials",
  //           ]
  //
  //           // Show up to 3 additional pages
  //           const numAdditionalPages = Math.min(totalPages - 1, 3)
  //
  //           for (let i = 0; i < numAdditionalPages; i++) {
  //             const randomPath = commonPaths[Math.floor(Math.random() * commonPaths.length)]
  //             const pageBytes = Math.floor(Math.random() * 1500000) + 50000 // 50KB to 1.5MB
  //             const pageCleanerThan = Math.random() * 0.9 + 0.1
  //             const pageCo2 = pageBytes * 0.75 * 0.00000168 * (results.green ? 430 : 475)
  //
  //             additionalPages.push({
  //               url: `${results.url}${randomPath}`,
  //               path: randomPath,
  //               green: results.green, // Same hosting as main page
  //               bytes: pageBytes,
  //               cleanerThan: pageCleanerThan,
  //               co2Grams: pageCo2,
  //               scanDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Random date within last 30 days
  //             })
  //           }
  //
  //           updatedResults.additionalPages = additionalPages
  //           setResults(updatedResults)
  //         }
  //       }
  //     }, 500)
  //
  //     return () => clearInterval(interval)
  //   }
  // }, [fullScanInProgress, fullScanPagesFound, results])

  const validateUrl = (url: string) => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`)
      return true
    } catch {
      return false
    }
  }

  const scanWebsite = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL")
      return
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., example.com or https://example.com)")
      return
    }

    setError("")
    setScanInProgress(true)
    setResults(null)

    // Increment counter when starting a scan
    globalPagesScanned += 1
    setPagesScanned(globalPagesScanned)
    setIsCounterAnimating(true)
    setTimeout(() => setIsCounterAnimating(false), 500)
    try {
      const res = await fetch(`http://localhost:8080/carbon-scan/single?url=${url}`)
      console.log("RESPONSE", res)
      const json: FullScanCarbonAnalysisResponseApi = await res.json()
      console.log("JSON:", json)
      const mappedResponse = {
        url: json.url,
        green: json.green,
        bytes: json.totalBytes,
        cleanerThan: json.averageCleanerThan,
        pageNumber: 1,
        numberOfPagesScanned: 1,
        statistics: {
          adjustedBytes: json.totalAdjustedBytes,
          energy: json.totalEnergy,
          co2: {
            grid: {
              grams: json.totalCo2.grid.grams,
              litres: json.totalCo2.grid.litres
            },
            renewable: {
              grams: json.totalCo2.renewable.grams,
              litres: json.totalCo2.renewable.litres
            }
          }
        },
        additionalPages: [],
      }
      setResults(mappedResponse)
      setScanInProgress(false)
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  const startFullScan = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL")
      return
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., example.com or https://example.com)")
      return
    }
    console.log("startFullScan")

    setError("")
    setScanInProgress(true)
    setResults(null)

    // Increment counter when starting a scan
    globalPagesScanned += 1
    setPagesScanned(globalPagesScanned)
    setIsCounterAnimating(true)
    setTimeout(() => setIsCounterAnimating(false), 500)

    try {
      const res = await fetch(`http://localhost:8080/carbon-scan/full?url=${url}`)
      console.log("RESPONSE", res)
      const json: FullScanCarbonAnalysisResponseApi = await res.json()
      console.log("JSON:", json)
      const mappedAdditionalPages = mapWebsiteCarbonResponsesToAdditionalPages(json.results)
      console.log('LALALALA', mappedAdditionalPages)
      const mappedResponse = {
        url: json.url,
        green: json.green,
        bytes: json.totalBytes,
        cleanerThan: json.averageCleanerThan,
        pageNumber: 1,
        numberOfPagesScanned: json.numberOfPagesScanned,
        statistics: {
          adjustedBytes: json.totalAdjustedBytes,
          energy: json.totalEnergy,
          co2: {
            grid: {
              grams: json.totalCo2.grid.grams,
              litres: json.totalCo2.grid.litres
            },
            renewable: {
              grams: json.totalCo2.renewable.grams,
              litres: json.totalCo2.renewable.litres
            }
          }
        },
        additionalPages: mappedAdditionalPages,
      }
      console.log("RESULT", mappedResponse)
      setResults(mappedResponse)
      setScanInProgress(false)
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  // const formatNumber = (num: number) => {
  //   return num.toLocaleString()
  // }

  const handlePageClick = (page: AdditionalPageResult) => {
    console.log("Page clicked:", page)
    // In a real app, you might want to show detailed information about the page
  }

  const handleCopyEmbed = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      alert("Embed code copied to clipboard! Paste this HTML code on your website to display your environmental badge.")
    })
  }

  const handleBadgeDownload = (size: string, dataUrl: string) => {
    // In a real app, you might want to track downloads or perform other actions
    console.log(`Badge downloaded: ${size}`)

    // Create a download link
    const link = document.createElement("a")
    const topRank = results ? Math.round((1 - results.cleanerThan) * 100) : 0
    link.download = `green-lantern-badge-top${topRank}percent-${size}.png`
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-green-400 hover:text-green-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Base
            </Button>
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 shadow-lg shadow-green-500/50">
              <Globe className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Power Ring Web Scanner</h1>
            <p className="text-green-400 text-lg">{"Scan any website's carbon footprint with Green Lantern precision"}</p>

            {/* Pages Scanned Counter */}
            {/*<div className="mt-6 inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">*/}
            {/*  <BarChart3 className="w-4 h-4 text-green-400" />*/}
            {/*  <span className="text-green-400 font-bold text-sm">*/}
            {/*    <span className={`transition-all duration-500 ${isCounterAnimating ? "text-green-300 scale-110" : ""}`}>*/}
            {/*      {formatNumber(pagesScanned)}*/}
            {/*    </span>{" "}*/}
            {/*    pages scanned by the Green Lantern Corps*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>
        </div>

        {/* Scanner Interface */}
        <ScannerInterface
            url={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && scanWebsite()}
            error={error}
            onClick={async () => {
              return isFullScan ? startFullScan() : scanWebsite()
            }}
            isScanning={scanInProgress}
            fullScanInProgress={scanInProgress}
            setIsFullScan={(isFullScan) => setIsFullScan(isFullScan)}
            isFullScan={isFullScan}
        />

        {/* Scanning Progress */}
        {scanInProgress && !isFullScan && <ScanProgress type="single" currentPageNumber={pagesScanned} />}

        {/* Full Website Scan Progress */}
        {scanInProgress && isFullScan && (
            <ScanProgress
                type="full"
                progress={fullScanProgress}
                pagesFound={fullScanPagesFound}
                hostname={results ? new URL(results.url).hostname : ""}
            />
        )}

        {results && !scanInProgress && (
            <div className="space-y-6">
              {/* Main Results Card */}
              <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Environmental Scan Results
                  </CardTitle>
                  <CardDescription className="text-gray-300 flex items-center gap-2">
                    Analysis complete for: {results.url} • {' '}
                    {results.numberOfPagesScanned} {results.numberOfPagesScanned === 1 ? "page" : "pages"} scanned for
                    this domain
                    <Link href="/methodology">
                      <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 p-1 h-auto">
                        <Calculator className="w-3 h-3 mr-1" />
                        View Methodology
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EnvironmentalBadge
                      cleanerThan={results.cleanerThan}
                      green={results.green}
                      url={results.url}
                      pageNumber={1}
                      pagesScannedForDomain={1}
                      onDownload={handleBadgeDownload}
                      onCopyEmbed={handleCopyEmbed}
                  />

                  {/* Recommendations based on actual data */}
                  <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <Zap className="w-5 h-5"/>
                        Green Lantern Corps Optimization Protocol
                      </CardTitle>
                      <CardDescription className="text-gray-300">
                        Personalized recommendations based on your scan results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {!results.green && (
                            <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"/>
                              <div>
                                <div className="text-red-400 font-bold text-sm">Switch to Green Hosting</div>
                                <div className="text-gray-300 text-xs">
                                  Reduce CO₂ emissions by{" "}
                                  {(results.statistics.co2.grid.grams - results.statistics.co2.renewable.grams).toFixed(2)}g
                                  per
                                  visit
                                </div>
                              </div>
                            </div>
                        )}

                        {results.bytes > 1000000 && (
                            <div
                                className="flex items-start gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0"/>
                              <div>
                                <div className="text-yellow-400 font-bold text-sm">Optimize Page Weight</div>
                                <div className="text-gray-300 text-xs">
                                  Page size is {(results.bytes / 1024 / 1024).toFixed(1)}MB - consider image optimization
                                </div>
                              </div>
                            </div>
                        )}

                        <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"/>
                          <div>
                            <div className="text-green-400 font-bold text-sm">Enable Compression</div>
                            <div className="text-gray-300 text-xs">Reduce data transfer with Gzip/Brotli compression</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"/>
                          <div>
                            <div className="text-green-400 font-bold text-sm">Implement Caching</div>
                            <div className="text-gray-300 text-xs">Reduce server load with browser and CDN caching</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"/>
                          <div>
                            <div className="text-green-400 font-bold text-sm">Optimize Images</div>
                            <div className="text-gray-300 text-xs">Use modern formats (WebP, AVIF) and lazy loading</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"/>
                          <div>
                            <div className="text-green-400 font-bold text-sm">Minimize JavaScript</div>
                            <div className="text-gray-300 text-xs">Remove unused code and optimize bundle size</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Full Website Scan CTA (only show if we haven't done a full scan yet) */}
                  {results.numberOfPagesScanned === 1 && (
                      <FullScanCTA
                          hostname={new URL(results.url).hostname}
                          onStartFullScanAction={async () => {
                            setIsFullScan(true)
                            setScanInProgress(true)
                            await startFullScan()
                          }}
                          buttonProps={{
                            className: "bg-green-500 hover:bg-green-600 text-black font-bold",
                          }}
                      />
                  )}
                </CardContent>
              </Card>
              {/* Additional Pages Section */}
              <AdditionalPages
                  pages={results.additionalPages}
                  totalPagesScanned={results.numberOfPagesScanned}
                  hostname={new URL(results.url).hostname}
                  onPageClick={handlePageClick}
                  emptyMessage="No additional pages have been scanned yet. Use the 'Scan Entire Website' option to analyze more pages."
              />
            </div>
        )}
      </div>
    </div>
  )
}
