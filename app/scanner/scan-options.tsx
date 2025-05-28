"use client"

import { Search, Layers } from "lucide-react"

interface ScanOptionsProps {
    isFullScan: boolean
    onScanTypeChangeAction: (isFullScan: boolean) => void
}

export function ScanOptions({ isFullScan, onScanTypeChangeAction }: ScanOptionsProps) {
    return (
        <div className="flex items-center space-x-2">
            <div
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-all ${
                    !isFullScan ? "border-green-500 bg-green-500/20" : "border-gray-600 bg-gray-700/30 hover:bg-gray-700/50"
                }`}
                onClick={() => onScanTypeChangeAction(false)}
            >
                <Search className={`w-5 h-5 ${!isFullScan ? "text-green-400" : "text-gray-400"}`} />
                <div>
                    <div className={`font-bold ${!isFullScan ? "text-green-400" : "text-gray-300"}`}>Single Page Scan</div>
                    <div className="text-xs text-gray-400">Analyze only the URL provided</div>
                </div>
            </div>

            <div
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer border transition-all ${
                    isFullScan ? "border-green-500 bg-green-500/20" : "border-gray-600 bg-gray-700/30 hover:bg-gray-700/50"
                }`}
                onClick={() => onScanTypeChangeAction(true)}
            >
                <Layers className={`w-5 h-5 ${isFullScan ? "text-green-400" : "text-gray-400"}`} />
                <div>
                    <div className={`font-bold ${isFullScan ? "text-green-400" : "text-gray-300"}`}>Full Website Scan</div>
                    <div className="text-xs text-gray-400">Crawl and analyze multiple pages</div>
                </div>
            </div>
        </div>
    )
}
