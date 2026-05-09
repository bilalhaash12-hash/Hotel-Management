# Backend Migration Walkthrough

I have successfully completed migrating the application from a frontend `localStorage` architecture to a full Node.js, Express, and MongoDB backend.

## What was changed

### 1. Database Models (Mongoose)
Created structured MongoDB schemas in the `models/` directory:
- **`Hotel`**: Manages hotel owner registrations, credentials, and approval status.
- **`Enquiry`**: Handles customer enquiries submitted from the homepage.
- **`Booking`**: Manages user bookings including dates, guests, and hotel.
- **`Room`**: Manages dynamic room listings shown on the homepage.
- **`Review`**: Stores customer reviews.
- **`Maintenance`**: Tracks maintenance logs and issue status.

### 2. Express API Routes
Created dedicated route handlers in the `routes/` directory for each resource and mounted them in `server.js` (`/api/hotels`, `/api/enquiries`, etc.).

### 3. Frontend Integration
Updated the JavaScript across all key HTML files to use the `fetch()` API to talk to the backend instead of saving to `localStorage`:
- **`owner-reg.html` & `owner-login.html`**: Registering now saves to the database, and login verifies against the database.
- **`index.html`**: Submitting enquiries and bookings sends a `POST` request to the backend. Fetching rooms calls a `GET` request.
- **`adminpage.html` & `enquiry.html`**: The Admin Dashboard now correctly fetches, deletes, and updates the status of Hotels, Enquiries, Bookings, Reviews, and Maintenance logs through the new API routes.

## Validation
To test these changes:
1. Ensure your `.env` has a working MongoDB URI.
2. Run your server using `npm run dev`.
3. Open `index.html` in your browser and try submitting a test enquiry.
4. Go to `adminpage.html` (the admin panel) and confirm the enquiry appears there, correctly pulled from the MongoDB database rather than localStorage.
