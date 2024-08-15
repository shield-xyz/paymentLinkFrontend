'use client';

import { CustomPagination, Icons, WalletsModal } from '@/components';
import CustomTable from '@/components/CustomTable';
import { HashString } from '@/components/Hash';
import Searchbar from '@/components/Searchbar';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ClientAddressModal } from './ClientAddressModal';
import { useClientAddresses } from '../hooks';

const headers = [
  {
    key: 'name',
    title: 'Name',
    className: 'px-2 min-w-[250px] font-semibold',
  },
  {
    key: 'wallets',
    title: 'Wallets',
    className: 'px-2 min-w-[250px] font-semibold',
  },
  {
    key: 'groupIdWpp',
    title: 'Wp Group Id',
    className: 'px-2 min-w-[250px] font-semibold',
  },

  {
    key: 'actions',
    title: 'Actions',
    className: 'px-2 min-w-[100px] text-right font-semibold',
  },
];

const cellRenderers = {
  name: ({ row }) => (
    <span className="line-clamp-1 text-ellipsis text-sm">{row.name}</span>
  ),
  wallets: ({ row, handleSetWalletModalState }) => (
    <div className="flex flex-col">
      <span className="line-clamp-1 flex items-center gap-2 text-ellipsis text-xs">
        <span className="w-5">{row.wallets.length}</span>
        <HashString hash={row.wallets[0]} withCopy />
      </span>
      {row.wallets.length > 1 && (
        <span
          className="link ml-12 cursor-pointer text-xxs font-light"
          onClick={() => handleSetWalletModalState(row)}
        >
          See more
        </span>
      )}
    </div>
  ),
  groupIdWpp: ({ row, wpGroups }) => {
    const group = wpGroups.find((group) => group.id === row.groupIdWpp);
    return (
      <span className="line-clamp-1 text-ellipsis text-xs">{group?.name}</span>
    );
  },
  actions: ({ row, handleOpenEditModal }) => {
    return (
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          className="px-2 py-2 font-light"
          onClick={() => handleOpenEditModal(row)}
        >
          <Icons.edit className="h-5 text-gray-500" />
        </Button>
      </div>
    );
  },
  // Add or modify renderers as necessary
};

export function ClientAddressesTable({ clientAddresses, wpGroups }) {
  const {
    createClientAddress,
    currentData,
    currentPage,
    editClientAddress,
    groupCounts,
    handleCloseCreateModal,
    handleCloseEditModal,
    handleCloseWalletModal,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleRowsPerPage,
    handleSearch,
    handleSetWalletModalState,
    handleTabChange,
    jump,
    maxPage,
    next,
    prev,
    rowsPerPage,
    searchQuery,
    statusGroups,
    walletsModalToState,
  } = useClientAddresses({ clientAddresses });

  return (
    <div className="flex h-full flex-col gap-2">
      {editClientAddress && (
        <ClientAddressModal
          clientAddress={editClientAddress}
          onClose={handleCloseEditModal}
          wpGroups={wpGroups}
        />
      )}
      {createClientAddress && (
        <ClientAddressModal
          onClose={handleCloseCreateModal}
          wpGroups={wpGroups}
        />
      )}
      {walletsModalToState && (
        <WalletsModal
          title={`Wallets of ${walletsModalToState.name}`}
          wallets={walletsModalToState.wallets}
          onClose={handleCloseWalletModal}
        />
      )}
      <Container className="flex h-full w-full flex-col px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-medium">Client Addresses</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Searchbar
              placeholder="Search by Name, Group Id, Wallets"
              className="border border-input bg-background sm:w-80"
              onChange={handleSearch}
              value={searchQuery}
            />
            <Button
              className="font-light"
              size="sm"
              onClick={handleOpenCreateModal}
            >
              Create Client Address
            </Button>
          </div>
        </div>
        <Tabs
          defaultValue="all"
          className="left-0 w-full overflow-auto"
          onValueChange={handleTabChange}
        >
          <TabsList className="sticky left-0 mb-5 w-full min-w-fit justify-start">
            {groupCounts.map((group) => (
              <TabsTrigger value={group.value} key={group.value}>
                {group.label}{' '}
                <span className="ml-1 text-muted-foreground">
                  ({group.count})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {statusGroups.map((group) => (
            <TabsContent
              className="w-full"
              value={group.value}
              key={group.value}
            >
              <CustomTable
                headers={headers}
                rows={currentData}
                rowKey="_id"
                cellRenderers={cellRenderers}
                handleOpenEditModal={handleOpenEditModal}
                handleSetWalletModalState={handleSetWalletModalState}
                handleCloseWalletModal={handleCloseWalletModal}
                wpGroups={wpGroups}
              />
            </TabsContent>
          ))}
        </Tabs>
        <CustomPagination
          currentPage={currentPage}
          jump={jump}
          maxPage={maxPage}
          next={next}
          prev={prev}
          withRowsPerPage={true}
          rowsPerPage={rowsPerPage}
          handleRowsPerPage={handleRowsPerPage}
        />
      </Container>
    </div>
  );
}
