# Architecture (Node.js Edition)

1. **C Core**: Implements Dijkstra algorithm for shortest path computations.
2. **Node.js API**: Express server for handling REST API requests.
3. **Database**: SQLite to persist users, drivers, and rides data.
4. **Frontend**: Leaflet.js map for interactive visualization of pickup, drop, and driver locations.

**Communication**: JSON over HTTP between frontend and backend.
