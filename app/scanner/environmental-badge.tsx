import {Globe, Leaf, Shield} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {BadgePreview} from "@/app/scanner/badge-preview";
import {getCarbonRating} from "@/lib/utils";

interface BadgeProps {
    cleanerThan: number
    green: boolean | null
    url: string
}

export const  EnvironmentalBadge = ({ cleanerThan, green, url }: BadgeProps)=> {
    const percentage = Math.round(cleanerThan * 100)
    const rating = getCarbonRating(cleanerThan, green)

    const getHostingStatus = () => {
        if (green === true) return { text: "✓ GREEN HOSTING", color: "#10b981" }
        if (green === false) return { text: "✗ STANDARD HOSTING", color: "#ef4444" }
        return { text: "? HOSTING UNKNOWN", color: "#6b7280" }
    }

    const downloadBadge = (size: "small" | "medium" | "large" = "medium") => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size based on requested size
        const sizes = {
            small: { width: 300, height: 150, scale: 0.75 },
            medium: { width: 400, height: 200, scale: 1 },
            large: { width: 500, height: 250, scale: 1.25 },
        }

        const { width, height, scale } = sizes[size]
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
        ctx.fillStyle = "#ffffff"
        ctx.font = `bold ${48 * scale}px Arial`
        ctx.fillText(`${percentage}%`, 20 * scale, 110 * scale)

        // Rating text
        ctx.fillStyle = "#10b981"
        ctx.font = `bold ${16 * scale}px Arial`
        ctx.fillText("CLEANER THAN", 20 * scale, 130 * scale)
        ctx.fillText("OTHER WEBSITES", 20 * scale, 150 * scale)

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
        const hostingStatus = getHostingStatus()
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

        // Download the badge
        const link = document.createElement("a")
        link.download = `green-lantern-badge-${percentage}percent-${size}.png`
        link.href = canvas.toDataURL("image/png", 1.0)
        link.click()
    }

    const copyEmbedCode = () => {
        const hostingStatus = getHostingStatus()
        const embedCode = `<!-- Green Lantern Carbon Scanner Badge -->
<div style="display: inline-block; padding: 15px; background: linear-gradient(135deg, #000 0%, #1f2937 50%, #065f46 100%); border: 2px solid #10b981; border-radius: 8px; color: white; font-family: Arial, sans-serif; text-align: center; max-width: 220px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
  <div style="color: #10b981; font-weight: bold; font-size: 12px; margin-bottom: 5px;">GREEN LANTERN CARBON SCANNER</div>
  <div style="font-size: 28px; font-weight: bold; margin: 8px 0; color: #ffffff;">${percentage}%</div>
  <div style="color: #10b981; font-size: 11px; margin-bottom: 8px;">CLEANER THAN OTHER WEBSITES</div>
  <div style="background: ${rating.color.replace("bg-", "").replace("-500", "").replace("-400", "")}; color: ${rating.color.includes("yellow") || rating.color.includes("green") ? "#000" : "#fff"}; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-bottom: 8px; display: inline-block;">${rating.level.toUpperCase()}</div>
  <div style="color: ${hostingStatus.color}; font-size: 9px; margin-bottom: 5px;">${hostingStatus.text}</div>
  <div style="color: #6b7280; font-size: 8px;">Verified by Green Lantern Scanner</div>
</div>
<!-- End Green Lantern Badge -->`

        navigator.clipboard.writeText(embedCode).then(() => {
            alert("Embed code copied to clipboard! Paste this HTML code on your website to display your environmental badge.")
        })
    }

    const hostingStatus = getHostingStatus()

    return (
        <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                    <Shield className="w-5 h-5"/>
                    Environmental Performance Badge
                </CardTitle>
                <CardDescription className="text-gray-300">
                    Download and display your website's environmental achievement
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col lg:flex-row h-[200px]  gap-6 items-center">
                    {/* Badge Preview */}
                    <BadgePreview percentage={percentage} rating={rating} hostingStatus={hostingStatus} url={url}/>

                    {/* Actions */}
                    <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <div className="space-y-2">
                            <div className="text-sm font-bold text-green-400 mb-2">Download Badge:</div>
                            <div className="grid grid-cols-3 gap-2">
                                <Button
                                    onClick={() => downloadBadge("small")}
                                    variant="outline"
                                    className="border-green-500/50 text-green-400 hover:bg-green-500/10 text-xs px-3 py-2"
                                >
                                    Small
                                </Button>
                                <Button
                                    onClick={() => downloadBadge("medium")}
                                    className="bg-green-500 hover:bg-green-600 text-black font-bold text-xs px-3 py-2"
                                >
                                    Medium
                                </Button>
                                <Button
                                    onClick={() => downloadBadge("large")}
                                    variant="outline"
                                    className="border-green-500/50 text-green-400 hover:bg-green-500/10 text-xs px-3 py-2"
                                >
                                    Large
                                </Button>
                            </div>
                        </div>

                        <Button
                            onClick={copyEmbedCode}
                            variant="outline"
                            className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-6 py-3"
                        >
                            <Globe className="w-5 h-5 mr-2"/>
                            Copy Embed Code
                        </Button>

                        <div className="text-xs text-gray-400 max-w-xs">
                            <strong>For Website Owners:</strong> Download the badge image or copy the embed code to
                            showcase your
                            environmental performance on your website.
                        </div>

                        {green === null && (
                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                                <div className="text-blue-400 font-bold text-sm mb-1">⚠️ Hosting Status Unknown</div>
                                <div className="text-gray-300 text-xs">
                                    Your badge shows "Hosting Unknown" because we couldn't verify if your hosting
                                    provider uses renewable
                                    energy. Contact your hosting provider to confirm their green energy practices.
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Badge Information */}
                <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                        <Leaf className="w-4 h-4"/>
                        Badge Achievement Details
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-gray-300">Performance Level:</div>
                            <div className="text-white font-bold">{rating.level}</div>
                        </div>
                        <div>
                            <div className="text-gray-300">Environmental Score:</div>
                            <div className="text-white font-bold">{percentage}% cleaner than average</div>
                        </div>
                        <div>
                            <div className="text-gray-300">Green Hosting:</div>
                            <div className="text-white font-bold" style={{color: hostingStatus.color}}>
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
                                • <strong>Download:</strong> Choose small (300px), medium (400px), or large (500px)
                                badge
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