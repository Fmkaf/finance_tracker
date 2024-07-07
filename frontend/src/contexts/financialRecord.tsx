import React, { createContext, useState, useContext, useEffect } from "react";

export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: string;
    details: string;
    paymentType: string
}

interface FinancialRecordContextType {
    records: FinancialRecord[];
    createRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, updateRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinancialRecordContext = createContext<FinancialRecordContextType | undefined>(undefined)


//This is the provider "component" inside which we will render the "children" components for which access to the states is needed.
//Inside the provider we pass the states and functions we want expose to the child components
export const FinancialRecordProvider = ({ children }: { children: React.ReactNode }) => {

    //CONTEXT VARIABLE
    const [records, setRecords] = useState<FinancialRecord[]>([]);

    //CONTEXT Methods
    const fetchRecords = async () => {
        try {
            const response = await fetch("http://localhost:8000/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const record = await response.json()
            setRecords(record)
        } catch (error: any) {
            alert(error.message)
        }
    }
    useEffect(() => { fetchRecords() }, [])
    const createRecord = async (record: FinancialRecord) => {
        try {
            const response = await fetch("http://localhost:8000/create", {
                method: "POST",
                body: JSON.stringify(record),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const newRecord = await response.json()
            if (response.status === 200) {
                setRecords([...records, newRecord])
            }
        } catch (error: any) {
            alert(error.message)
        }

    }
    const updateRecord = async (id: string, updateRecord: FinancialRecord) => {
        try {
            const response = await fetch(`http://localhost:8000/${id}`, {
                method: "PATCH",
                body: JSON.stringify(updateRecord),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(await response.json())
        } catch (error: any) {
            alert(error.message)
        }

    }
    const deleteRecord = async (id: string) => {
        try {
            console.log("id", id)
            const response = await fetch(`http://localhost:8000/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                // alert("Deleted successfully");
                setRecords(records.filter((item) => (item._id !== id)))
            }
            console.log(await response.json())
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <FinancialRecordContext.Provider value={{ records, createRecord, updateRecord, deleteRecord }}>
            {children}
        </FinancialRecordContext.Provider>
    )
}

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordContextType | undefined>(FinancialRecordContext)

    if (!context) throw new Error("useFinancialRecords must be used within FinancialRecordProvider")
    return context
}