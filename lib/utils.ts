import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AlertTriangle, CheckCircle, XCircle} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCarbonRating(cleanerThan: number, green: boolean | null) {
  const score = cleanerThan * 100

  if (green === true && score >= 80)
    return {
      level: "Green Lantern Elite",
      color: "bg-green-500",
      icon: CheckCircle,
      message: "Exceptional environmental guardian with verified green hosting!",
    }
  if (green === true && score >= 60)
    return {
      level: "Green Guardian",
      color: "bg-green-400",
      icon: CheckCircle,
      message: "Strong environmental protector with verified green hosting!",
    }
  if (green === null && score >= 70)
    return {
      level: "Earth Defender",
      color: "bg-blue-500",
      icon: AlertTriangle,
      message: "Good performance, but green hosting status unknown!",
    }
  if (score >= 70)
    return {
      level: "Earth Defender",
      color: "bg-yellow-500",
      icon: AlertTriangle,
      message: "Good performance, consider green hosting!",
    }
  return {
    level: "Needs Power Ring",
    color: "bg-red-500",
    icon: XCircle,
    message: "Critical optimization needed - join the green hosting corps!",
  }
}
