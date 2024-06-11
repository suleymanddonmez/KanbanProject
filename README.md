## Kanban Task Project

This project is a Kanban Task application developed using Next.js, a framework for React, and MongoDB as the database. The project is deployed using the Vercel Platform.

### Technologies Used

- **Next.js:** This project is built using Next.js, a powerful React framework that enables server-side rendering and static site generation. It provides great performance and SEO benefits.
- **React:** Next.js is built on top of React, a popular JavaScript library for building user interfaces. React allows us to create reusable UI components.
- **TypeScript:** TypeScript is used to enhance the development experience by providing static type checking, which helps in catching errors early and improves code quality and maintainability.
- **Tailwind CSS:** Tailwind CSS is a utility-first CSS framework used in this project to create a highly customizable and responsive design. It allows for rapid UI development with minimal custom CSS.
- **MongoDB and Mongoose:** MongoDB is the database used for storing project, task list, and task data. Mongoose is an object data modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model application data, making data validation and querying easier.

You can access the live version of the project through the following link:
- [Kanban Project](https://kanban-project-lake.vercel.app/)

### Features

- **Built with Next.js:** Developed using Next.js, a modern and fast React framework.
- **3 Main Models:** Consists of 3 main models: Project, TaskList, and Task.
- **Jira-Like Kanban Task Management:** Each project provides a Jira-like kanban task management system where you can view task lists and tasks within the project.
- **Connected Data Structure:** Task lists are associated with projects, and tasks are associated with task lists.
- **Project List Page:** All projects are listed on the project homepage with their names.
- **Project Pages:** Separate pages are available for each project. These pages list the task lists belonging to the project, and each task list can display its own tasks.
- **Dynamic Task Management:** You can edit, delete, and drag-and-drop tasks within a task list to reorder them. Additionally, tasks can be dragged and dropped to another task list.
- **Responsive Design:** The project features a responsive design that adapts to all devices.
- **Recently Visited Pages:** Recently visited pages within the project are stored in local storage and displayed in the footer area.

### Getting Started

To run the project, follow these steps:

1. **Clone the repository:**
   
   ```
   git clone https://github.com/suleymanddonmez/KanbanProject.git
   ```

2. **Install dependencies:**
   
   ```
   npm install
   ```

3. **Create environment variables for MongoDB connection:**

   ```
   //.env file content
   CONNECTIONSTR=mongodb+srv://<username>:<password>@<clusterName>.mongodb.net/?retryWrites=true&w=majority&appName=<appName>
   ...
   ```
   
4. **Start the development server:**

    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### API Documentation

API endpoints and details for this project can be found in the Postman collection located at api/postman_collection.json. You can import this collection into Postman to test and explore the API. To test the endpoints, follow these steps:

1. Download and install [Postman](https://www.postman.com/downloads/).
2. Import the Postman Collection into Postman:
    - Open Postman and go to `File > Import`.
    - Select the `api/postman-collection.json` file from your local directory.
3. Use the imported collection to test and explore the API endpoints. Each request in the collection is pre-configured with the necessary HTTP methods, headers, and request bodies.

For more information on how to use Postman collections, refer to the [Postman Documentation](https://www.postman.com/collection/).

### Resources

To learn more about the technologies used in this project, you can explore the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js/) - Your feedback and contributions are welcome!
- [React Documentation](https://react.dev/learn) - Learn about React, the library that Next.js is built upon.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn about TypeScript, the superset of JavaScript that adds static types.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS, the utility-first CSS framework.
- [MongoDB Documentation](https://www.mongodb.com/docs) - Learn about MongoDB features and connections.
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html) - Learn about Mongoose, the object modeling tool for MongoDB.
- [Postman Documentation](https://www.postman.com/product/what-is-postman/) - Learn about Postman usage.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to the branch.
5. Create a new pull request.