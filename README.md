# Meeting Insights Analyzer

The Meeting Insights Analyzer is an intelligent web application designed to help users extract meaningful insights from their meeting notes. By leveraging the power of generative AI, this tool automatically identifies key discussion points, assesses the overall sentiment of the meeting, and highlights potential information gaps in user-captured timelines.

This application provides a streamlined interface for pasting or uploading meeting notes and presents a clear, actionable analysis, enabling users to quickly grasp the most critical outcomes and identify areas that may require follow-up.

## Key Features

- **AI-Powered Analysis**: Utilizes generative AI to process and understand unstructured meeting notes.
- **Sentiment Assessment**: Automatically determines if the meeting's tone was positive, negative, or neutral.
- **Key Detail Identification**: Flags the most important points and decisions from the timeline.
- **Gap Detection**: Compares identified key details against user notes to suggest potentially missed information.
- **File Upload & Text Input**: Supports direct text pasting or uploading of `.txt`, `.pdf`, and `.docx` files.
- **Session-Based History**: View a history of all analyses performed during the current session.
- **Themable UI**: Includes a modern, responsive interface with both light and dark modes.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit)
- **UI Components**: [ShadCN/UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: Session-based (Email & Password)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd meeting-insights-analyzer
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Usage

1.  Navigate to the application's home page.
2.  Create an account or sign in using your email and password.
3.  On the main analysis page, either paste your meeting notes directly into the text area or click to upload a `.txt`, `.pdf`, or `.docx` file.
4.  Click the "Analyze Meeting" button.
5.  The AI will process the notes, and the results—including sentiment, potential gaps, and a timeline breakdown—will appear on the right side of the screen.
6.  Navigate to the "History" page to review all analyses from your current session.

## Project Structure

-   `src/app/`: Contains the main pages and routes of the application (e.g., `page.tsx`, `login/page.tsx`).
-   `src/ai/`: Holds the Genkit flows responsible for the AI-powered analysis.
-   `src/components/`: Includes reusable React components, such as UI elements from ShadCN and custom application components.
-   `src/hooks/`: Contains custom React hooks for managing state like authentication and history.
-   `src/lib/`: Includes utility functions, type definitions, and configurations.
