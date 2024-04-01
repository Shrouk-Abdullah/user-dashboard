# UserDashboard

The User Dashboard App is a web application designed to display a list of users and allow users to search and view specific user details. It provides a simple interface for users to interact with user data.

## Deployed Version

You can access the deployed version of this application at [https://user-dashboard.com](https://users-dashboard-git-main-shroukabdullahs-projects.vercel.app/)


## Technologies Used

- Frontend: Angular, Material-UI (MUI), HTML, SCSS

### Features

- User List: Display a list of all users registered in the system.
- Search Functionality: Allow users to search for specific users by id.
- User Details: Show detailed information about a specific user, including their profile picture, name, email, and any other available information.
- Responsive Design: The frontend is designed to be responsive, ensuring optimal user experience across various devices, including desktops, tablets, and smartphones.

### `UserService`

The User Service is designed to interact with an external API to fetch user data. It provides methods for retrieving a list of users, fetching a specific user by ID, and caching fetched data for improved performance.


## Methods

1. **fetchData(url: string)**:
   - Description: This method fetches data from a given URL using the `fetch` API.
   - Parameters:
     - `url`: A string representing the URL from which data is fetched.
   - Returns: An observable that emits the fetched data.

2. **getUsers()**:
   - Description: Fetches all users from the API and caches them. It utilizes pagination to fetch users page by page until all users are fetched.
   - Returns: An observable of an array of user data.

3. **fetchPage(url: string)**:
   - Description: Fetches a specific page of users from the API. It checks the cache first to see if the page has already been fetched. If not, it fetches the page and caches it.
   - Parameters:
     - `url`: A string representing the URL of the page to fetch.
   - Returns: An observable of user data for that page.

4. **getUserById(id: number)**:
   - Description: Fetches a specific user by their ID from the API. It checks the cache first to see if the user has already been fetched. If not, it fetches the user and caches it.
   - Parameters:
     - `id`: The ID of the user to fetch.
   - Returns: An observable of user data.

5. **clearCache()**:
   - Description: Clears the cache, useful for scenarios where you need to refresh the data.
   - Returns: Void.


## Getting Started

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

