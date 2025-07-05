import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Issue, getPriorityColor, getTypeIcon } from "@/data/mockData"

interface TaskCardProps {
  issue: Issue
  onClick?: () => void
  className?: string
}

export function TaskCard({ issue, onClick, className = "" }: TaskCardProps) {
  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${className}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{getTypeIcon(issue.type)}</span>
            <span className="text-sm font-medium text-muted-foreground">{issue.id}</span>
          </div>
          <Badge className={`text-xs ${getPriorityColor(issue.priority)}`}>
            {issue.priority.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <h3 className="font-medium text-sm leading-tight mb-3 line-clamp-2">
          {issue.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-medium">
                {issue.assignee.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span>{issue.assignee}</span>
          </div>
          
          {issue.estimate && (
            <div className="flex items-center gap-1">
              <span>⏱️</span>
              <span>{issue.estimate}h</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}