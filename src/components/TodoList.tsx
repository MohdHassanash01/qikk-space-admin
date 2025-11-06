"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";

import { format } from "date-fns";

export default function TodoList() {

    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const [open, setOpen] = useState(false)
 
  return (
    <div >
      
      {/* calender  */}

<h1 className="text-lg font-medium mb-6">Todo List</h1>
      <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button className="w-full">
  <CalendarIcon />
  {date 
    ? format(date, "PPP") // Show formatted date (e.g., "July 29th, 2025")
    : <span>Pick a date</span> // Placeholder if no date is selected
  }
</Button>
  </PopoverTrigger>
  <PopoverContent  className="p-0 w-auto">
     <Calendar
    mode="single"
    selected={date}
    onSelect={(date) => {
        setDate(date)
        setOpen(false)
    }}
    className="rounded-lg border mx-auto"
  />
  </PopoverContent>
</Popover>

 

      {/* list  */}

<ScrollArea className="max-h-[400px] mt-4 overflow-y-auto flex gap-4">

<div className="flex flex-col gap-5">


<Card className="p-4">

<div className="flex items-center gap-4">
    <Checkbox id="item1" />
    <label htmlFor="item1" className="text-sm text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    </label>
</div>

</Card>


<Card className="p-4">

<div className="flex items-center gap-4">
    <Checkbox id="item1" />
    <label htmlFor="item1" className="text-sm text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    </label>
</div>

</Card>


<Card className="p-4">

<div className="flex items-center gap-4">
    <Checkbox id="item1" />
    <label htmlFor="item1" className="text-sm text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    </label>
</div>

</Card>

<Card className="p-4">

<div className="flex items-center gap-4">
    <Checkbox id="item1" />
    <label htmlFor="item1" className="text-sm text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    </label>
</div>

</Card>

<Card className="p-4">

<div className="flex items-center gap-4">
    <Checkbox id="item1" />
    <label htmlFor="item1" className="text-sm text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    </label>
</div>

</Card>

<Card className="p-4">

<div className="flex items-center gap-4">
    <Checkbox id="item1" />
    <label htmlFor="item1" className="text-sm text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    </label>
</div>

</Card>

<Card className="p-4">

<div className="flex items-center gap-4">
    <Checkbox id="item1" />
    <label htmlFor="item1" className="text-sm text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    </label>
</div>

</Card>

<Card className="p-4">

<div className="flex items-center gap-4">
    <Checkbox id="item1" />
    <label htmlFor="item1" className="text-sm text-muted-foreground">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
    </label>
</div>

</Card>

</div>

</ScrollArea>


    </div>
  )
}