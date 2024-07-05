# Installation and Running

To get started with the development environment, follow these steps:

## 1. Installation and Running Development Version

1. **Install NodeJS and pnpm** (if not already installed):

   - **NodeJS**: Download and install NodeJS from the [official website](https://nodejs.org/).
   - **pnpm**: Install pnpm globally using npm:
     ```bash
     npm install -g pnpm
     ```

2. **Clone the repository**:

   ```bash
   git clone https://altenitbitfs@dev.azure.com/altenitbitfs/Decks/_git/Decks
   cd Decks
   ```

3. **Install the dependencies**:

   ```bash
   pnpm install
   ```

4. **Start the development server**:

   ```bash
   pnpm dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the platform.

## 2. Build and Run Production Version

To build and run the production version, follow these steps:

1. **Build the project**:

   ```bash
   pnpm build
   ```

2. **Start the production server**:

   ```bash
   pnpm start
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the production version of the platform.

## 3. Linting and Formatting

To maintain code quality and consistency, use the following commands:

1. **Lint the code**:

   ```bash
   pnpm lint
   ```

2. **Check code formatting**:

   ```bash
   pnpm format
   ```

3. **Automatically fix code formatting issues**:
   ```bash
   pnpm format:fix
   ```
