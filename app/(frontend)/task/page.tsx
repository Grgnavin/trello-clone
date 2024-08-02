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

const CreateTask = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-4">
      <Card className="w-[750px] bg-white">
        <CardHeader className='items-center'>
          <CardTitle >Create Your Task</CardTitle>
          <CardDescription>Please select all the things listed below</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of your task</Label>
                <Input id="name" placeholder="Name of your task" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="TODO">TODO</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                    <SelectItem value="UNDER_REVIEW">UNDER_REVIEW</SelectItem>
                    <SelectItem value="FINISHED">FINISHED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
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
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="react-calendar"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Description</Label>
                <Textarea placeholder="Type your description here." id="message-2" />
                <p className="text-sm text-muted-foreground">
                  Give a brief description about your task
                </p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateTask;
