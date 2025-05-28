interface Co2 {
    grid: {
        grams: number;
        litres: number;
    };
    renewable: {
        grams: number;
        litres: number;
    };
}

export interface Statistic {
    adjustedBytes: number;
    energy: number;
    co2: Co2;
}

export interface WebsiteCarbonApiResponse {
    url: string;
    green: boolean;
    bytes: number;
    cleanerThan: number;
    statistics: Statistic;
}
export interface FullScanCarbonAnalysisResponseApi {
    url: string;
    totalBytes: number;
    averageCleanerThan: number;
    green: boolean;
    totalAdjustedBytes: number;
    totalEnergy: number;
    totalCo2: {
        grid: {
            grams: number;
            litres: number;
        };
        renewable: {
            grams: number;
            litres: number;
        };
    };
    numberOfPagesScanned: number; // 👈 NEW
    results?: WebsiteCarbonApiResponse[];
}

export interface ScanResults {
    url: string
    green: boolean | "unknown"
    bytes: number
    cleanerThan: number
    pageNumber: number
    numberOfPagesScanned: number
    additionalPages: AdditionalPageResult[]
    statistics: {
        adjustedBytes: number
        energy: number
        co2: {
            grid: {
                grams: number
                litres: number
            }
            renewable: {
                grams: number
                litres: number
            }
        }
    }
}

export interface AdditionalPageResult {
    id: string
    url: string
    path: string
    green: boolean | "unknown"
    bytes: number
    cleanerThan: number
    co2Grams: number
}

export interface ScanOption {
    id: string
    title: string
    description: string
    icon: React.ElementType
}

export interface ScanStage {
    icon: React.ElementType
    label: string
}

export interface BadgeSize {
    name: string
    width: number
    height: number
    scale: number
}

export interface HostingStatus {
    text: string
    color: string
}

export interface CarbonRating {
    level: string
    color: string
    icon: React.ElementType
    message: string
}
