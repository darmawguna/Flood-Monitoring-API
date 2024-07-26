# Flood Monitoring API

API for flood monitoring system using IoT. Built with Express.js and MySQL.

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file and configure database and server settings.
4. Start the server: `npm start`

## Endpoints

- `/sensors` - CRUD operations for sensors
- `/waterlevels` - CRUD operations for water levels
- `/users` - CRUD operations for users
- `/alerts` - CRUD operations for alerts

## WebSocket

The server uses Socket.IO for real-time updates of water levels and alerts.

## License

This project is licensed under the MIT License.
