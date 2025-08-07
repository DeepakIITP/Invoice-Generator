import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Trash2 } from "lucide-react";
import { AppContext } from "../context/AppContext";

function InvoiceForm() {
    const { invoiceData, setInvoiceData } = useContext(AppContext);

    const addItem = () => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                { name: "", qty: "", amount: "", description: "", total: 0 },
            ],
        }));
    };

    const removeItem = (index) => {
        const items = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData((prev) => ({ ...prev, items }));
    };

    const handleChange = (section, field, value) => {
        if (section) {
            setInvoiceData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [field]: value },
            }));
        } else {
            setInvoiceData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...invoiceData.items];
        updatedItems[index][field] = value;

        // Recalculate total if qty or amount changes
        const qty = parseFloat(updatedItems[index].qty) || 0;
        const amount = parseFloat(updatedItems[index].amount) || 0;
        updatedItems[index].total = qty * amount;

        setInvoiceData((prev) => ({ ...prev, items: updatedItems }));
    };

    const handleSameAsBilling = () => {
        setInvoiceData((prev) => ({
            ...prev,
            shipping: { ...prev.billing },
        }));
    };

    const subtotal = invoiceData.items.reduce(
        (sum, item) => sum + parseFloat(item.total || 0),
        0
    );
    const taxAmount = (subtotal * (parseFloat(invoiceData.tax) || 0)) / 100;
    const grandTotal = subtotal + taxAmount;

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoiceData((prev) => ({
                    ...prev,
                    logo: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (!invoiceData.invoice.number) {
            const randomNumber = `INV-${Math.floor(
                100000 + Math.random() * 9000000
            )}`;

            setInvoiceData((prev) => ({
                ...prev,
                invoice: { ...prev.invoice, number: randomNumber },
            }));
        }
    }, []);

    return (
        <div className="invoiceForm container py-4">
            <div className="mb-4">
                <h5>Company Logo</h5>
                <div className="d-flex align-items-center gap-3">
                    <label htmlFor="image" className="form-label">
                        <img
                            src={invoiceData.logo ? invoiceData.logo : assets.upload_area}
                            alt="upload"
                            width={98}
                        />
                    </label>
                    <input
                        type="file"
                        id="image"
                        hidden
                        className="form-control"
                        accept="image/*"
                        onChange={handleLogoUpload}
                    />
                </div>
            </div>

            {/* Company Info */}
            <div className="mb-4">
                <h5>Your Company</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company Name"
                            onChange={(e) => handleChange("company", "name", e.target.value)}
                            value={invoiceData.company.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company Phone"
                            onChange={(e) =>
                                handleChange("company", "number", e.target.value)
                            }
                            value={invoiceData.company.number}
                        />
                    </div>
                    <div className="col-md-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Company Address"
                            onChange={(e) =>
                                handleChange("company", "address", e.target.value)
                            }
                            value={invoiceData.company.address}
                        />
                    </div>
                </div>
            </div>

            {/* Billing */}
            <div className="mb-4">
                <h5>Bill To</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleChange("billing", "name", e.target.value)}
                            value={invoiceData.billing.name}
                            placeholder="Name"
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            onChange={(e) => handleChange("billing", "phone", e.target.value)}
                            value={invoiceData.billing.phone}
                        />
                    </div>
                    <div className="col-md-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            onChange={(e) =>
                                handleChange("billing", "address", e.target.value)
                            }
                            value={invoiceData.billing.address}
                        />
                    </div>
                </div>
            </div>

            {/* Shipping */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Ship To</h5>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="sameAsBilling"
                            onChange={handleSameAsBilling}
                        />
                        <label htmlFor="sameAsBilling" className="form-check-label">
                            Same as Billing
                        </label>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            onChange={(e) => handleChange("shipping", "name", e.target.value)}
                            value={invoiceData.shipping.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            onChange={(e) =>
                                handleChange("shipping", "phone", e.target.value)
                            }
                            value={invoiceData.shipping.phone}
                        />
                    </div>
                    <div className="col-md-12">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Shipping Address"
                            onChange={(e) =>
                                handleChange("shipping", "address", e.target.value)
                            }
                            value={invoiceData.shipping.address}
                        />
                    </div>
                </div>
            </div>

            {/* Invoice Info */}
            <div className="mb-4">
                <h5>Invoice Information</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="invoiceNumber" className="form-label">
                            Invoice Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            disabled
                            id="invoiceNumber"
                            onChange={(e) =>
                                handleChange("invoice", "number", e.target.value)
                            }
                            value={invoiceData.invoice.number}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDate" className="form-label">
                            Invoice Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="invoiceDate"
                            onChange={(e) => handleChange("invoice", "date", e.target.value)}
                            value={invoiceData.invoice.date}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDueDate" className="form-label">
                            Invoice Due Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="invoiceDueDate"
                            onChange={(e) =>
                                handleChange("invoice", "dueDate", e.target.value)
                            }
                            value={invoiceData.invoice.dueDate}
                        />
                    </div>
                </div>
            </div>

            {/* Items */}
            <div className="mb-4">
                <h5>Item Details</h5>
                {invoiceData.items.map((item, index) => (
                    <div key={index} className="card p-3 mb-3">
                        <div className="row g-3 mb-2">
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Item Name"
                                    onChange={(e) =>
                                        handleItemChange(index, "name", e.target.value)
                                    }
                                    value={item.name}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    placeholder="qty"
                                    className="form-control"
                                    onChange={(e) =>
                                        handleItemChange(index, "qty", e.target.value)
                                    }
                                    value={item.qty}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    className="form-control"
                                    onChange={(e) =>
                                        handleItemChange(index, "amount", e.target.value)
                                    }
                                    value={item.amount}
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Total"
                                    readOnly
                                    value={item.total}
                                />
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <textarea
                                className="form-control"
                                placeholder="Description"
                                onChange={(e) =>
                                    handleItemChange(index, "description", e.target.value)
                                }
                                value={item.description}
                            ></textarea>
                            {invoiceData.items.length > 1 && (
                                <button
                                    onClick={() => removeItem(index)}
                                    className="btn btn-outline-danger"
                                    type="button"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button onClick={addItem} className="btn btn-primary" type="button">
                    Add Item
                </button>
            </div>

            {/* Bank Details */}
            <div className="mb-4">
                <h5>Bank Account Details</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Account Name"
                            onChange={(e) => handleChange("account", "name", e.target.value)}
                            value={invoiceData.account.name}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Account Number"
                            onChange={(e) =>
                                handleChange("account", "number", e.target.value)
                            }
                            value={invoiceData.account.number}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Branch/IFSC Code"
                            onChange={(e) =>
                                handleChange("account", "ifscode", e.target.value)
                            }
                            value={invoiceData.account.ifscode}
                        />
                    </div>
                </div>
            </div>

            {/* Totals */}
            <div className="mb-4">
                <h5>Totals</h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100 w-md-50">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label htmlFor="taxInput" className="me-2">
                                Tax Rate (%)
                            </label>
                            <input
                                type="number"
                                id="taxInput"
                                className="form-control w-50 text-end"
                                placeholder="0"
                                onChange={(e) => handleChange(null, "tax", e.target.value)}
                                value={invoiceData.tax}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Tax Amount</span>
                            <span>₹{taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total</span>
                            <span>₹{grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="mb-4">
                <h5>Notes:</h5>
                <textarea
                    name="notes"
                    className="form-control"
                    rows={3}
                    onChange={(e) => handleChange(null, "notes", e.target.value)}
                    value={invoiceData.notes}
                ></textarea>
            </div>
        </div>
    );
}

export default InvoiceForm;