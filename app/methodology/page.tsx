"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calculator, Globe, Zap, Leaf, Server, Database } from "lucide-react"
import Link from "next/link"

export default function MethodologyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/scanner">
                        <Button variant="ghost" className="text-green-400 hover:text-green-300 mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Scanner
                        </Button>
                    </Link>

                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 shadow-lg shadow-green-500/50">
                            <Calculator className="w-10 h-10 text-black" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2">Calculation Methodology</h1>
                        <p className="text-green-400 text-lg">How we measure your website's carbon footprint</p>
                    </div>
                </div>

                {/* Overview */}
                <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Green Lantern Carbon Analysis
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                            Our environmental scanning protocol uses industry-standard methodologies
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-gray-300">
                            <p className="mb-4">
                                The Green Lantern Web Scanner uses the same calculation methodology as leading carbon footprint tools,
                                based on research from the{" "}
                                <a
                                    href="https://sustainablewebdesign.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-300 underline"
                                >
                                    Sustainable Web Design community
                                </a>{" "}
                                and the{" "}
                                <a
                                    href="https://www.websitecarbon.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-400 hover:text-green-300 underline"
                                >
                                    Website Carbon Calculator
                                </a>
                                .
                            </p>
                            <p>
                                Our Power Ring technology analyzes multiple factors to determine your website's environmental impact,
                                providing accurate measurements that help you join the fight against digital pollution.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Calculation Steps */}
                <div className="grid gap-6 mb-8">
                    {/* Step 1: Data Transfer */}
                    <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-green-400 flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                Step 1: Data Transfer Measurement
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-gray-300">
                                    <p className="mb-3">We measure the total bytes transferred when loading your webpage, including:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>HTML, CSS, and JavaScript files</li>
                                        <li>Images, videos, and other media</li>
                                        <li>Fonts and external resources</li>
                                        <li>Third-party scripts and analytics</li>
                                    </ul>
                                </div>
                                <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                                    <div className="text-green-400 font-bold text-sm">Formula:</div>
                                    <div className="text-white text-sm font-mono">Total Bytes = Sum of all HTTP requests</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 2: Adjusted Bytes */}
                    <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-green-400 flex items-center gap-2">
                                <Server className="w-5 h-5" />
                                Step 2: Caching Adjustment
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-gray-300">
                                    <p className="mb-3">
                                        We account for browser caching and CDN efficiency. Return visitors typically download ~75% fewer
                                        bytes due to cached resources.
                                    </p>
                                </div>
                                <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                                    <div className="text-green-400 font-bold text-sm">Formula:</div>
                                    <div className="text-white text-sm font-mono">Adjusted Bytes = Total Bytes × 0.75</div>
                                    <div className="text-gray-400 text-xs mt-1">
                                        Based on{" "}
                                        <a
                                            href="https://httparchive.org/reports/state-of-the-web"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            HTTP Archive research
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 3: Energy Consumption */}
                    <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-green-400 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Step 3: Energy Consumption
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-gray-300">
                                    <p className="mb-3">We calculate energy consumption across the entire internet infrastructure:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>Data centers and servers (hosting)</li>
                                        <li>Network transmission (internet backbone)</li>
                                        <li>End-user devices (computers, phones)</li>
                                    </ul>
                                </div>
                                <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                                    <div className="text-green-400 font-bold text-sm">Formula:</div>
                                    <div className="text-white text-sm font-mono">Energy (kWh) = Adjusted Bytes × 0.00000168</div>
                                    <div className="text-gray-400 text-xs mt-1">
                                        Based on{" "}
                                        <a
                                            href="https://onlinelibrary.wiley.com/doi/full/10.1111/jiec.12630"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            Aslan et al. (2018) research
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 4: CO2 Emissions */}
                    <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-green-400 flex items-center gap-2">
                                <Leaf className="w-5 h-5" />
                                Step 4: Carbon Emissions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-gray-300">
                                    <p className="mb-3">
                                        We convert energy consumption to CO₂ emissions using global electricity grid intensity factors:
                                    </p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-red-500/10 p-3 rounded border border-red-500/30">
                                        <div className="text-red-400 font-bold text-sm">Standard Grid Energy:</div>
                                        <div className="text-white text-sm font-mono">CO₂ = Energy × 475g/kWh</div>
                                        <div className="text-gray-400 text-xs mt-1">Global average grid intensity</div>
                                    </div>
                                    <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                                        <div className="text-green-400 font-bold text-sm">Renewable Energy:</div>
                                        <div className="text-white text-sm font-mono">CO₂ = Energy × 430g/kWh</div>
                                        <div className="text-gray-400 text-xs mt-1">Green hosting providers</div>
                                    </div>
                                </div>
                                <div className="text-gray-400 text-xs">
                                    Intensity factors from{" "}
                                    <a
                                        href="https://www.iea.org/reports/global-energy-co2-status-report-2019"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-400 hover:text-green-300 underline"
                                    >
                                        IEA Global Energy & CO₂ Status Report
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 5: Green Hosting Detection */}
                    <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-green-400 flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                Step 5: Green Hosting Detection
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="text-gray-300">
                                    <p className="mb-3">We check if your hosting provider uses renewable energy sources:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>Cross-reference with Green Web Foundation database</li>
                                        <li>Check hosting provider sustainability commitments</li>
                                        <li>Verify renewable energy certificates</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
                                    <div className="text-blue-400 font-bold text-sm">Data Sources:</div>
                                    <div className="text-gray-300 text-sm">
                                        <a
                                            href="https://www.thegreenwebfoundation.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            Green Web Foundation
                                        </a>{" "}
                                        - Global directory of green hosting providers
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Ranking */}
                <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                            <Calculator className="w-5 h-5" />
                            Performance Ranking System
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="text-gray-300">
                                <p className="mb-4">
                                    Your website's rank is calculated by comparing its carbon footprint against our database of tested
                                    websites:
                                </p>
                            </div>
                            <div className="bg-green-500/10 p-3 rounded border border-green-500/30">
                                <div className="text-green-400 font-bold text-sm">Ranking Formula:</div>
                                <div className="text-white text-sm font-mono">Top Rank % = (1 - cleanerThan) × 100</div>
                                <div className="text-gray-300 text-sm mt-2">
                                    If your site is cleaner than 83% of websites, you rank in the <strong>Top 17%</strong>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <div className="text-green-400 font-bold text-sm">Green Lantern Ranks:</div>
                                    <ul className="text-sm text-gray-300 space-y-1">
                                        <li>
                                            🟢 <strong>Green Lantern Elite:</strong> Top 20% + Green Hosting
                                        </li>
                                        <li>
                                            🟢 <strong>Green Guardian:</strong> Top 40% + Green Hosting
                                        </li>
                                        <li>
                                            🔵 <strong>Earth Defender:</strong> Top 30% (any hosting)
                                        </li>
                                        <li>
                                            🔴 <strong>Needs Power Ring:</strong> Below Top 30%
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-green-400 font-bold text-sm">Benchmark Data:</div>
                                    <div className="text-sm text-gray-300">
                                        Rankings based on analysis of over 2.8 billion websites from the{" "}
                                        <a
                                            href="https://httparchive.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            HTTP Archive
                                        </a>{" "}
                                        and real-world carbon footprint measurements.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* External Resources */}
                <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            Learn More About Web Sustainability
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <h4 className="text-white font-bold">Research & Standards:</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a
                                            href="https://sustainablewebdesign.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            Sustainable Web Design
                                        </a>
                                        <div className="text-gray-400 text-xs">Community guidelines and best practices</div>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.websitecarbon.com/how-does-it-work/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            Website Carbon Calculator
                                        </a>
                                        <div className="text-gray-400 text-xs">Detailed methodology explanation</div>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.thegreenwebfoundation.org/tools/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            Green Web Foundation Tools
                                        </a>
                                        <div className="text-gray-400 text-xs">Green hosting verification tools</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-white font-bold">Academic Research:</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <a
                                            href="https://onlinelibrary.wiley.com/doi/full/10.1111/jiec.12630"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            Electricity Intensity of Internet Data
                                        </a>
                                        <div className="text-gray-400 text-xs">Aslan et al. (2018) - Energy consumption model</div>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.iea.org/reports/data-centres-and-data-transmission-networks"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            IEA Data Centres Report
                                        </a>
                                        <div className="text-gray-400 text-xs">Global energy consumption analysis</div>
                                    </li>
                                    <li>
                                        <a
                                            href="https://httparchive.org/reports/state-of-the-web"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-400 hover:text-green-300 underline"
                                        >
                                            HTTP Archive State of the Web
                                        </a>
                                        <div className="text-gray-400 text-xs">Web performance and caching statistics</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Back to Scanner */}
                <div className="text-center">
                    <Link href="/scanner">
                        <Button className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3">
                            <Zap className="w-5 h-5 mr-2" />
                            Return to Scanner
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
