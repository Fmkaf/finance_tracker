import { useMemo } from "react";
import { useFinancialRecords, FinancialRecord } from "../../contexts/financialRecord";
import { useTable, Column } from "react-table"
import { EditableCell } from "../../components/EditableCell";


export default function FinanceList() {
    const { records, updateRecord, deleteRecord } = useFinancialRecords();

    const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
        //rowIndex => To get the index of record to be update in "records"
        //columnId => The name of field to be updated
        //value => Updated value of the field
        //{ ...records[rowIndex], [columnId]: value }:
        //  Get the record to be updated based in index and replaces the value of field user selected with user input value
        const id = records[rowIndex]?._id;
        updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value });
    };


    const column: Column<FinancialRecord>[] = useMemo(() => ([
        {
            Header: "User Id",
            accessor: "userId",
            Cell: (props) => (<EditableCell {...props} header="userId" updateRecord={updateCellRecord} editable={true}></EditableCell>)
        },
        {
            Header: "Date",
            accessor: "date",
            Cell: (props) => (<EditableCell {...props} header="date" updateRecord={updateCellRecord} editable={true}></EditableCell>)
        },
        {
            Header: "Description",
            accessor: "description",
            Cell: (props) => (<EditableCell {...props} header="descrition" updateRecord={updateCellRecord} editable={true}></EditableCell>)
        },
        {
            Header: "Payment Type",
            accessor: "paymentType",
            Cell: (props) => (<EditableCell {...props} header="paymentType" updateRecord={updateCellRecord} editable={true}></EditableCell>)
        },
        {
            Header: "Delete",
            id: "delete",
            Cell: ({ row }: any) => (<button className="button" onClick={() => deleteRecord(row.original._id ?? "")}>REMOVE</button>)
        }
    ]), [records]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns: column, data: records })
    return (
        <div className="table-container">
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((hg) => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td style={{ width: 130 }} {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}