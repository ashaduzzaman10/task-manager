### **Task Manager RESTful API - Overview & Structure**

---

### **Project Overview**

The **Task Manager RESTful API** enables users to manage their tasks and profiles efficiently. Key features include:

- **User authentication** with JWT-based login and registration.
- **CRUD operations** for task management, allowing users to create, update, delete, and retrieve tasks.
- **Profile management** with the ability to upload and update profile pictures.
- **Role-based access** for tasks (for potential collaboration features in the future).
- **Task filtering and sorting** by status, priority, and due date.
- **Future enhancements** like task reminders, notifications, and collaboration.

---

### **Database Models**

#### **1. User Model**

| Field            | Type   | Description                                       |
| ---------------- | ------ | ------------------------------------------------- |
| `name`           | String | Full name of the user.                            |
| `email`          | String | Unique email (used for login).                    |
| `password`       | String | Hashed password.                                  |
| `profilePicture` | String | URL to the profile picture (optional).            |
| `createdAt`      | Date   | Timestamp when the user registered.               |
| `updatedAt`      | Date   | Timestamp when the user profile was last updated. |

#### **2. Task Model**

| Field         | Type     | Description                                            |
| ------------- | -------- | ------------------------------------------------------ |
| `title`       | String   | Short title for the task.                              |
| `description` | String   | Detailed description of the task.                      |
| `status`      | Enum     | Task status (`pending`, `in-progress`, `completed`).   |
| `priority`    | Enum     | Task priority (`low`, `medium`, `high`).               |
| `dueDate`     | Date     | Deadline for the task.                                 |
| `createdBy`   | ObjectId | Reference to the user who created the task.            |
| `assignedTo`  | ObjectId | Reference to the user assigned to the task (optional). |
| `createdAt`   | Date     | Timestamp when the task was created.                   |
| `updatedAt`   | Date     | Timestamp when the task was last updated.              |

---

### **API Endpoints**

#### **User Endpoints**

| HTTP Method | Endpoint                        | Description                                                 |
| ----------- | ------------------------------- | ----------------------------------------------------------- |
| `POST`      | `/api/v1/users/register`        | Register a new user.                                        |
| `POST`      | `/api/v1/users/login`           | Authenticate a user and return a JWT token.                 |
| `GET`       | `/api/v1/users/me`              | Get the logged-in user's profile (requires authentication). |
| `PUT`       | `/api/v1/users/me`              | Update the logged-in user's profile.                        |
| `PUT`       | `/api/v1/users/profile-picture` | Upload or update profile picture (requires authentication). |

#### **Task Endpoints**

| HTTP Method | Endpoint                   | Description                                                                |
| ----------- | -------------------------- | -------------------------------------------------------------------------- |
| `POST`      | `/api/v1/tasks`            | Create a new task.                                                         |
| `GET`       | `/api/v1/tasks`            | Get all tasks for the authenticated user.                                  |
| `GET`       | `/api/v1/tasks/:id`        | Get details of a specific task by ID.                                      |
| `PUT`       | `/api/v1/tasks/:id`        | Update an existing task by ID.                                             |
| `DELETE`    | `/api/v1/tasks/:id`        | Delete a task by ID.                                                       |
| `PATCH`     | `/api/v1/tasks/:id/status` | Update the status of a task (e.g., `pending`, `in-progress`, `completed`). |
| `PATCH`     | `/api/v1/tasks/:id/assign` | Assign a task to another user.                                             |

---

### **Project Workflow**

#### **1. Set Up Environment**

- **Install dependencies**:
  - **Node.js**, **Express**, **MongoDB**, **bcryptjs**, **jsonwebtoken**, **multer** (for file uploads), **Joi** (for validation).
- **Set up project structure** with directories for:
  - `models` (User, Task).
  - `controllers` (userController, taskController).
  - `routes` (userRoutes, taskRoutes).
  - `middleware` (authMiddleware, fileUploadMiddleware).
  - `config` (for database connection, environment variables).

