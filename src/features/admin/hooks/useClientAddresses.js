'use client';

import { useEffect, useMemo, useState } from 'react';

import { usePagination } from '@/hooks';

const statusGroups = [{ label: 'All', value: 'all', filter: () => true }];

export const useClientAddresses = ({ clientAddresses }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(clientAddresses);
  const [selectedTab, setSelectedTab] = useState('all');

  const [editClientAddress, setEditClientAddress] = useState(null);
  const [createClientAddress, setCreateClientAddress] = useState(null);
  const [infoClientAddress, setInfoClientAddress] = useState(null);

  const [walletsModalToState, setWalletsModalToState] = useState(null);

  const groupCounts = useMemo(
    () =>
      statusGroups.map((group) => ({
        ...group,
        count: clientAddresses.filter(group.filter).length,
      })),
    [clientAddresses],
  );

  const {
    currentData,
    currentPage,
    jump,
    maxPage,
    next,
    prev,
    rowsPerPage,
    handleRowsPerPage,
  } = usePagination(filteredData);

  useEffect(() => {
    const filterData = () => {
      const filteredLinks = clientAddresses.filter((cA) => {
        const matchesTab = selectedTab === 'all' || cA.status === selectedTab;
        if (!searchQuery && matchesTab) return true;
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
          (matchesTab && cA.name?.toLowerCase().includes(lowercasedQuery)) ||
          cA.groupIdWpp?.toLowerCase().includes(lowercasedQuery) ||
          JSON.stringify(cA.wallets).toLowerCase().includes(lowercasedQuery)
        );
      });
      setFilteredData(filteredLinks);
    };

    filterData();
  }, [clientAddresses, searchQuery, selectedTab]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleOpenEditModal = (clientAddress) => {
    setEditClientAddress(clientAddress);
  };

  const handleCloseEditModal = () => {
    setEditClientAddress(null);
  };

  const handleOpenCreateModal = () => {
    setCreateClientAddress(true);
  };

  const handleCloseCreateModal = () => {
    setCreateClientAddress(null);
  };

  const handleOpenInfo = (clientAddress) => {
    setInfoClientAddress(clientAddress);
  };

  const handleCloseInfo = () => {
    setInfoClientAddress(null);
  };

  const handleSetWalletModalState = (clientAddress) => {
    setWalletsModalToState(clientAddress);
  };

  const handleCloseWalletModal = () => {
    setWalletsModalToState(null);
  };

  return {
    createClientAddress,
    currentData,
    currentPage,
    editClientAddress,
    groupCounts,
    handleCloseCreateModal,
    handleCloseEditModal,
    handleCloseInfo,
    handleCloseWalletModal,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleOpenInfo,
    handleRowsPerPage,
    handleSearch,
    handleSetWalletModalState,
    handleTabChange,
    infoClientAddress,
    jump,
    maxPage,
    next,
    prev,
    rowsPerPage,
    searchQuery,
    selectedTab,
    statusGroups,
    walletsModalToState,
  };
};
