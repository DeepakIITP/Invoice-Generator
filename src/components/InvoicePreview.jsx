import React, { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import Template1 from "../template/template1/Template1";
import { templateComponents } from "../util/InvoiceTemplate";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {
    const formattedData = formatInvoiceData(invoiceData);
    const SeletedTemplate =
        templateComponents[template] || templateComponents["template1"];
    return (
        <div
            ref={ref}
            className="invoice-preview container px-2 py-2 overflow-x-auto"
        >
            <SeletedTemplate data={formattedData} />
        </div>
    );
});

export default InvoicePreview;