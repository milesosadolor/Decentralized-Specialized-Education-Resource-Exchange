# Decentralized Specialized Education Resource Exchange

A blockchain-based platform for educators to share, borrow, and rate specialized teaching resources using Clarity smart contracts on the Stacks blockchain.

## Overview

This project implements a decentralized system for specialized education resource exchange, allowing educators to:

- Register and share specialized teaching materials
- Verify their credentials as educators
- Borrow and return teaching resources
- Rate and provide feedback on resource quality

## Smart Contracts

### Material Registration Contract

The Material Registration Contract handles the recording and management of specialized teaching resources.

**Key Functions:**
- `register-material`: Register a new teaching resource with details
- `get-material`: Retrieve information about a specific material
- `update-material-availability`: Change the availability status of a material
- `get-material-count`: Get the total number of registered materials

### Educator Verification Contract

The Educator Verification Contract manages the validation of educator credentials.

**Key Functions:**
- `register-educator`: Register as an educator with specialization and institution
- `verify-educator`: Verify an educator's credentials (by authorized verifiers)
- `add-verifier`: Add a new authorized verifier
- `is-verified-educator`: Check if an educator is verified
- `get-educator-info`: Get information about an educator

### Borrowing Management Contract

The Borrowing Management Contract tracks the usage and circulation of teaching materials.

**Key Functions:**
- `borrow-material`: Borrow a specific teaching material
- `return-material`: Return a previously borrowed material
- `mark-as-overdue`: Mark a borrowed material as overdue
- `get-borrow`: Get information about a specific borrow record
- `get-material-borrow-status`: Check the current borrow status of a material

### Quality Rating Contract

The Quality Rating Contract collects feedback on resource effectiveness.

**Key Functions:**
- `rate-material`: Rate a material and provide feedback
- `get-rating`: Get a specific user's rating for a material
- `get-average-rating`: Get the average rating for a material
- `get-rating-count`: Get the total number of ratings for a material

## Development

### Prerequisites

- [Clarinet](https://github.com/hirosystems/clarinet) - Clarity development environment
- [Node.js](https://nodejs.org/) - For running tests

