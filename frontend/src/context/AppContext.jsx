import { createContext, useState } from "react";

export const AppContext = createContext();
const initialInvoiceData = {
    title: "New Invoice",
    billing: { name: "", phone: "", address: "" },
    shipping: { name: "", phone: "", address: "" },
    invoice: { number: "", date: "", dueDate: "" },
    account: { name: "", number: "", ifscode: "" },
    company: { name: "", number: "", address: "" },
    tax: 0,
    notes: "",
    items: [{ name: "", qty: "", amount: "", description: "", total: 0 }],
    logo: "",
};
const baseUrl = "http://localhost:8080/api";
export const AppContextProvider = ({ children }) => {
    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [selectedTemplate, setSelectedTemplate] = useState();
    const contextValue = {
        invoiceTitle,
        setInvoiceTitle,
        invoiceData,
        setInvoiceData,
        selectedTemplate,
        setSelectedTemplate,
        baseUrl,
        initialInvoiceData,
    };
    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
};