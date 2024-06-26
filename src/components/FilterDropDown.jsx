import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuCheckboxItem,
} from './ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components';
import { useState } from 'react';

const FilterDropDown = ({ setFilteredData, selectedTab }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleApplyFilter = () => {
    setFilteredData((prev) => {
      const result = prev.filter((link) => {
        const matchesTab = selectedTab === 'all' || link.status === selectedTab;
        if (!searchQuery && matchesTab) return true;
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
          matchesTab &&
          (link.name.toLowerCase().includes(lowercasedQuery) ||
            link.status.toLowerCase().includes(lowercasedQuery) ||
            formatDate(link.date).toLowerCase().includes(lowercasedQuery))
        );
      });

      return result;
    });
  };

  const handleActivateFilter = (status, inputName) => {
    if (status) {
      setSelectedFilter(inputName);
    } else {
      setSelectedFilter('');
    }
  };

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
          {/* <DropdownMenuCheckboxItem
              className="DropdownMenuCheckboxItem"
              checked={activeFilters.includes("currency")}
              onCheckedChange={status => handleActivateFilter(status, "currency")}
            >
              Sort by Currency
            </DropdownMenuCheckboxItem> */}
          
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