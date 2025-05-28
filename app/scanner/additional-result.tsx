import {cn, getCarbonRating} from "@/lib/utils";
import {Globe} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {AdditionalPageResult} from "@/types/scanner";

export const AdditionalResult = ({page}: {page: AdditionalPageResult}) => {
    const pageRank = Math.round((1 - page.cleanerThan) * 100)
    const pageRating = getCarbonRating(pageRank)

    return (
        <div
            key={page.id}
            className={`p-4 bg-gray-700/50 rounded-lg border border-gray-600`}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-4 h-4 text-green-400" />
                        <span className="text-white font-bold text-sm">{page.path}</span>
                        <Badge className={cn(`text-xs px-2 py-1`, pageRating.color, pageRating.textColor ? pageRating.textColor : 'text-black')}>Top {pageRank}%</Badge>
                    </div>
                    <div className="text-gray-300 text-xs mb-2">{page.url}</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                            <div className="text-gray-400">Page Size:</div>
                            <div className="text-white font-bold">{(page.bytes / 1024).toFixed(0)} KB</div>
                        </div>
                        <div>
                            <div className="text-gray-400">CO₂ per visit:</div>
                            <div className="text-white font-bold">{page.co2Grams.toFixed(2)}g</div>
                        </div>
                        <div>
                            <div className="text-gray-400">Performance:</div>
                            <div className="text-white font-bold">{pageRating.level}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="text-right">
                        <div className="text-green-400 font-bold text-lg">Top {pageRank}%</div>
                        <div className="text-gray-400 text-xs">Environmental Rank</div>
                    </div>
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        {pageRating.icon && <pageRating.icon className="w-6 h-6 text-green-400" />}
                    </div>
                </div>
            </div>
        </div>
    )
}