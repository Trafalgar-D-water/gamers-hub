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
