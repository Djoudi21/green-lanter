import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AlertTriangle, Calculator, ExternalLink, Globe, Shield, Zap} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export function ScannerInterface(props: {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => false | Promise<void>,
  error: string,
  onClick: () => Promise<void>,
  scanning: boolean
}) {
  return <Card className="bg-gray-800/90 border-green-500/30 backdrop-blur-sm mb-8">
    <CardHeader className="text-center">
      <CardTitle className="text-2xl text-green-400 flex items-center justify-center gap-2">
        <Shield className="w-6 h-6"/>
        Environmental Scan Protocol
      </CardTitle>
      <CardDescription className="text-gray-300">
        Enter a website URL to analyze its digital carbon footprint
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <form className="space-y-6">
        <div className="space-y-2">
          <Label className="text-green-400 flex items-center gap-2">
            <Globe className="w-4 h-4"/>
            Website URL
          </Label>
          <Input
              type="url"
              placeholder="Enter website URL (e.g., example.com or https://example.com)"
              value={props.value}
              onChange={props.onChange}
              className="bg-gray-700 border-green-500/30 text-white placeholder-gray-400"
              onKeyPress={props.onKeyPress}
          />
        </div>

        {props.error && (
            <Alert className="border-red-500/50 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400"/>
              <AlertDescription className="text-red-400">{props.error}</AlertDescription>
            </Alert>
        )}

        <Button
            onClick={props.onClick}
            type={"button"}
            disabled={props.scanning || !props.value.trim()}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 text-lg shadow-lg shadow-green-500/30"
        >
          {props.scanning ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"/>
                Scanning with Power Ring...
              </div>
          ) : (
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5"/>
                Activate Environmental Scan
              </div>
          )}
        </Button>
      </form>

      {/* Methodology Link */}
      <div className="text-center">
        <Link href="/methodology">
          <Button variant="ghost" className="text-green-400 hover:text-green-300 text-sm">
            <Calculator className="w-4 h-4 mr-2" />
            How are these calculations made?
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>;
}