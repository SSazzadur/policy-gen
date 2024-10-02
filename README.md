# PolicyGen

## Overview

This project provides personalized policy recommendations in four key areas: **financial**, **health**, **life insurance**, and **investment**. The system evaluates user inputs and suggests the best policies based on their personal details. The recommendation engine asks follow-up questions to refine the results further, ensuring the most suitable policy options are provided.

## Key Features

-   **Personalized Policy Suggestions:** The system evaluates user-specific data and offers recommendations tailored to their needs.
-   **Dynamic Questioning:** After an initial recommendation, follow-up questions are asked to refine policy options.
-   **Comprehensive Policy Categories:** Covers a broad range of policy types including financial, health, life insurance, and investment policies.
-   **History Tracking:** The system keeps track of the conversation history for better accuracy in refining recommendations.

## Tech Stack

-   **Frontend & Backend:** Developed using **NextJS14** for fast, efficient, and scalable site and backend operations.
-   **Database Management:** Utilizes **MongoDB** for storing user data and recommendations, with **Prisma ORM** for seamless database querying and management.
-   **Authentication:** User authentication and session management are handled via **Clerk** for secure and efficient access control.
-   **AI Integration:** Leverages the **`@google/generative-ai` package** for integrating the **Gemini API**, which enhances the recommendation engine with advanced machine learning capabilities.

## How It Works

1. **User Registration & Login:** Users authenticate via Clerk to access the platform.
2. **Initial Data Input:** Users provide basic information about their needs (e.g., type of policy, age, income).
3. **Policy Recommendations:** The system analyzes the data and suggests an initial set of policies.
4. **Follow-up Questions:** Based on user responses, the system asks additional questions to better understand their needs and refine suggestions.
5. **Final Recommendation:** Users receive a set of policy options, ranked according to their preferences and needs.

## Contributors

This project is created and maintained by:

-   **Achintam Kalita**
-   **Abbash Ali**
-   **Sazzadur Rahman**
-   **Kukil Bharadwaj**

## Website

Visit the live platform: [Site](https://policy-gen.vercel.app)

## Demonstration

Watch the YouTube demo here: [Video](https://youtu.be/gNpXbHOT5Hs)
