import { CellProps } from "react-table"
import { useState } from "react";
import { FinancialRecord } from "../contexts/financialRecord";

interface EditableCellProps extends CellProps<FinancialRecord> {
    updateRecord: (rowIndex: number, columnId: string, value: any) => void;
    editable: boolean;
    header: String
}

//<EditableCell> component
export const EditableCell: React.FC<EditableCellProps> = ({ value: initialValue, row, column, updateRecord, header, editable, }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const onBlur = () => {
        setIsEditing(false);
        updateRecord(row.index, column.id, value);
    };

    return (
        <div
            onClick={() => editable && setIsEditing(true)}
            style={{ cursor: editable ? "pointer" : "default" }}
        >
            {isEditing ? (
                (header === "paymentType") ? (
                    <select required className="input" value={value} onChange={(e) => setValue(e.target.value)} autoFocus onBlur={onBlur} >
                        <option value="Card Payment">Card Payment</option>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                    </select>
                ) :
                    (
                        < input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            autoFocus
                            onBlur={onBlur}
                            style={{ width: "100%" }}
                        />
                    )
            ) : typeof value === "string" ? (
                value
            ) : (
                value.toString()
            )}
        </div>
    );
};