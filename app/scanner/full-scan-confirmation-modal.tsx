"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Globe, CreditCard, AlertTriangle, CheckCircle, Layers } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export interface FullScanConfirmationModalProps {
    isOpen: boolean
    onCloseAction: () => void
    onConfirmAction: () => void
    hostname: string
    estimatedPages?: number
    creditsPerPage?: number
    userCredits?: number
    isLoading?: boolean
}

export function FullScanConfirmationModal({
                                              isOpen,
                                              onCloseAction,
                                              onConfirmAction,
                                              hostname,
                                              estimatedPages = 15,
                                              creditsPerPage = 1,
                                              userCredits = 50,
                                              isLoading = false,
                                          }: FullScanConfirmationModalProps) {
    const [acknowledged, setAcknowledged] = useState(false)

    const totalCost = estimatedPages * creditsPerPage
    const remainingCredits = userCredits - totalCost
    const hasEnoughCredits = remainingCredits >= 0

    const handleConfirm = () => {
        onConfirmAction()
    }

    const handleClose = () => {
        setAcknowledged(false)
        onCloseAction()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-gray-800 border-green-500/30 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-green-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        Full Website Scan Confirmation
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        {`You're about to initiate a comprehensive scan of ${hostname}`}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Scan Details */}
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                        <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            Scan Details
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Target Website:</span>
                                <span className="text-white font-bold">{hostname}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Estimated Pages:</span>
                                <span className="text-white font-bold">~{estimatedPages} pages</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Credits per Page:</span>
                                <span className="text-white font-bold">{creditsPerPage} credit</span>
                            </div>
                        </div>
                    </div>

                    {/* Credit Cost */}
                    <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            Credit Usage
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Current Credits:</span>
                                <Badge variant="outline" className="border-green-500/50 text-green-400">
                                    {userCredits} credits
                                </Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Scan Cost:</span>
                                <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                                    -{totalCost} credits
                                </Badge>
                            </div>
                            <hr className="border-gray-600" />
                            <div className="flex justify-between font-bold">
                                <span className="text-gray-300">Remaining Credits:</span>
                                <Badge
                                    variant="outline"
                                    className={`${hasEnoughCredits ? "border-green-500/50 text-green-400" : "border-red-500/50 text-red-400"}`}
                                >
                                    {remainingCredits} credits
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Warning or Success Alert */}
                    {!hasEnoughCredits ? (
                        <Alert className="border-red-500/50 bg-red-500/10">
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                            <AlertDescription className="text-red-400">
                                <strong>Insufficient Credits!</strong> You need {Math.abs(remainingCredits)} more credits to complete
                                this scan.
                                <div className="mt-2">
                                    <Button
                                        size="sm"
                                        className="bg-green-500 hover:bg-green-600 text-black font-bold"
                                        onClick={() => {
                                            // In a real app, this would redirect to purchase credits
                                            console.log("Redirect to purchase credits")
                                        }}
                                    >
                                        <Zap className="w-3 h-3 mr-1" />
                                        Get More Credits
                                    </Button>
                                </div>
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Alert className="border-green-500/50 bg-green-500/10">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <AlertDescription className="text-green-400">
                                <strong>Ready to Scan!</strong> You have sufficient credits for this full website analysis.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Acknowledgment Checkbox */}
                    {hasEnoughCredits && (
                        <div className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                id="acknowledge"
                                checked={acknowledged}
                                onChange={(e) => setAcknowledged(e.target.checked)}
                                className="mt-1 h-4 w-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                            />
                            <label htmlFor="acknowledge" className="text-sm text-gray-300 cursor-pointer">
                                I understand that this scan will use <strong>{totalCost} credits</strong> and will analyze multiple
                                pages on {hostname} for comprehensive environmental assessment.
                            </label>
                        </div>
                    )}

                    {/* Benefits */}
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                        <h5 className="text-blue-400 font-bold text-sm mb-2">Full Scan Benefits:</h5>
                        <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Complete website carbon footprint analysis</li>
                            <li>• Page-by-page performance breakdown</li>
                            <li>• Comprehensive optimization recommendations</li>
                            <li>• Detailed environmental impact report</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!hasEnoughCredits || !acknowledged || isLoading}
                        className="bg-green-500 hover:bg-green-600 text-black font-bold"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                Starting Scan...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Start Full Scan ({totalCost} credits)
                            </div>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
