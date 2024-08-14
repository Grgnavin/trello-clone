'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@radix-ui/react-label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import axios from "axios";
import { ApiResponse } from '@/Schemas/ApiResponse';
import { Status, Priority } from "@/models/taskModel";


  //name, description, Deadline, status, priority
  interface FormData {
    name: string;
    description: string;
    deadline: Date | undefined; // Updated type definition
    priority: Priority;
    status: Status;
  }

const CreateTask = () => {
  const [data, setData] = useState<FormData>({
    name: "",
    description: "",
    deadline: undefined,
    priority: Priority,
    status: Status
  });
  const { toast } = useToast();
  const router = useRouter();
  
  const CancelHandler = () => {
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setData(prevData => ({
      ...prevData,
      deadline: date
    }));
  };

  const CreateTask =async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<ApiResponse>('/api/task', { data } , { withCredentials: true });
      console.log(res);
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 p-4">
      <Card className="w-[750px] bg-white">
        <CardHeader className='items-center'>
          <CardTitle>Create Your Task</CardTitle>
          <CardDescription>Please select all the things listed below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={CreateTask}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of your task</Label>
                <Input 
                    id="name" 
                    placeholder="Name of your task" 
                    value={data.name}
                    onChange={handleInputChange} // Use the handler
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select 
                    value={data.status} 
                    onValueChange={(value) => setData(prevData => ({ ...prevData, status: value }))}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select Status"/>
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={Status.TODO}>TODO</SelectItem>
                    <SelectItem value={Status.IN_PROGRESS}>IN_PROGRESS</SelectItem>
                    <SelectItem value={Status.UNDER_REVIEW}>UNDER_REVIEW</SelectItem>
                    <SelectItem value={Status.FINISHED}>FINISHED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="priority">Priority</Label>
                <Select
                    value={data.priority}
                    onValueChange={(value) => setData(prevData => ({ ...prevData, priority: value }))}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={Priority.Low}>Low</SelectItem>
                    <SelectItem value={Priority.Medium}>Medium</SelectItem>
                    <SelectItem value={Priority.Urgent}>Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !data.deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.deadline ? format(data.deadline, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
                    <Calendar
                      mode="single"
                      selected={data.deadline}
                      onDayClick={handleDateChange} // Ensure correct handler
                      initialFocus
                      className="react-calendar"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    placeholder="Type your description here." 
                    id="description"
                    value={data.description}
                    onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">
                  Give a brief description about your task
                </p>
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={CancelHandler}>Cancel</Button>
              <Button type='submit'>Create</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default CreateTask;
