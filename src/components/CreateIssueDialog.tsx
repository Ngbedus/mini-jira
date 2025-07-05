import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Issue } from "@/data/mockData"
import { useToast } from "@/hooks/use-toast"

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  type: z.enum(["story", "bug", "task"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  assignee: z.string().min(1, "Assignee is required"),
  estimate: z.number().min(1, "Estimate must be at least 1 hour").max(100, "Estimate must be less than 100 hours").optional(),
})

type CreateIssueForm = z.infer<typeof createIssueSchema>

interface CreateIssueDialogProps {
  children: React.ReactNode
  defaultStatus?: Issue['status']
  onCreateIssue: (issue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'>) => void
}

export function CreateIssueDialog({ children, defaultStatus = 'todo', onCreateIssue }: CreateIssueDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<CreateIssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "task",
      priority: "medium",
      assignee: "",
      estimate: undefined,
    },
  })

  const onSubmit = (data: CreateIssueForm) => {
    const newIssue: Omit<Issue, 'id' | 'createdAt' | 'updatedAt'> = {
      title: data.title,
      description: data.description,
      type: data.type,
      priority: data.priority,
      assignee: data.assignee,
      estimate: data.estimate,
      status: defaultStatus,
      reporter: "Current User", // In a real app, this would come from auth
    }
    
    onCreateIssue(newIssue)
    
    toast({
      title: "Issue created successfully",
      description: `${data.title} has been added to the ${defaultStatus} column.`,
    })
    
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Issue</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter issue title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the issue in detail..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="story">📖 Story</SelectItem>
                        <SelectItem value="bug">🐛 Bug</SelectItem>
                        <SelectItem value="task">✅ Task</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter assignee name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="estimate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimate (hours)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter estimate..." 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Issue</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}