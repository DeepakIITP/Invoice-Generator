import React from "react";
import "./Template4.css";

const Template4 = ({ data }) => {
    if (!data || !Array.isArray(data.items)) return null;

    const subtotal = data.items.reduce(
        (acc, item) => acc + Number(item.qty) * Number(item.amount),
        0
    );

    const taxRate = parseFloat(data.tax || 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    const currency = data.currencySymbol || "₹";

    return (
        <div className="template4 border rounded mx-auto my-4 p-4">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                <div className="w-50">
                    {data.companyLogo && (
                        <div className="mb-2">
                            <img src={data.companyLogo} alt="Company Logo" width={98} />
                        </div>
                    )}
                    <h4 className="template4-company-name">{data.companyName}</h4>
                    <p className="mb-1">{data.companyAddress}</p>
                    <p className="mb-0">{data.companyPhone}</p>
                </div>
                <div className="text-md-end w-50">
                    <h5 className="template4-title template4-primary-color">INVOICE</h5>
                    <p className="mb-1">
                        <strong>Invoice No:</strong> {data.invoiceNumber}
                    </p>
                    <p className="mb-1">
                        <strong>Invoice Date:</strong> {formatDate(data.invoiceDate)}
                    </p>
                    <p className="mb-0">
                        <strong>Due Date:</strong> {formatDate(data.paymentDate)}
                    </p>
                </div>
            </div>

            {/* Billing & Shipping */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <h6 className="fw-bold template4-primary-color">Bill To:</h6>
                    <p className="mb-1">{data.billingName}</p>
                    <p className="mb-1">{data.billingAddress}</p>
                    <p className="mb-0">{data.billingPhone}</p>
                </div>
                {(data.shippingName || data.shippingAddress || data.shippingPhone) && (
                    <div className="col-md-6 text-md-end">
                        <h6 className="fw-bold template4-primary-color">Shipped To:</h6>
                        {data.shippingName && <p className="mb-1">{data.shippingName}</p>}
                        {data.shippingAddress && (
                            <p className="mb-1">{data.shippingAddress}</p>
                        )}
                        {data.shippingPhone && <p className="mb-0">{data.shippingPhone}</p>}
                    </div>
                )}
            </div>

            {/* Items Table */}
            <div className="table-responsive mb-4">
                <table className="table table-bordered mb-0">
                    <thead className="template4-table-head text-white">
                        <tr>
                            <th className="p-3 template4-table-head">Item #/Description</th>
                            <th className="p-3 text-center template4-table-head">Qty.</th>
                            <th className="p-3 text-center template4-table-head">Rate</th>
                            <th className="p-3 text-end template4-table-head">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, index) => (
                            <tr key={index}>
                                <td className="p-3">
                                    <div className="fw-bold">{item.name}</div>
                                    <div className="text-muted">{item.description}</div>
                                </td>
                                <td className="p-3 text-center">{item.qty}</td>
                                <td className="p-3 text-center">
                                    {currency}
                                    {Number(item.amount).toFixed(2)}
                                </td>
                                <td className="p-3 text-end">
                                    {currency}
                                    {(Number(item.qty) * Number(item.amount)).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="d-flex justify-content-end">
                <div style={{ width: "100%", maxWidth: "400px" }}>
                    <table className="table table-bordered mb-0">
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Subtotal</strong>
                                </td>
                                <td className="text-end">
                                    {currency}
                                    {subtotal.toFixed(2)}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Tax ({taxRate}%)</strong>
                                </td>
                                <td className="text-end">
                                    {currency}
                                    {taxAmount.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="template4-table-head fw-bold">
                                <td>
                                    <strong>Total</strong>
                                </td>
                                <td className="text-end">
                                    {currency}
                                    {total.toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bank Account Details */}
            {(data.accountName || data.accountNumber || data.accountIfscCode) && (
                <div className="mt-4">
                    <h6 className="mb-2 template4-primary-color fw-semibold">
                        Bank Account Details
                    </h6>
                    {data.accountName && (
                        <p className="mb-1">
                            <strong>Account Holder:</strong> {data.accountName}
                        </p>
                    )}
                    {data.accountNumber && (
                        <p className="mb-1">
                            <strong>Account Number:</strong> {data.accountNumber}
                        </p>
                    )}
                    {data.accountIfscCode && (
                        <p className="mb-0">
                            <strong>IFSC / Branch Code:</strong> {data.accountIfscCode}
                        </p>
                    )}
                </div>
            )}

            {/* Notes */}
            {data.notes && (
                <div className="text-center mt-5">
                    <p className="mb-0">{data.notes}</p>
                </div>
            )}
        </div>
    );
};

export default Template4;