#### **2. Build Models**

- Define **User** and **Task** models using **Mongoose**.
  - User model includes fields like `name`, `email`, `password`, and `profilePicture`.
  - Task model includes fields like `title`, `description`, `status`, `priority`, `dueDate`, `createdBy`, and `assignedTo`.

#### **3. Implement Authentication**

- **JWT-based authentication**:
  - Create a login and registration system that issues JWT tokens.
  - Secure task-related endpoints with authentication middleware.
  - Store the JWT token in HTTP headers for every protected request.

#### **4. Develop API Endpoints**

- **User Endpoints**:

  - **POST /api/v1/users/register**: Handles user registration with necessary details (name, email, password).
  - **POST /api/v1/users/login**: Authenticates the user and returns a JWT token.
  - **GET /api/v1/users/me**: Fetches the authenticated user's profile details.
  - **PUT /api/v1/users/me**: Updates the authenticated user's profile details (e.g., name, email).
  - **PUT /api/v1/users/profile-picture**: Upload or update the user's profile picture using **multer**.

- **Task Endpoints**:
  - **POST /api/v1/tasks**: Create a new task (provide title, description, status, priority, due date).
  - **GET /api/v1/tasks**: Get all tasks related to the authenticated user.
  - **GET /api/v1/tasks/:id**: Get detailed information about a specific task by its ID.
  - **PUT /api/v1/tasks/:id**: Update an existing task (e.g., modify due date, priority).
  - **DELETE /api/v1/tasks/:id**: Delete a task by ID.
  - **PATCH /api/v1/tasks/:id/status**: Update the status of a task (mark it as `in-progress` or `completed`).
  - **PATCH /api/v1/tasks/:id/assign**: Assign a task to another user (for collaboration).

#### **5. Test Endpoints**

- Use **Postman** or **Insomnia** to test all API endpoints.
  - Ensure proper functionality of user registration, login, profile management, and task CRUD operations.
  - Validate the JWT token for protected routes.
  - Test file uploads (profile picture) via the `/api/v1/users/profile-picture` endpoint.

#### **6. Deploy**

- Use **MongoDB Atlas** for your production database.
- Deploy the API using platforms like **Heroku**, **Vercel**, or **AWS** for scalable cloud hosting.

---

### **Key Features to Add Later**

1. **Task Reminders & Notifications**:
   - Set up **cron jobs** for task reminders or use **Push Notifications** via services like **OneSignal** or **Firebase**.
2. **Collaboration & Role-Based Access**:

   - Implement user roles (e.g., **Admin**, **User**) for more granular permissions (task assignments, team collaborations).

3. **Advanced Filtering & Sorting for Tasks**:

   - Enhance task queries with more advanced filtering and sorting options, such as filtering by `priority`, `status`, or `due date`.

4. **Rate Limiting & Security**:

   - Implement **rate limiting** using **express-rate-limit** to protect your API from abuse.

5. **Analytics & Reports**:
   - Integrate tools to track task completion rates, productivity, and provide user-based analytics.

---

### **Project Plan**

1. **Phase 1: Core Features**:

   - Set up the project, define the database models.
   - Implement user authentication, registration, and login.
   - Build task CRUD operations and ensure basic task management works.

2. **Phase 2: Profile Management & Image Upload**:

   - Implement user profile management, including profile picture upload.
   - Test and validate user profile updates and image storage.

3. **Phase 3: Task Features & Role-Based Permissions**:

   - Add task status updates, task assignment, and filtering features.
   - Implement roles and permissions for collaboration (if applicable).

4. **Phase 4: Testing & Deployment**:

   - Thoroughly test each endpoint using tools like Postman.
   - Deploy the API on a cloud service (Heroku, AWS).
   - Set up MongoDB Atlas for production database management.

5. **Phase 5: Future Enhancements**:
   - Work on task reminders, notifications, and collaboration features.
   - Improve security with rate limiting and monitor the API for performance issues.

---