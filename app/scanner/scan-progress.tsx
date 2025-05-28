"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Server, Wifi, Database, Leaf, Globe, Layers } from "lucide-react"

interface ScanProgressProps {
    type: "single" | "full"
    progress?: number
    pagesFound?: number
    currentPageNumber?: number
    hostname?: string
}

export function ScanProgress({ type, progress = 66, pagesFound, currentPageNumber, hostname }: ScanProgressProps) {
    const formatNumber = (num: number) => num.toLocaleString()

    if (type === "single") {
        return (
            <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm mb-8">
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="text-green-400 font-bold mb-2">Power Ring Analysis in Progress...</div>
                            <Progress value={progress} className="h-3 bg-gray-600" />
                            <div className="text-gray-400 text-sm mt-2">
                                Analyzing page #{currentPageNumber ? formatNumber(currentPageNumber) : "..."} in our environmental
                                database
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="text-center text-gray-300">
                                <Server className="w-6 h-6 mx-auto mb-1 text-green-400" />
                                Server Analysis
                            </div>
                            <div className="text-center text-gray-300">
                                <Wifi className="w-6 h-6 mx-auto mb-1 text-green-400" />
                                Data Transfer
                            </div>
                            <div className="text-center text-gray-300">
                                <Database className="w-6 h-6 mx-auto mb-1 text-green-400" />
                                Resource Usage
                            </div>
                            <div className="text-center text-gray-300">
                                <Leaf className="w-6 h-6 mx-auto mb-1 text-green-400" />
                                Carbon Impact
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm mb-8">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="text-center">
                        <div className="text-green-400 font-bold mb-2">Full Website Scan in Progress...</div>
                        <Progress value={progress} className="h-3 bg-gray-600" />
                        <div className="text-gray-400 text-sm mt-2">
                            Scanning {pagesFound} pages found on {hostname}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center text-gray-300">
                            <Globe className="w-6 h-6 mx-auto mb-1 text-green-400" />
                            Crawling Pages
                        </div>
                        <div className="text-center text-gray-300">
                            <Layers className="w-6 h-6 mx-auto mb-1 text-green-400" />
                            Analyzing Structure
                        </div>
                        <div className="text-center text-gray-300">
                            <Database className="w-6 h-6 mx-auto mb-1 text-green-400" />
                            Processing Resources
                        </div>
                        <div className="text-center text-gray-300">
                            <Leaf className="w-6 h-6 mx-auto mb-1 text-green-400" />
                            Calculating Emissions
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
