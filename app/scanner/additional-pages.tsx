import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChevronDown, ChevronUp, Database, Globe} from "lucide-react";
import {AdditionalPageResult} from "@/types/scanner";
import {useState} from "react";
import {AdditionalResult} from "@/app/scanner/additional-result";
import { Button } from "@/components/ui/button";

export interface AdditionalPagesProps {
    pages: AdditionalPageResult[]
    totalPagesScanned: number
    hostname: string
    emptyMessage?: string
    maxDisplayedPages?: number
    className?: string
    onPageClick?: (page: AdditionalPageResult) => void
}

export function AdditionalPages({
                                    pages,
                                    totalPagesScanned,
                                    hostname,
                                    emptyMessage = "No additional pages scanned",
                                    maxDisplayedPages = 3,
                                    className = "",
                                }: AdditionalPagesProps) {
    const [showAll, setShowAll] = useState(false)

    if (pages.length === 0) {
        return (
            <Card className={`bg-gray-800/90 border-green-500/30 backdrop-blur-sm ${className}`}>
                <CardContent className="py-6 text-center text-gray-400">{emptyMessage}</CardContent>
            </Card>
        )
    }
    // Limit the number of pages displayed
    const displayedPages = pages.slice(0, maxDisplayedPages)
    const remainingPages = totalPagesScanned - displayedPages.length
    return (
        <Card className={`bg-gray-800/90 border-green-500/30 backdrop-blur-sm ${className}`}>
            <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Other Pages Scanned for This Domain
                </CardTitle>
                <CardDescription className="text-gray-300">
                    Additional pages from {hostname} analyzed by the Green Lantern Corps
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {displayedPages.map((page) => (
                        <AdditionalResult key={page.id} page={page} />
                    ))}

                    {showAll &&
                        pages.slice(maxDisplayedPages).map((page) => (
                            <AdditionalResult key={page.id} page={page} />
                        ))}

                    {remainingPages > 0 && !showAll ? (
                        <div
                            onClick={() => setShowAll(!showAll)}
                            className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30 cursor-pointer hover:bg-green-500/20 transition-colors"
                        >
                            <div className="text-green-400 font-bold text-sm mb-1">
                                + {remainingPages} more page{remainingPages > 1 ? "s" : ""} scanned
                            </div>
                            <div className="text-gray-300 text-xs">
                                The Green Lantern Corps has analyzed {totalPagesScanned} total pages from this domain
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => setShowAll(!showAll)}
                            className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30 cursor-pointer hover:bg-green-500/20 transition-colors"
                        >
                            <div className="text-green-400 font-bold text-sm mb-1">
                                Show Less
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}