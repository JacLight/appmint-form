# Contributing to AppmintForm

Thank you for your interest in contributing to AppmintForm! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and considerate of others.

## How to Contribute

There are many ways to contribute to AppmintForm:

1. **Reporting Bugs**: If you find a bug, please create an issue with a detailed description of the problem, steps to reproduce, expected behavior, and actual behavior.
2. **Suggesting Enhancements**: If you have ideas for new features or improvements, please create an issue with a detailed description of your suggestion.
3. **Code Contributions**: If you want to contribute code, please follow the guidelines below.

## Development Process

1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Clone the Repository**: Clone your fork to your local machine.

   ```bash
   git clone https://github.com/your-username/appmint-form.git
   cd appmint-form
   ```

3. **Install Dependencies**: Install the project dependencies.

   ```bash
   yarn install
   ```

4. **Create a Branch**: Create a new branch for your changes.

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make Changes**: Make your changes to the codebase.
6. **Run Tests**: Make sure your changes pass all tests.

   ```bash
   yarn test
   ```

7. **Lint Your Code**: Ensure your code follows the project's style guidelines.

   ```bash
   yarn lint
   ```

8. **Commit Changes**: Commit your changes with a descriptive commit message.

   ```bash
   git commit -m "Add feature: your feature description"
   ```

9. **Push Changes**: Push your changes to your fork.

   ```bash
   git push origin feature/your-feature-name
   ```

10. **Create a Pull Request**: Create a pull request from your fork to the main repository.

## Pull Request Guidelines

When creating a pull request, please:

1. **Provide a Clear Description**: Describe what your changes do and why they should be included.
2. **Reference Related Issues**: If your pull request addresses an issue, reference it in the description.
3. **Include Tests**: If you're adding new functionality, include tests that verify it works as expected.
4. **Update Documentation**: If your changes affect the public API or user-facing functionality, update the documentation accordingly.
5. **Follow the Code Style**: Make sure your code follows the project's style guidelines.

## Code Style

This project uses ESLint and Prettier for code formatting. Please make sure your code passes the linting checks:

```bash
yarn lint
```

## Testing

This project uses Vitest for testing. Please make sure your changes pass all tests:

```bash
yarn test
```

If you're adding new functionality, please include tests that verify it works as expected.

## Documentation

If your changes affect the public API or user-facing functionality, please update the documentation accordingly. This includes:

1. **README.md**: If your changes affect the basic usage or installation instructions.
2. **DOCUMENTATION.md**: If your changes affect the API reference or examples.
3. **JSDoc Comments**: If you're adding or modifying functions, classes, or methods, include JSDoc comments that describe their purpose, parameters, and return values.

## Versioning

This project follows [Semantic Versioning](https://semver.org/). Please make sure your changes are compatible with the current version and don't introduce breaking changes without proper versioning.

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT license.

## Questions

If you have any questions about contributing, please create an issue or contact the maintainers.

Thank you for your contributions!
