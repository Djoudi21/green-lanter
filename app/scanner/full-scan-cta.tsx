"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Layers, Globe } from "lucide-react"
type ButtonProps = React.ComponentProps<typeof Button>

export interface FullScanCTAProps {
    hostname: string
    onStartFullScanAction: () => void
    title?: string
    description?: string
    buttonText?: string
    buttonIcon?: React.ElementType
    buttonProps?: ButtonProps
    className?: string
}

export function FullScanCTA({
                            hostname,
                            onStartFullScanAction,
                            title = "Enhance Your Analysis with a Full Website Scan",
                            description,
                            buttonText = "Scan Entire Website",
                            buttonIcon = Globe,
                            buttonProps,
                            className = "",
                            }: FullScanCTAProps) {
    const ButtonIcon = buttonIcon
    const defaultDescription = `For a more comprehensive environmental assessment, scan all pages on ${hostname}`

    return (
        <div className={`mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30 ${className}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="text-green-400 font-bold mb-1 flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        {title}
                    </h4>
                    <p className="text-gray-300 text-sm">{description || defaultDescription}</p>
                </div>
                <Button
                    onClick={onStartFullScanAction}
                    className="bg-green-500 hover:bg-green-600 text-black font-bold whitespace-nowrap"
                    {...buttonProps}
                >
                    <ButtonIcon className="w-4 h-4 mr-2" />
                    {buttonText}
                </Button>
            </div>
        </div>
    )
}
