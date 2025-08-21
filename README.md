📄 Automated Invoice Generator

📌 Project Description

The Automated Invoice Generator is a full-stack web application designed to simplify the process of creating and managing invoices for freelancers and small businesses. Users can input client details, itemized services, and tax rates, and the system automatically calculates totals and generates professional invoices in PDF format. The application also integrates with a database to store and manage invoice records, ensuring easy retrieval and tracking of payment status. With features like PDF export, responsive design, and optional email delivery, this project provides a practical solution that reduces manual effort and ensures accuracy in financial documentation.

🚀 Features

➕ Add and manage client details

📝 Input itemized services with quantity, rate, and tax

💰 Automatic total and tax calculation

📄 Generate and export invoices in PDF format

📦 Store invoices in MongoDB database

📧 Optional email delivery of invoices

📊 Track payment status (Paid/Unpaid)

🎨 Responsive and user-friendly interface (React + Bootstrap)

🛠 Tech Stack

Frontend: React, Vite, Bootstrap, jsPDF, html2canvas

Backend: Spring Boot, Java, REST APIs

Database: MongoDB (Mongoose / Spring Data)

Other Tools: Axios, React Router, Clerk Auth, Lucide React icons

📂 Project Structure

InvoiceGenerator/

│

├── frontend/       # React + Vite frontend

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── services/

│   │   └── App.jsx

│   ├── package.json

│

├── backend/        # Spring Boot backend

│   ├── src/main/java/com/invoice/

│   │   ├── controller/

│   │   ├── model/

│   │   ├── repository/

│   │   └── service/

│   ├── pom.xml

│

└── README.md

⚙️ Installation & Setup

🔹 Frontend (React + Vite)

cd frontend

npm install

npm run dev

🔹 Backend (Spring Boot)

cd backend

mvn spring-boot:run

🔹 Database (MongoDB)

Install and run MongoDB locally OR use MongoDB Atlas cloud.

Update application.properties in Spring Boot with your MongoDB URI:

spring.data.mongodb.uri=mongodb://localhost:27017/invoice_db

▶️ Usage

Open the React app in your browser (http://localhost:5173/ by default).

Fill in client and project details.

Add services/items with rate, quantity, and tax.

Click Generate PDF to download invoice.

View saved invoices from MongoDB database.

✅ Evaluation (Rubric Mapping)

Core Features: Invoice creation, storage, PDF export

Database Integration & CRUD: MongoDB + Spring Boot REST API

Validation: Project description, item fields, required inputs

Error Handling: Input errors handled gracefully with toasts

Documentation: This README + inline code comments

📬 Contact Details

Name: Deepak Ashok Modi

Email: deepak_2312res235@iitp.ac.in
