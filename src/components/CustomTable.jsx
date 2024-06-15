const CustomTable = ({ headers, rows, rowKey, cellRenderers }) => {
  return (
    <table className="w-full">
      <thead className="h-10 border-b px-4">
        <tr className="text-left text-xs text-gray-400">
          {headers.map((header) => (
            <th key={header.key} className={header.className}>
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="w-full">
        {rows.map((row) => (
          <tr key={row[rowKey]} className="border-b text-sm font-semibold">
            {headers.map((header) => {
              const CellRenderer = cellRenderers[header.key];
              return (
                <td key={header.key} className="px-2 py-4">
                  {CellRenderer ? <CellRenderer row={row} /> : row[header.key]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
