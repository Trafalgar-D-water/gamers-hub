// /lib
// │
// ├── /plugins
// │   ├── /user
// │   │   ├── handlers.js       # Handlers for user-related actions
// │   │   ├── routes.js         # User routes
// │   │   ├── schema.js         # User schema definition
// │   │   ├── validation.js     # User validation rules
// │   │   └── index.js          # User plugin registration
// │   ├── /profile
// │   │   └── ...               # Similar structure for profile
// │   ├── /team
// │   │   └── ...               # Similar structure for team
// │   ├── /auth
// │   │   └── ...               # Similar structure for authentication
// │   ├── /friend               # New Friend Plugin
// │   │   ├── handlers.js       # Friend request handlers
// │   │   ├── routes.js         # Friend routes
// │   │   ├── schema.js         # Friend request schema
// │   │   ├── validation.js     # Friend request validation rules
// │   │   └── index.js          # Friend plugin registration
// │   └── /socket               # New Socket Plugin
// │       ├── socketManager.js  # Socket.IO management and events
// │       └── index.js          # Socket plugin registration
// │
// ├── /utils
// │   ├── logger.js             # Logger utility for application logs
// │   └── ...                   # Other utilities
// │
// └── server.js                 # Main server entry point

const filteredDonations = csv_data.reduce((acc, data) => {
    // Get all keys from the data object
    const dataKeys = Object.keys(data);
  
    // Check if all required fields are present directly in the data object
    const isValid = requiredFields.every(field => dataKeys.includes(field));
  
    // If valid, add extra fields and push to the result array
    if (isValid) {
      data.createdBy = profile_id;
      data.createdByName = profileName;
      acc.push(data);
    }
  
    return acc;
  }, []);