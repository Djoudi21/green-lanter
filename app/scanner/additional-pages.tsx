import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Database, Globe} from "lucide-react";
import {getCarbonRating} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {ScanResults, WebsiteCarbonApiResponse} from "@/app/scanner/page";

export function AdditionalPages({results}: { results: ScanResults}) {
    const getPageRank = (page: WebsiteCarbonApiResponse): number => {
        return Math.round((1 - page.cleanerThan) * 100);
    };

    if (results.results?.length === 0) return null;

    return (
        <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                    <Database className="w-5 h-5"/>
                    Other Pages Scanned for This Domain
                </CardTitle>
                <CardDescription className="text-gray-300">
                    Additional pages from {new URL(results.url).hostname} analyzed by the Green Lantern Corps
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {results.results?.map((page, index) => {
                        const pageRank = getPageRank(page);
                        const pageRating = getCarbonRating(page.cleanerThan, page.green);

                        return (
                            <div key={index} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Globe className="w-4 h-4 text-green-400"/>
                                            <span className="text-white font-bold text-sm">{page.url}</span>
                                            <Badge className={`${pageRating.color} text-black text-xs px-2 py-1`}>
                                                Top {pageRank}%
                                            </Badge>
                                        </div>
                                        {/*<div className="text-gray-300 text-xs mb-2">{page.url}</div>*/}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                            <div>
                                                <div className="text-gray-400">Page Size:</div>
                                                <div
                                                    className="text-white font-bold">{(page.bytes / 1024).toFixed(0)} KB
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400">CO₂ per visit:</div>
                                                <div className="text-white font-bold">{page.statistics.co2.grid.grams.toFixed(2)}g</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-400">Performance:</div>
                                                <div className="text-white font-bold">{pageRating.level}</div>
                                            </div>
                                            {/*<div>*/}
                                            {/*    <div className="text-gray-400">Scanned:</div>*/}
                                            {/*    <div className="text-white font-bold">{page.scanDate}</div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <div className="text-green-400 font-bold text-lg">Top {pageRank}%</div>
                                            <div className="text-gray-400 text-xs">Environmental Rank</div>
                                        </div>
                                        <div
                                            className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                                            {pageRating.icon && <pageRating.icon className="w-6 h-6 text-green-400"/>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {results.results && results.numberOfPagesScanned > results.results.length + 1 && (
                        <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                            <div className="text-green-400 font-bold text-sm mb-1">
                                + {results.numberOfPagesScanned - results.results.length - 1} more pages
                                scanned
                            </div>
                            <div className="text-gray-300 text-xs">
                                The Green Lantern Corps has analyzed {results.numberOfPagesScanned} total pages from
                                this
                                domain
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}