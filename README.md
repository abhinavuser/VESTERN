

# Vestern - All-in-One Financial Assistant

Vestern is an innovative, AI-powered all-in-one financial assistant platform that leverages state-of-the-art machine learning, blockchain, and finance tech stacks to assist users in managing their financial state. It helps users with everything from personal finance analysis and investment suggestions to fully automated transactions. 

The platform also incorporates various technologies for real-time market updates, portfolio management, and trading while maintaining privacy and security using blockchain technology and anonymous Aadhar verification.

## Features:
- **AI-Powered Financial Assistant**: A personalized financial assistant that understands your financial situation, suggests investment strategies, and teaches you about the stock market.
- **RAG (Retrieve & Generate) Agent**: Automated stock market transactions (buy, sell, etc.) with the ability to handle investment and trading for you.
- **Blockchain Security**: All transactions are recorded and secured on the blockchain, ensuring transparency and immutability.
- **Anonymous Aadhar Concept**: Users' personal details are secured with anonymous Aadhar integration to protect user identity.
- **Integration with NSE and BSE**: Real-time updates from the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE) stock markets.

## Tech Stack

### Backend:
- **LLM Models**: Fine-tuned Knowledge Distilled Deepseekr1 with Qwen 1.5 and Ollama 1:8b for natural language processing and financial decision-making.
- **RAG Agent**: To autonomously buy, sell, and manage transactions in the stock market.
- **Blockchain**: Ensures secure, transparent, and immutable transactions.
- **PostgreSQL**: Relational database management for efficient data storage and management.
- **Docker**: For containerization of the backend services ensuring easy deployment and scalability.

### Frontend:
- **Next.js**: Used to build the website's frontend, providing server-side rendering and static site generation for fast, optimized web performance.
- **Bun**: A fast JavaScript runtime used for bundling and managing the web application’s assets for better performance and reduced build times.

### Mobile:
- **Flutter**: For building the mobile app, ensuring cross-platform support for iOS and Android.

### Machine Learning:
- **ML Algorithms**: For analyzing stock trends, predicting future prices, and generating investment strategies.
- **Deepseekr1**: Used for financial trend analysis and decision-making.
- **Qwen 1.5 and Ollama 1:8b**: Leveraged for deep language models for financial predictions, reports, and user interaction.

## Installation

### Prerequisites
1. **Node.js**: Version 16.x or higher.
2. **Docker**: For running containerized services.
3. **Flutter**: For building and testing the mobile application.

### Steps for Setup:

#### Backend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vestern.git
   cd vestern
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   # OR, using bun
   bun install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and fill in your specific credentials for services like the database, blockchain API keys, etc.
4. Build and run Docker containers:
   ```bash
   docker-compose up --build
   ```

#### Frontend Setup (Next.js):
1. Navigate to the `website/` directory:
   ```bash
   cd website
   ```
2. Install dependencies:
   ```bash
   npm install
   # OR, using bun
   bun install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # OR, using bun
   bun dev
   ```
4. Open `http://localhost:3000` in your browser to see the web application.

#### Mobile Setup (Flutter):
1. Navigate to the `mobile/` directory:
   ```bash
   cd mobile
   ```
2. Install dependencies:
   ```bash
   flutter pub get
   ```
3. Run the app on your preferred simulator or device:
   ```bash
   flutter run
   ```

## Key Concepts & Architecture

### Financial Assistant:
- The assistant asks about your financial state, suggests how to invest, teaches you about the stock market, and provides investment ideas based on data retrieved from the RAG Agent, making use of our fine-tuned LLMs for better accuracy and decision-making.

### Autonomous Transaction System (RAG Agent):
- Using the RAG agent, the assistant can automatically perform transactions (buy, sell) in the stock market on behalf of the user, all while ensuring that the transactions are secure via blockchain technology.

### Blockchain Integration:
- Vestern integrates blockchain for secure transaction processing. It provides an added layer of security and transparency while handling financial transactions.

### Anonymous Aadhar Concept:
- For enhanced security, the app includes anonymous Aadhar integration, ensuring that users' sensitive data remains safe.

### Predictive Models:
- The system utilizes machine learning models to predict stock trends, suggest investments, and analyze past data to optimize portfolio management.

## Contribution

We welcome contributions to the Vestern project! To contribute:

1. Fork the repo.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature-name`).
5. Create a pull request.



---

