# LeanIX
To-do List App

## Overview
LeanIX is a project designed to manage and streamline IT landscapes with efficiency. This repository contains the frontend and backend components necessary for running the application.

## Table of Contents
- [Project Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/AravindhRamasamy/LeanIX.git
   cd LeanIX
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Usage
- **Frontend**: Accessible at `http://localhost:4200`
- **Backend**: Runs on `http://localhost:4000`
- **Cypress Tests**: Run `npx cypress open`

## Project Structure
```
LeanIX/
│── src/
│   ├── app/
│   ├── assets/
│   ├── environments/
│── cypress/
│   ├── e2e/
│   ├── fixtures/
│   ├── support/
│── package.json
│── cypress.config.js
│── README.md
```

## Running Tests
To run Cypress end-to-end tests:
```bash
npx cypress open
```

For unit tests:
```bash
ng test
```

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-branch`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Create a Pull Request.

## License
This project is licensed under the MIT License. See `LICENSE` for more details.

