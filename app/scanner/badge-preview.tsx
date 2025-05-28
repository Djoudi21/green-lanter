import {LucideProps, Zap} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import React from "react";

export function BadgePreview(props: {
    percentage: number,
    rating: {
        level: string;
        color: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        message: string
    },
    hostingStatus: { text: string; color: string },
    url: string
}) {
    return (
        <div className="flex-shrink-0 h-full">
            <div
                className="relative w-80 h-full bg-gradient-to-br from-black via-gray-800 to-green-900 border-2 border-green-500 rounded-lg p-4 shadow-lg shadow-green-500/20">
                {/* Green Lantern Symbol */}
                <div
                    className="absolute top-2 right-2 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-green-400"/>
                </div>

                {/* Header */}
                <div className="text-green-400 font-bold text-sm">GREEN LANTERN</div>
                <div className="text-green-400 text-xs">CARBON SCANNER</div>

                {/* Main Content */}
                <div className="mt-4 flex items-end gap-4">
                    <div>
                        <div className="text-white font-bold text-4xl">{props.percentage}%</div>
                        <div className="text-green-400 text-xs font-bold">CLEANER THAN</div>
                        <div className="text-green-400 text-xs font-bold">OTHER WEBSITES</div>
                    </div>

                    <div className="flex-1">
                        <Badge className={`${props.rating.color} text-black text-xs px-2 py-1 mb-2`}>
                            {props.rating.level.toUpperCase()}
                        </Badge>
                        <div className="text-xs" style={{color: props.hostingStatus.color}}>
                            {props.hostingStatus.text}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-2 left-4 right-4">
                    <div className="text-gray-400 text-xs truncate">{props.url}</div>
                    <div className="text-gray-500 text-xs">Scanned: {new Date().toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    )
}