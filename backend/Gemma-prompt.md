This is an excellent use case for LLMs, as it requires sophisticated classification based on _function_ and _domain_, not just keywords.

To make this robust, we need to provide the LLM with context (the definition of each intent) and set strict output constraints (telling it _only_ to output the name).

Here is the suggested naming convention, the refined descriptions, and the master prompt.

---

## 🏷️ Suggested Intent Names

The names should be clear, functional, and distinct.

| Use Case                          | Suggested Intent Name                | Short Definition for LLM                                                                                                  |
| :-------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| 1. Social Media Post Generation   | `SOCIAL_MEDIA_CONTENT_CREATION`      | Creating promotional, branded content for specific platforms (LinkedIn, Instagram, X).                                    |
| 2. Agile Artifacts                | `AGILE_PLANNING_AND_ARTIFACTS`       | Structuring and generating content related to product management, sprints, or team plans (User Stories, Epics, Features). |
| 3. Plain Language Scoring         | `READABILITY_AND_COMPLIANCE_SCORING` | Assessing existing content for clarity, simplicity, and adherence to standards (plain language checks).                   |
| 4. Marketing Email Classification | `MARKETING_EMAIL_COMPLIANCE`         | Reviewing or drafting marketing emails specifically for regulatory compliance and deliverability (Canadian standards).    |
| 5. Content Rewriting Services     | `FORMAL_CONTENT_TRANSFORMATION`      | Rewriting or adapting existing source documents (legal, financial, HR) into a different format or tone.                   |

---

## 🧠 Master LLM Prompt

This prompt sets the LLM up as an expert classifier and provides all necessary definitions, making it highly reliable.

### Prompt Template:

---

**[START OF PROMPT]**

You are an expert intent classification engine. Your sole task is to read a user's description or request and determine which specific functional use case (intent) they require.

You must select the _single best_ matching intent from the list provided below. Do not provide any explanation, reasoning, or introductory text. Your output must be only the exact intent name.

---

### 🎯 AVAILABLE INTENT CLASSIFICATIONS:

1.  **`SOCIAL_MEDIA_CONTENT_CREATION`**: The user wants to generate or assist in writing promotional, branded marketing posts intended for public consumption on platforms like Instagram, LinkedIn, Facebook, or X/Twitter.
    _(Keywords: post, caption, viral, social, brand, platform-specific, image text.)_

2.  **`AGILE_PLANNING_AND_ARTIFACTS`**: The user is working in a product development or project management context and needs help with structuring, planning, or generating project artifacts. This includes user stories, epics, feature lists, sprint planning, or general product requirements.
    _(Keywords: epic, user story, feature, sprint, requirement, backlog, agile, kanban, product.)_

3.  **`READABILITY_AND_COMPLIANCE_SCORING`**: The user wants to check, assess, or improve existing content's clarity, simplicity, or adherence to standards (e.g., readability scores, plain language guidelines). The focus is on the _assessment_ process.
    _(Keywords: plain language, assess, score, readability, clarity check, review for simplicity, plain language principles.)_

4.  **`MARKETING_EMAIL_COMPLIANCE`**: The user is working specifically with marketing emails and is concerned about regulatory compliance, deliverability, spam prevention, or adherence to regional marketing standards (e.g., Canadian regulations).
    _(Keywords: marketing email, deliverability, spam, CAN-SPAM, compliance, Canadian email standards, BCC, list segmentation.)_

5.  **`FORMAL_CONTENT_TRANSFORMATION`**: The user has an existing, highly formal source document (e.g., legal contract, tax document, HR policy, IT manual) and needs it rewritten, summarized, or adapted into a different format, tone, or audience. The core input is a formal document.
    _(Keywords: legal document, financial report, contract, policy manual, rewrite, summarize, formal, academic, technical documentation.)_

---

### ⚙️ INSTRUCTION:

Analyze the user's request and output only the matching intent name.

**[END OF PROMPT]**

---

## 📝 Testing Examples (For Internal Review)

To prove the prompt works, here are sample inputs and the expected outputs:

| User Input Description                                                                                                  | Expected Output                      | Rationale                                                                  |
| :---------------------------------------------------------------------------------------------------------------------- | :----------------------------------- | :------------------------------------------------------------------------- |
| "Can you help me write a catchy Instagram caption for our new sustainable product line?"                                | `SOCIAL_MEDIA_CONTENT_CREATION`      | Focus is on social media promotion.                                        |
| "I have a contract here. Can you rewrite this jargon-heavy section into bullet points suitable for a general audience?" | `FORMAL_CONTENT_TRANSFORMATION`      | The input is a formal contract; the goal is transformation/simplification. |
| "We need to generate a user story for the new reporting module that links to the overall Epic of Phase Two."            | `AGILE_PLANNING_AND_ARTIFACTS`       | Key terms: user story, epic, phase.                                        |
| "Please check this white paper against plain language principles and give me a Flesch-Kincaid readability score."       | `READABILITY_AND_COMPLIANCE_SCORING` | Focus is explicitly on scoring/assessment.                                 |
| "How should I format this newsletter about our new service to ensure it doesn't get marked as spam by Yahoo?"           | `MARKETING_EMAIL_COMPLIANCE`         | Concerns specific to email delivery and regulations.                       |
| "I need to draft a LinkedIn post announcing that our product is getting a major update."                                | `SOCIAL_MEDIA_CONTENT_CREATION`      | Focus is on a specific social platform post.                               |
| "Write a summary of this 50-page HR policy document for new employees."                                                 | `FORMAL_CONTENT_TRANSFORMATION`      | Input is a formal policy; the output is a summary (transformation).        |
