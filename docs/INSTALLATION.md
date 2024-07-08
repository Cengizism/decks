# Installation and Running

Follow these steps to set up the development environment:

## 1. Setting Up the Development Environment

1. **Install NodeJS and pnpm** (if not already installed):

   - **NodeJS**: Download and install NodeJS from the [official website](https://nodejs.org/).
   - **pnpm**: Install pnpm globally using npm:
      - *For MacOS users: Administrator privileges needed: Run the following command with sudo: supply the local machine password U use to login in to your Mac.*
     ```bash
     sudo npm install -g pnpm
     ```

2. **Clone the Repository**:

   ```bash
   git clone https://altenitbitfs@dev.azure.com/altenitbitfs/Decks/_git/Decks
   cd Decks
   ```

3. **Install Dependencies**:

   ```bash
   pnpm install
   ```

4. **Start the Development Server**:

   ```bash
   pnpm dev
   ```

   **Note**: Initial page loads might be slow as the server compiles pages for the first time. Subsequent loads will be faster. This delay does not occur in production mode, where all pages are precompiled during the build process.

5. **Open Your Browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the platform.

## 2. Building and Running the Production Version

1. **Build the Project**:

   ```bash
   pnpm build
   ```

2. **Start the Production Server**:

   ```bash
   pnpm start
   ```

3. **Open Your Browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the production version of the platform.

## 3. Linting and Formatting

Ensure code quality and consistency using the following commands:

1. **Lint the Code**:

   ```bash
   pnpm lint
   ```

2. **Check Code Formatting**:

   ```bash
   pnpm format
   ```

3. **Automatically Fix Code Formatting Issues**:

   ```bash
   pnpm format:fix
   ```
