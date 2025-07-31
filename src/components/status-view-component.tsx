import React from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle, Ban } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type Status = "loading" | "error" | "empty" | "custom" | "failed"

interface StatusViewProps {
  status    :   Status
  message   ?:  string
  icon      ?:  React.ReactNode
  children  ?:  React.ReactNode
}

export const StatusView: React.FC<StatusViewProps> = ({
  status,
  message,
  icon,
  children,
}) => {
  if (children) return <div className="w-full text-center py-8">{children}</div>

  switch (status) {
    case "loading":
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-muted-foreground">
          <Loader2 className="animate-spin w-6 h-6" />
          <p>{message || "Loading, please wait..."}</p>
          <div className="w-1/2 max-w-md space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      )

    case "error":
      return (
        <Alert variant="destructive" className="max-w-md mx-auto mt-8 md:mt-72">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message || "Something went wrong. Please try again later."}</AlertDescription>
        </Alert>
      )

    case "failed":
      return (
        <Alert variant="warning" className="max-w-lg mx-auto mt-8 md:mt-72">
          <AlertTriangle className="h-5 w-5 !text-yellow-600 mt-1" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>{message || "Something went wrong. Please try again later."}</AlertDescription>
        </Alert>
      )

    case "empty":
      return (
        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground py-12">
          <Ban className="w-6 h-6" />
          <p>{message || "No data found."}</p>
        </div>
      )

    case "custom":
      return (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-muted-foreground">
          {icon}
          <p>{message}</p>
        </div>
      )

    default:
      return null
  }
}