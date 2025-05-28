"use client"

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {AlertTriangle, ArrowLeft, Calculator, CheckCircle, ExternalLink, Globe, Leaf, Shield, Zap,} from "lucide-react"
import Link from "next/link"
import {Scanning} from "@/app/scanner/scanning";
import {ScannerInterface} from "@/app/scanner/scanner-interface";
import {Progress} from "@/components/ui/progress";
import {EnvironmentalBadge} from "@/app/scanner/environmental-badge";
import {getCarbonRating} from "@/lib/utils";
import {AdditionalPages} from "@/app/scanner/additional-pages";

interface Co2 {
  grid: {
    grams: number;
    litres: number;
  };
  renewable: {
    grams: number;
    litres: number;
  };
}

export interface Statistic {
  adjustedBytes: number;
  energy: number;
  co2: Co2;
}

export interface WebsiteCarbonApiResponse {
  url: string;
  green: boolean;
  bytes: number;
  cleanerThan: number;
  statistics: Statistic;
}

interface Toto {
  url: string
  green: boolean
  totalBytes: number,
  averageCleanerThan: number,
  totalAdjustedBytes: number,
  totalEnergy: number,
  totalCo2: {
    grid: {
      grams: number,
      litres: number
    },
    renewable: {
      grams: number,
      litres: number
    }
  }
  numberOfPagesScanned: number;
  results?: WebsiteCarbonApiResponse[];
}

export interface ScanResults {
  url: string
  green: boolean
  bytes: number
  cleanerThan: number
  statistics: {
    adjustedBytes: number
    energy: number
    co2: {
      grid: {
        grams: number
        litres: number
      }
      renewable: {
        grams: number
        litres: number
      }
    }
  }
  numberOfPagesScanned: number;
  results?: WebsiteCarbonApiResponse[];
}

export default function WebScanner() {
  const [url, setUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState<ScanResults | null>(null)
  const [error, setError] = useState("")

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
    setIsScanning(true)
    setResults(null)
    const res= await fetch(`http://localhost:8080/carbon-scan?url=${url}`)
    const json: Toto = await res.json()
    console.log("JSON:", json)
    setResults({
      url: json.url,
      bytes: json.totalBytes,
      cleanerThan: json.averageCleanerThan,
      green: json.green,
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
      numberOfPagesScanned: json.numberOfPagesScanned,
      results: json.results ?? []
    })
    setIsScanning(false)

  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-green-400 hover:text-green-300 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2"/>
              Back to Base
            </Button>
          </Link>

          <div className="text-center">
            <div
                className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 shadow-lg shadow-green-500/50">
              <Globe className="w-10 h-10 text-black"/>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Power Ring Web Scanner</h1>
            <p className="text-green-400 text-lg">{"Scan any website's carbon footprint with Green Lantern precision"}</p>
          </div>
        </div>

        {/* Scanner Interface */}
        <ScannerInterface
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && scanWebsite()}
            error={error}
            onClick={scanWebsite}
            scanning={isScanning}
        />

        {/* Scanning Progress */}
        {isScanning && (
            <Scanning/>
        )}

        {results && (
            <div className="space-y-6">
              {/* Main Results Card */}
              <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Shield className="w-5 h-5"/>
                    Environmental Scan Results
                  </CardTitle>
                  <CardDescription className="text-gray-300 flex items-center gap-2">
                    {results.numberOfPagesScanned} pages scanned for this domain
                    <Link href="/methodology">
                      <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 p-1 h-auto">
                        <Calculator className="w-3 h-3 mr-1"/>
                        View Methodology
                        <ExternalLink className="w-3 h-3 ml-1"/>
                      </Button>
                    </Link>
                  </CardDescription> </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Carbon Performance */}
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-white">{Math.round(results.cleanerThan * 100)}%</div>
                      <div className="text-sm text-gray-400 mb-2">Cleaner than other websites</div>
                      {(() => {
                        const rating = getCarbonRating(results.cleanerThan, results.green)
                        const IconComponent = rating.icon
                        return (
                            <div className="space-y-3">
                              <Badge className={`${rating.color} rounded-3  xl text-black px-4 py-2 text-lg font-bold`}>
                                <IconComponent className="w-4 h-4 mr-2"/>
                                {rating.level}
                              </Badge>
                              <p className="text-green-400 font-medium">{rating.message}</p>
                            </div>
                        )
                      })()}
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Page Weight</span>
                        <span className="text-green-400 font-bold">{(results.bytes / 1024).toFixed(1)} KB</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Energy per Visit</span>
                        <span className="text-green-400 font-bold">
                        {(results.statistics.energy * 1000).toFixed(3)} Wh
                      </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">CO₂ Emissions</span>
                        <span className="text-green-400 font-bold">
                        {results.statistics.co2.grid.grams.toFixed(3)}g CO₂
                      </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Green Hosting</span>
                        <Badge className={results.green ? "bg-green-500 text-black" : "bg-red-500 text-white"}>
                          <Leaf className="w-3 h-3 mr-1"/>
                          {results.green ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Adjusted Bytes</span>
                        <span className="text-green-400 font-bold">
                        {(results.statistics.adjustedBytes / 1024).toFixed(1)} KB
                      </span>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Impact Visualization */}
                  <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                      <Leaf className="w-4 h-4"/>
                      Environmental Impact Analysis
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400">Grid Energy Impact</div>
                        <div className="text-white font-bold">{results.statistics.co2.grid.grams.toFixed(3)}g CO₂</div>
                        <div className="text-xs text-gray-500">
                          ≈ {results.statistics.co2.grid.litres.toFixed(3)} litres water equivalent
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400">Renewable Energy Impact</div>
                        <div className="text-white font-bold">
                          {results.statistics.co2.renewable.grams.toFixed(3)}g CO₂
                        </div>
                        <div className="text-xs text-gray-500">
                          ≈ {results.statistics.co2.renewable.litres.toFixed(3)} litres water equivalent
                        </div>
                      </div>
                    </div>

                    {/* Performance Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Worst Performers</span>
                        <span>Best Performers</span>
                      </div>
                      <div className="relative">
                        <Progress value={results.cleanerThan * 100} className="h-4 bg-gray-600"/>
                        <div
                            className="absolute top-0 left-0 h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                            style={{width: `${results.cleanerThan * 100}%`}}
                        />
                      </div>
                      <div className="text-center mt-2 text-sm text-green-400">
                        Your site performs better than {Math.round(results.cleanerThan * 100)}% of websites tested
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Pages Section */}
              <AdditionalPages results={results}/>

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

              {/* Environmental Badge */}
              <EnvironmentalBadge cleanerThan={results.cleanerThan} green={results.green} url={results.url}/>

              {/* Scan Another Button */}
              <div className="text-center">
                <Button
                    onClick={() => {
                      setUrl("")
                      setResults(null)
                      setError("")
                    }}
                    className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3"
                >
                  <Globe className="w-5 h-5 mr-2"/>
                  Scan Another Website
                </Button>
              </div>
            </div>
        )}
      </div>
    </div>
  )
}
