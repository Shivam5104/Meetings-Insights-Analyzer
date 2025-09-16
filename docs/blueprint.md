# **App Name**: Meeting Insights Analyzer

## Core Features:

- Document Upload: Allow users to upload meeting timeline documents (txt, doc, pdf).
- Timeline Parsing: Parse the uploaded document to identify meeting timelines and corresponding details.
- Key Detail Identification: Analyze meeting timeline and associated details to identify key discussion points. An LLM tool is used to determine if the associated detail needs to be included in the list of important details.
- Lag Detail Detection: Compare the parsed timelines with identified key details, pointing out potential missed information for the user.
- Sentiment Analysis: Assess the overall sentiment (positive, negative, neutral) of the meeting based on the timeline and discussion details. LLM determines which timelines from the whole meeting most support the positive or negative outlook of the meeting, if there is one.
- Timeline Visualization: Visually represent the meeting timeline, highlighting key discussion points, user-captured details, and potential missed information.
- Insights Summary: Generate a concise summary of key insights and the overall sentiment of the meeting, displayed prominently to the user.

## Style Guidelines:

- Primary color: Dark blue (#3F51B5) for professionalism and trust.
- Background color: Very light blue (#F0F2FF) for a clean and unobtrusive backdrop.
- Accent color: Teal (#009688) to highlight important insights and timelines, contrasting with the blue tones.
- Body and headline font: 'Inter', a sans-serif, for clean and modern readability.
- Use clear, simple icons to represent various meeting events, sentiment, and information types.
- Maintain a clear, timeline-oriented layout, with well-defined sections for document upload, timeline visualization, and insights summary.
- Incorporate subtle animations for loading indicators and displaying new insights.