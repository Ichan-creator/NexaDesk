NexaDesk — IT Support \& Ticketing System



NexaDesk is a web-based IT Support and Service Desk platform designed to organize and manage technical support requests. It allows users to submit and track IT support tickets while providing administrators with tools to review, respond to, and manage service requests and user accounts.



Features



User Features



\* User registration and login

\* Secure user authentication

\* Create IT support tickets

\* Select ticket priority

\* Track ticket status

\* View ticket details and updates

\* Reply to support tickets

\* Receive ticket notifications

\* View and manage user profile

\* Responsive interface for desktop and mobile devices



Administrator Features



\* Dedicated administrator login

\* Administrator dashboard

\* View and manage support tickets

\* View ticket details

\* Reply to users

\* Update ticket status

\* Update ticket priority

\* Add ticket updates and notes

\* Manage user accounts

\* Activate or deactivate user accounts

\* View ticket statistics

\* Search and organize support requests



Ticket Management



NexaDesk supports different ticket statuses to help organize the support workflow:



\* Open — Newly submitted support request

\* In Progress — Ticket is currently being handled

\* Resolved — The reported issue has been addressed

\* Closed — Ticket has been completed and closed



Tickets can also be assigned different priority levels:



\* Low

\* Medium

\* High

\* Critical



Technologies Used



Frontend



\* HTML5

\* CSS3

\* JavaScript

\* EJS

\* Font Awesome



Backend



\* Node.js

\* Express.js



Database



\* MySQL



Authentication \& Session Management



\* Express Session

\* bcrypt.js

\* dotenv



Development Tools



\* Visual Studio Code

\* Git

\* GitHub



Project Structure



NexaDesk/

│

├── config/

│   └── db.js

│

├── controllers/

│   ├── adminController.js

│   ├── authController.js

│   ├── dashboardController.js

│   ├── pageController.js

│   └── ticketController.js

│

├── middleware/

│   ├── authMiddleware.js

│   └── flash.js

│

├── public/

│   ├── css/

│   └── js/

│

├── routes/

│   ├── adminRoutes.js

│   ├── authRoutes.js

│   ├── dashboardRoutes.js

│   ├── pageRoutes.js

│   └── ticketRoutes.js

│

├── views/

│   ├── admin/

│   ├── create-ticket.ejs

│   ├── dashboard.ejs

│   ├── error.ejs

│   ├── knowledge-base.ejs

│   ├── login.ejs

│   ├── notifications.ejs

│   ├── profile.ejs

│   ├── register.ejs

│   ├── ticket-details.ejs

│   └── tickets.ejs

│

├── app.js

├── nexadesk.sql

├── package.json

└── .env.example



Installation



1\. Clone the repository



bash

git clone https://github.com/Ichan-creator/NexaDesk.git



2\. Open the project folder



bash

cd NexaDesk



3\. Install dependencies



bash

npm install



4\. Create the environment file



Create a `.env` file in the project root.



Example:



env

PORT=8080



DB\_HOST=localhost

DB\_USER=your\_database\_user

DB\_PASSWORD=your\_database\_password

DB\_NAME=nexadesk



SESSION\_SECRET=your\_session\_secret



> Do not upload your actual `.env` file or database credentials to GitHub.



5\. Set up the database



Open MySQL or MySQL Workbench and import:



nexadesk.sql



Make sure the database name in your `.env` matches the database created during the import.



6\. Start the application



bash

node app.js



The application will run at:



http://localhost:8080



Main Pages



User



/login

/register

/dashboard

/tickets

/tickets/new

/notifications

/profile



Administrator



/admin/login

/admin





Security Notes



Sensitive configuration is stored in environment variables rather than directly in the source code.



The following files should not be committed to GitHub:



.env

node\_modules/



The repository includes `.gitignore` to prevent sensitive environment variables and installed dependencies from being uploaded.



Project Purpose



NexaDesk demonstrates practical experience with:



\* IT service request management

\* User authentication

\* Ticket management

\* End-user support workflows

\* Administrator account management

\* Database integration

\* Web application functionality

\* Responsive user interfaces

\* Backend and frontend integration



Future Improvements



Possible future enhancements include:



\* Email notifications

\* File attachments for tickets

\* Ticket assignment to specific IT support staff

\* Knowledge base article management

\* Advanced ticket filtering

\* Service Desk analytics and reporting

\* Role-based permissions for different administrator levels



Author



Christian Aquino



Bachelor of Science in Information Technology



NexaDesk was created as a portfolio project to demonstrate practical IT support, service desk, web development, and database integration skills.



