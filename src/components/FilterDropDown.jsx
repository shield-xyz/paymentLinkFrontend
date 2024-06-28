import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';

const FilterDropDown = ({ setFilteredData }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');

  const handleApplyFilter = () => {
    setFilteredData((prev) => {
      const filteredData = [...prev];
      if (selectedFilter === 'amount') {
        if (selectedOrder === 'ascending') {
          return filteredData.sort((a, b) => a.amount - b.amount);
        } else {
          return filteredData.sort((a, b) => b.amount - a.amount);
        }
      }

      if (selectedFilter === 'date') {
        if (selectedOrder === 'ascending') {
          return filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
          return filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
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
    if (selectedOrder === '') {
      setSelectedOrder('ascending');
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
    handleApplyFilter();
  }, [selectedFilter, selectedOrder]);

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
            checked={selectedOrder === 'ascending'}
            onCheckedChange={(status) =>
              handleActivateOrderFilter(status, 'ascending')
            }
          >
            Ascending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className="DropdownMenuCheckboxItem"
            checked={selectedOrder === 'descending'}
            onCheckedChange={(status) =>
              handleActivateOrderFilter(status, 'descending')
            }
          >
            Descending
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default FilterDropDown;
