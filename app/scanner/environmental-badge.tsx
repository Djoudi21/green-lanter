"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Globe, Leaf } from "lucide-react"
import {getCarbonRating} from "@/lib/utils";
import {BadgeSize, HostingStatus} from "@/types/scanner";

export interface BadgeProps {
    cleanerThan: number
    green: boolean | "unknown"
    url: string
    pageNumber: number
    pagesScannedForDomain: number
    badgeSizes?: Record<string, BadgeSize>
    onDownload?: (size: string, dataUrl: string) => void
    onCopyEmbed?: (code: string) => void
    className?: string
}

export function getHostingStatus(green: boolean | "unknown"): HostingStatus {
    if (green === true) return { text: "✓ GREEN HOSTING", color: "#10b981" }
    if (green === false) return { text: "✗ STANDARD HOSTING", color: "#ef4444" }
    return { text: "? HOSTING UNKNOWN", color: "#6b7280" }
}

export function EnvironmentalBadge({
                                       cleanerThan,
                                       green,
                                       url,
                                       pageNumber,
                                       pagesScannedForDomain,
                                       badgeSizes = {
                                           small: { name: "Small", width: 300, height: 150, scale: 0.75 },
                                           medium: { name: "Medium", width: 400, height: 200, scale: 1 },
                                           large: { name: "Large", width: 500, height: 250, scale: 1.25 },
                                       },
                                       onDownload,
                                       onCopyEmbed,
                                       className = "",
                                   }: BadgeProps) {
    const topRank = Math.round((1 - cleanerThan) * 100)
    const rating = getCarbonRating(cleanerThan)
    const hostingStatus = getHostingStatus(green)
    console.log("TOP", topRank)
    const downloadBadge = (size: string) => {
        const sizeConfig = badgeSizes[size]
        if (!sizeConfig) return

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const { width, height, scale } = sizeConfig
        canvas.width = width
        canvas.height = height

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, "#000000")
        gradient.addColorStop(0.5, "#1f2937")
        gradient.addColorStop(1, "#065f46")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        // Border
        ctx.strokeStyle = "#10b981"
        ctx.lineWidth = 3 * scale
        ctx.strokeRect(5 * scale, 5 * scale, width - 10 * scale, height - 10 * scale)

        // Green Lantern symbol background
        ctx.fillStyle = "rgba(16, 185, 129, 0.1)"
        ctx.beginPath()
        ctx.arc(width - 50 * scale, 50 * scale, 30 * scale, 0, 2 * Math.PI)
        ctx.fill()

        // Lightning bolt symbol
        ctx.fillStyle = "#10b981"
        ctx.font = `bold ${20 * scale}px Arial`
        ctx.fillText("⚡", width - 60 * scale, 60 * scale)

        // Title
        ctx.fillStyle = "#10b981"
        ctx.font = `bold ${18 * scale}px Arial`
        ctx.fillText("GREEN LANTERN", 20 * scale, 35 * scale)
        ctx.font = `${14 * scale}px Arial`
        ctx.fillText("CARBON SCANNER", 20 * scale, 55 * scale)

        // Main percentage
        ctx.fillText(`Top ${topRank}%`, 20 * scale, 110 * scale)
        ctx.fillText("ENVIRONMENTAL", 20 * scale, 130 * scale)
        ctx.fillText("PERFORMANCE", 20 * scale, 150 * scale)

        // Badge level
        const badgeColor = rating.color.includes("green")
            ? "#10b981"
            : rating.color.includes("yellow")
                ? "#f59e0b"
                : rating.color.includes("blue")
                    ? "#3b82f6"
                    : "#ef4444"

        ctx.fillStyle = badgeColor
        ctx.font = `bold ${12 * scale}px Arial`
        ctx.fillText(rating.level.toUpperCase(), 200 * scale, 130 * scale)

        // Green hosting indicator with proper unknown handling
        ctx.fillStyle = hostingStatus.color
        ctx.font = `${12 * scale}px Arial`
        ctx.fillText(hostingStatus.text, 200 * scale, 150 * scale)

        // Website URL (truncated if too long)
        ctx.fillStyle = "#9ca3af"
        ctx.font = `${10 * scale}px Arial`
        const maxUrlLength = size === "small" ? 35 : size === "medium" ? 45 : 55
        const displayUrl = url.length > maxUrlLength ? url.substring(0, maxUrlLength - 3) + "..." : url
        ctx.fillText(displayUrl, 20 * scale, height - 25 * scale)

        // Date
        const date = new Date().toLocaleDateString()
        ctx.fillText(`Scanned: ${date}`, 20 * scale, height - 10 * scale)

        // Add verification text
        ctx.fillStyle = "#6b7280"
        ctx.font = `${8 * scale}px Arial`
        ctx.fillText("Verified by Green Lantern Carbon Scanner", width - 200 * scale, height - 10 * scale)

        // Get the data URL and either download or call the callback
        const dataUrl = canvas.toDataURL("image/png", 1.0)

        if (onDownload) {
            onDownload(size, dataUrl)
        } else {
            // Default download behavior
            const link = document.createElement("a")
            link.download = `green-lantern-badge-top${topRank}percent-${size}.png`
            link.href = dataUrl
            link.click()
        }
    }

    const copyEmbedCode = () => {
        const embedCode = `<!-- Green Lantern Carbon Scanner Badge -->
<div style="display: inline-block; padding: 15px; background: linear-gradient(135deg, #000 0%, #1f2937 50%, #065f46 100%); border: 2px solid #10b981; border-radius: 8px; color: white; font-family: Arial, sans-serif; text-align: center; max-width: 220px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="color: #10b981; font-weight: bold; font-size: 12px; margin-bottom: 5px;">GREEN LANTERN CARBON SCANNER</div>
  <div style="font-size: 28px; font-weight: bold; margin: 8px 0; color: #ffffff;">Top ${topRank}%</div>
  <div style="color: #10b981; font-size: 11px; margin-bottom: 8px;">ENVIRONMENTAL PERFORMANCE</div>
  <div style="background: ${rating.color.replace("bg-", "").replace("-500", "").replace("-400", "")}; color: ${rating.color.includes("yellow") || rating.color.includes("green") ? "#000" : "#fff"}; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-bottom: 8px; display: inline-block;">${rating.level.toUpperCase()}</div>
  <div style="color: ${hostingStatus.color}; font-size: 9px; margin-bottom: 5px;">${hostingStatus.text}</div>
  <div style="color: #6b7280; font-size: 8px;">Verified by Green Lantern Scanner</div>
</div>
<!-- End Green Lantern Badge -->`

        if (onCopyEmbed) {
            onCopyEmbed(embedCode)
        } else {
            // Default copy behavior
            navigator.clipboard.writeText(embedCode).then(() => {
                alert(
                    "Embed code copied to clipboard! Paste this HTML code on your website to display your environmental badge.",
                )
            })
        }
    }

    return (
        <Card className={`bg-gray-800/90 border-green-500/30 backdrop-blur-sm ${className}`}>
            <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Environmental Performance Badge
                </CardTitle>
                <CardDescription className="text-gray-300">
                    {"Download and display your website's environmental achievement"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex h-[250px] flex-col lg:flex-row gap-6 items-center">
                    {/* Badge Preview */}
                    <div className="flex-shrink-0 h-full">
                        <div className="relative w-80 h-full bg-gradient-to-br from-black via-gray-800 to-green-900 border-2 border-green-500 rounded-lg p-4 shadow-lg shadow-green-500/20">
                            {/* Green Lantern Symbol */}
                            <div className="absolute top-2 right-2 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                <Zap className="w-4 h-4 text-green-400" />
                            </div>

                            {/* Header */}
                            <div className="text-green-400 font-bold text-sm">GREEN LANTERN</div>
                            <div className="text-green-400 text-xs">CARBON SCANNER</div>

                            {/* Main Content */}
                            <div className="mt-6 flex items-end gap-4">
                                <div>
                                    <div className="text-white font-bold text-4xl">Top {topRank}%</div>
                                    <div className="text-green-400 text-xs font-bold">ENVIRONMENTAL</div>
                                    <div className="text-green-400 text-xs font-bold">PERFORMANCE</div>
                                </div>

                                <div className="flex-1">
                                    <Badge className={`${rating.color} text-black text-xs px-2 py-1 mb-2`}>
                                        {rating.level.toUpperCase()}
                                    </Badge>
                                    <div className="text-xs" style={{ color: hostingStatus.color }}>
                                        {hostingStatus.text}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="absolute bottom-2 left-4 right-4">
                                <div className="text-gray-400 text-xs truncate">{url}</div>
                                <div className="text-gray-500 text-xs">Scanned: {new Date().toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <div className="space-y-2">
                            <div className="text-sm font-bold text-green-400 mb-2">Download Badge:</div>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.entries(badgeSizes).map(([key, size]) => (
                                    <Button
                                        key={key}
                                        onClick={() => downloadBadge(key)}
                                        variant={key === "medium" ? "default" : "outline"}
                                        className={
                                            key === "medium"
                                                ? "bg-green-500 hover:bg-green-600 text-black font-bold text-xs px-3 py-2"
                                                : "border-green-500/50 text-green-400 hover:bg-green-500/10 text-xs px-3 py-2"
                                        }
                                    >
                                        {size.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Button
                            onClick={copyEmbedCode}
                            variant="outline"
                            className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-6 py-3"
                        >
                            <Globe className="w-5 h-5 mr-2" />
                            Copy Embed Code
                        </Button>

                        <div className="text-xs text-gray-400 max-w-xs">
                            <strong>For Website Owners:</strong> Download the badge image or copy the embed code to showcase your
                            environmental performance on your website.
                        </div>

                        {green === "unknown" && (
                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                                <div className="text-blue-400 font-bold text-sm mb-1">⚠️ Hosting Status Unknown</div>
                                <div className="text-gray-300 text-xs">
                                    Your badge shows "Hosting Unknown" because we couldn't verify if your hosting provider uses renewable
                                    energy. Contact your hosting provider to confirm their green energy practices.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Badge Information */}
                <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                        <Leaf className="w-4 h-4" />
                        Badge Achievement Details
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                            <div className="text-gray-300">Performance Level:</div>
                            <div className="text-white font-bold">{rating.level}</div>
                        </div>
                        <div>
                            <div className="text-gray-300">Environmental Rank:</div>
                            <div className="text-white font-bold">Top {topRank}% performer</div>
                        </div>
                        <div>
                            <div className="text-gray-300">Database Entry:</div>
                            <div className="text-white font-bold">Page #{pageNumber.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-gray-300">Domain Pages Scanned:</div>
                            <div className="text-white font-bold">{pagesScannedForDomain} pages</div>
                        </div>
                        <div>
                            <div className="text-gray-300">Green Hosting:</div>
                            <div className="text-white font-bold" style={{ color: hostingStatus.color }}>
                                {green === true ? "✓ Verified Green" : green === false ? "✗ Not Green" : "? Status Unknown"}
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-300">Scan Date:</div>
                            <div className="text-white font-bold">{new Date().toLocaleDateString()}</div>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-700/50 rounded border border-gray-600">
                        <div className="text-green-400 font-bold text-sm mb-2">How to Use Your Badge:</div>
                        <ul className="text-xs text-gray-300 space-y-1">
                            <li>
                                • <strong>Download:</strong> Choose small (300px), medium (400px), or large (500px) badge
                            </li>
                            <li>
                                • <strong>Embed:</strong> Copy HTML code to add directly to your website
                            </li>
                            <li>
                                • <strong>Display:</strong> Show on your homepage, footer, or about page
                            </li>
                            <li>
                                • <strong>Update:</strong> Re-scan monthly to keep your badge current
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
