import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {AlertTriangle, Shield, XCircle} from "lucide-react";
import {CarbonRating} from "@/types/scanner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCarbonRating(cleanerThan: number): CarbonRating {
  const score = cleanerThan
  if (score <= 10)
    return {
      level: "Green Lantern Elite",
      color: "bg-green-400",
      icon: Shield,
      message: "Exceptional environmental guardian!",
    }
  if (score > 10 && score <=30)
    return {
      level: "Green Guardian",
      color: "bg-green-600",
      icon: Shield,
      message: "Strong environmental protector!",
    }

  if (score > 30 && score <= 50)
    return {
      level: "Green Ally",
      color: "bg-green-800",
      icon: Shield,
      message: "Green hosting verified, though performance could improve!",
    }

  if (score > 50 && score <= 70)
    return {
      level: "Earth Defender",
      color: "bg-yellow-500",
      icon: AlertTriangle,
      message: "Good performance, but green hosting status unknown!",
    }

  if (score > 70 && score <= 90)
    return {
      level: "Earth Defender",
      color: "bg-red-500",
      icon: AlertTriangle,
      message: "Good performance, but green hosting status unknown!",
    }

  return {
    level: "Needs Power Ring",
    color: "black",
    textColor: "white",
    icon: XCircle,
    message: "Critical optimization needed!",
  }
}
