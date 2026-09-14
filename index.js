const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from my CI/CD pipeline project!', status: 'running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Simple function we'll write a test for
function add(a, b) {
  return a + b;
}

// Only start the server if this file is run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { app, add };
