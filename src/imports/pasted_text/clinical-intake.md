Create the next MediKiosk screen: CLINICAL INTAKE.

IMPORTANT:
Use the EXACT SAME MediKiosk visual design system as the existing Dashboard, Login, Consent + ABHA, and Health Check-in screens.

Do NOT redesign the product.
Do NOT introduce a new visual language.

Maintain:
- Same navy + teal healthcare palette
- Same typography
- Same spacing
- Same buttons
- Same border radius
- Same icon style
- Same subtle borders
- Same clean healthcare SaaS aesthetic

This is the CORE clinical intake experience of MediKiosk.

It must NOT look like a generic ChatGPT interface.

==================================================
SCREEN HEADER
==================================================

Title:

"Clinical Check-in"

Subtitle:

"Let's understand your concern before your consultation."

Top-right:
- Save & Exit
- Help

Progress indicator:

Health Check-in ✓
Clinical Intake — Current
Clinical Summary
Doctor Review

Show progress:
"Question 4 of 10"

==================================================
MAIN LAYOUT
==================================================

Create a professional two-column clinical intake layout.

LEFT / MAIN AREA:
Conversation and question area.

RIGHT / SECONDARY AREA:
Live structured information panel.

--------------------------------------------------
MAIN CONVERSATION AREA
--------------------------------------------------

At the top show:

"Tell us about your symptoms"

Assistant question:

"When did your cough start?"

Below the question provide response options where appropriate:

Today
1–3 days ago
4–7 days ago
More than a week

Also provide:

"Or describe it in your own words"

Text input.

Voice interaction:
Large but compact microphone control:

🎙 "Speak your answer"

Show voice recording state when active:
"Listening..."
"Tap to stop"

Allow switching between:
Voice | Text

Conversation history should be visible above in a clean timeline-like format.

Example:

MediKiosk
"What is your main concern?"

Patient
"I have been coughing for three days."

MediKiosk
"Do you also have fever?"

Patient
"Yes, mild fever."

Keep conversation bubbles subtle.
Do NOT make it look like a social messaging app.

--------------------------------------------------
CLINICAL QUESTIONING
--------------------------------------------------

The interface should support adaptive clinical questioning.

Show a small label:

"Clinical Intake"

Questions may cover:

- Main complaint
- Site
- Onset
- Character
- Radiation
- Associated symptoms
- Timing
- Exacerbating / relieving factors
- Severity
- Relevant medical history
- Current medicines
- Allergies
- Previous similar episodes

Do not display all questions at once.

Only show the most relevant next question.

Include:

"Why am I being asked this?"

as a small expandable/help link.

--------------------------------------------------
RIGHT PANEL — LIVE HEALTH SUMMARY
--------------------------------------------------

Heading:

"Information collected"

Create a clean structured clinical panel.

Sections:

Chief Complaint
"Cough"

Duration
"3 days"

Associated Symptoms
"Fever"

Severity
"Moderate"

Medical History
"Not yet provided"

Current Medicines
"Not yet provided"

Allergies
"Not yet provided"

Vitals
"Not available"

Use status indicators such as:
Collected
Missing
Not provided

Do not invent patient information.

--------------------------------------------------
RED FLAG / SAFETY AREA
--------------------------------------------------

Create a subtle but clearly visible safety component.

Heading:

"Safety check"

Example state:

"No immediate red flags identified from the information provided."

Use neutral styling for normal state.

Also create a possible high-risk state in the design system:

"Urgent symptoms detected"

Example:
"Severe difficulty breathing reported."

Action:
"Seek urgent medical care"

Do not claim diagnosis.

The system should communicate that red-flag detection is a safety-support feature and does not replace emergency medical assessment.

--------------------------------------------------
AI / CLINICAL INTELLIGENCE
--------------------------------------------------

Do NOT call this page:
"AI Diagnosis"

Do NOT show a chatbot robot.

Use a subtle label:

"Clinical Intelligence"

Create a small expandable panel:

"Preliminary clinical insight"

Example:

"Some symptoms may require clinical review."

Possible considerations:
- Respiratory infection
- Viral illness
- Asthma exacerbation

Risk:
"Moderate"

Missing information:
- Temperature
- SpO₂
- Relevant medical history

Suggested review:
"Consider checking vital signs and respiratory symptoms during clinical evaluation."

At the bottom clearly display:

"Preliminary clinical insight — not a diagnosis.
Final assessment must be made by a qualified healthcare professional."

Keep this component visually secondary to the patient conversation.

--------------------------------------------------
BOTTOM ACTIONS
--------------------------------------------------

Primary button:

"Continue →"

Secondary:

"Back"

Small option:

"Review my answers"

The Continue button should remain disabled if required information is missing.

==================================================
PATIENT EXPERIENCE
==================================================

The patient should feel like they are having a guided conversation with a healthcare intake assistant.

The interface should feel:
- Calm
- Trustworthy
- Simple
- Human
- Accessible

Avoid:
- ChatGPT clone appearance
- Robot/AI graphics
- Neon colors
- Excessive gradients
- Glassmorphism
- Huge cards
- Too many animations
- Technical medical jargon

==================================================
RESPONSIVE
==================================================

Desktop:
Two-column layout.

Main conversation area:
approximately 65–70%.

Clinical information panel:
approximately 30–35%.

Mobile:
Stack the interface.

Conversation first.

Clinical summary becomes collapsible.

Red flag warning must remain highly visible.

Bottom action button should be sticky and full-width.

==================================================
DESIGN SYSTEM
==================================================

Use the existing MediKiosk components.

Create reusable components for:

- ClinicalQuestion
- VoiceInput
- ConversationMessage
- ProgressIndicator
- ClinicalSummary
- RiskBadge
- RedFlagAlert
- ClinicalInsight
- MissingInformation
- PrimaryCTA

These components will later be reused by the Doctor dashboard and Teleconsultation screens.

==================================================
IMPORTANT PRODUCT PRINCIPLE
==================================================

MediKiosk is an intelligent clinical intake and connected-care platform.

The clinical intake assistant:
- collects information
- asks adaptive questions
- structures patient history
- identifies potential red flags
- provides preliminary clinical insights

It does NOT:
- provide a definitive diagnosis
- independently prescribe medication
- replace a doctor
- automatically change treatment

The UI should communicate this clearly without overwhelming the patient.

Make this screen polished enough for a Smart India Hackathon live demonstration.