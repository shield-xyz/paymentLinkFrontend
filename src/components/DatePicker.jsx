'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export function DatePicker({
  value,
  onChange,
  placeholder,
  label,
  labelClassName,
  ...props
}) {
  const [date, setDate] = React.useState(value);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  console.log({ date });

  const handleDateChange = (newDate) => {
    const currentTime = new Date();
    const dateWithCurrentTime = new Date(newDate);
    dateWithCurrentTime.setHours(
      currentTime.getHours(),
      currentTime.getMinutes(),
    );

    setDate(dateWithCurrentTime);
    if (onChange) {
      onChange(dateWithCurrentTime);
    }
    setIsDialogOpen(false);
  };

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog} {...props}>
      {label && (
        <label
          className={cn('block text-sm', labelClassName)}
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP')
          ) : (
            <span>{placeholder || 'Pick a date'}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="w-auto p-0">
        <Calendar
          className=""
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </DialogContent>
    </Dialog>
  );
}
