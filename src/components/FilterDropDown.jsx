import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components';
import { useEffect, useState } from 'react';


const FilterDropDown = ({ setFilteredData, selectedTab }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState("")

  const handleApplyFilter = () => {
    setFilteredData((prev) => {
      const filteredData = [...prev]
      if (selectedFilter === "amount") {
        if (selectedOrder === "ascending") {
          return filteredData.sort((a, b) => a.amount - b.amount)
        } else {
          return filteredData.sort((a, b) => b.amount - a.amount)
        }
      }

      if (selectedFilter === "date") {
        if (selectedOrder === "ascending") {
          return filteredData.sort((a, b) => a.date - b.date)
        } else {
          return filteredData.sort((a, b) => b.date - a.date)
        }
      }
    });
  };

  const handleActivateFilter = (status, inputName) => {
    if (status) {
      setSelectedFilter(inputName);
    } else {
      setSelectedFilter('');
    }
    if (selectedOrder === "") {
      setSelectedOrder("ascending")
    }
  };

  const handleActivateOrderFilter = (status, inputName) => {
    if (status) {
      setSelectedOrder(inputName);
    } else {
      setSelectedOrder('');
    }
  };

  useEffect(() => {
    handleApplyFilter()
  }, [selectedFilter, selectedOrder])


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 font-light" size="sm">
          <Icons.filter className="h-5 text-gray-500" />
          Filter
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenuCheckboxItem
            className="DropdownMenuCheckboxItem"
            checked={selectedFilter === 'amount'}
            onCheckedChange={(status) => handleActivateFilter(status, 'amount')}
          >
            Sort by Amount
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className="DropdownMenuCheckboxItem"
            checked={selectedFilter === 'date'}
            onCheckedChange={(status) => handleActivateFilter(status, 'date')}
          >
            Sort by Date
          </DropdownMenuCheckboxItem>

          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem
              className="DropdownMenuCheckboxItem"
              checked={selectedOrder === "ascending"}
              onCheckedChange={status => handleActivateOrderFilter(status, "ascending")}
            >
              Ascending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="DropdownMenuCheckboxItem"
              checked={selectedOrder === "descending"}
              onCheckedChange={status => handleActivateOrderFilter(status, "descending")}
            >
              Descending
            </DropdownMenuCheckboxItem>
          
        </DropdownMenuContent>
        
      </DropdownMenuPortal>
      
    </DropdownMenu>
  );
};

export default FilterDropDown;


{/* <SelectRoot>
<SelectTrigger aria-label="currency">
    <SelectValue placeholder="Select currency" />
</SelectTrigger>
<SelectPortal>
    <SelectContent>
    <SelectScrollUpButton>
    </SelectScrollUpButton>
    <SelectViewport>
        <SelectGroup>
        <SelectItem value="apple">USDT</SelectItem>
        <SelectItem value="apple">Currency 2</SelectItem>
        <SelectItem value="apple">Currency 3</SelectItem>
        </SelectGroup>
    </SelectViewport>
    </SelectContent>
</SelectPortal>
</SelectRoot> */}