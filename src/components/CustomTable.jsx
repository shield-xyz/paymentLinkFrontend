const CustomTable = ({
  headers,
  rows,
  rowKey,
  cellRenderers,
  ...otherProps
}) => {
  return (
    <table className="w-full">
      <thead className="h-10 w-full border-b border-input px-4">
        <tr className="text-left text-xs text-gray-400">
          {headers.map((header) => {
            return (
              <th key={header.key + '-th'} className={header.className}>
                {header.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="w-full">
        {rows.map((row) => (
          <tr
            key={row[rowKey]}
            className="w-full border-b border-input text-sm font-semibold"
          >
            {headers.map((header) => {
              const CellRenderer = cellRenderers[header.key];
              return (
                <td key={header.key + '-td'} className="px-2 py-4">
                  {CellRenderer ? (
                    <CellRenderer row={row} {...otherProps} />
                  ) : (
                    row[header.key]
                  )}
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
