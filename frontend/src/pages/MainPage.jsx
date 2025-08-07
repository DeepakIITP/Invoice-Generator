import { Pencil } from "lucide-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import InVoiceForm from "../components/InVoiceForm";
import Template from "../components/Template";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const {
        invoiceTitle,
        setInvoiceTitle,
        invoiceData,
        setInvoiceData,
        setSelectedTemplate,
    } = useContext(AppContext);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setInvoiceTitle(title);
        setInvoiceData((prev) => ({
            ...prev,
            title: title,
        }));
    };
    const navigate = useNavigate();

    const handleTemplateClick = (templateId) => {
        const hasInvalidItem = invoiceData.items.some(
            (item) => !item.qty || !item.amount
        );
        if (hasInvalidItem) {
            toast.error("Please enter quantity and amount for all items.");
            return;
        }
        setSelectedTemplate(templateId);
        navigate("/preview");
    };
    const handleTitleEdit = () => {
        setIsEditingTitle(true);
    };
    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    };
    return (
        <div className="mainpage container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                <div className="bg-white border rounded shadow-sm p-3 mb-4">
                    <div className="d-flex align-items-center">
                        {isEditingTitle ? (
                            <input
                                type="text"
                                className="form-control me-2"
                                autoFocus
                                onBlur={handleTitleBlur}
                                onChange={handleTitleChange}
                                value={invoiceTitle}
                            />
                        ) : (
                            <>
                                <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                                <button
                                    className="btn btn-sm p-0 border-0 bg-transparent"
                                    onClick={handleTitleEdit}
                                >
                                    <Pencil className="text-primary" size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="row g-4 align-items-stretch">
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <InVoiceForm />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <Template onTemplateClick={handleTemplateClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;