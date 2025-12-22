import "../index.css";
import { AlertCircle, RefreshCcw, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SDKError } from "@/utils/errors";

type Props = {
  context: SDKContext;
  err: SDKError;
  resetErrorBoundary?: () => void;
};

const SDKErrorFallback = ({ err, resetErrorBoundary }: Props) => {
  // Check if it's your custom error to access the 'recoverable' property
  const isRecoverable = err instanceof SDKError ? err.recoverable : false;
  console.log("should be render UI");
  return (
    <div className="flex items-center justify-center p-6 w-full min-h-[300px]">
      <Card className="w-full max-w-md border-destructive/50 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle className="text-xl">SDK Error</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Alert variant="destructive" className="bg-destructive/5">
            <AlertTitle className="font-semibold">
              {err.name || "Error"}
            </AlertTitle>
            <AlertDescription className="text-sm opacity-90">
              {err.message || "An unexpected error occurred within the SDK."}
            </AlertDescription>
          </Alert>

          <div className="text-xs text-muted-foreground flex flex-col gap-1 italic">
            <span>Recoverable: {isRecoverable ? "Yes" : "No"}</span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 justify-end border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <FileText className="mr-2 h-4 w-4" />
            View Logs
          </Button>

          {isRecoverable && resetErrorBoundary && (
            <Button variant="default" size="sm" onClick={resetErrorBoundary}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SDKErrorFallback;
