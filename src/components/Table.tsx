import React from "react";
import { Children } from "react";

interface TableProps {
  keyData?: string[];
  data: any[]; // Data for the table
  columns: any[]; // Column headers
  dataForm?: any;
  children? : React.ReactNode;
}

const Table: React.FC<TableProps> = ({ data, columns, keyData, children }) => {
  return (
    <div className="overflow-x-auto  border rounded-md border-[#FF6B35] ">
      <table className="table-auto min-w-full border-collapse ">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="bg-[#ff6b3546] p-1 font-semibold text-sm text-[#FF6B35] py-2 "
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="">   
              {keyData?.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="border-collapse p2 px-0 text-center  "
                >
                  {Array.isArray(row[column])
                    ? row[column].map((cell: any, cellIndex: any) => (
                        <div
                          key={cellIndex}
                          className="flex justify-center items-center   h-12 border-b"
                        >
                          {cell.type === "text" ? (
                            cell.value
                          ) : (
                            <div className="">{cell.value}</div>
                          )}
                        </div>
                      ))
                    : row[column] !== undefined
                    ? row[column]
                    : children 
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
