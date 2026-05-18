from enum import StrEnum


INTENT_LIST = [
    "SOCIAL_MEDIA_CONTENT_CREATION",
    "AGILE_PLANNING_AND_ARTIFACTS",
    "READABILITY_AND_COMPLIANCE_SCORING",
    "MARKETING_EMAIL_COMPLIANCE",
    "FORMAL_CONTENT_TRANSFORMATION",
]

INTENT_DEFINITIONS = {
    "SOCIAL_MEDIA_CONTENT_CREATION": (
        "Creating promotional, branded content for specific social platforms "
        "like LinkedIn, Instagram, Facebook, or X/Twitter."
    ),
    "AGILE_PLANNING_AND_ARTIFACTS": (
        "Structuring and generating content related to product management, "
        "sprints, team plans, user stories, epics, features, or requirements."
    ),
    "READABILITY_AND_COMPLIANCE_SCORING": (
        "Assessing existing content for clarity, simplicity, readability, "
        "plain language principles, or adherence to standards."
    ),
    "MARKETING_EMAIL_COMPLIANCE": (
        "Reviewing or drafting marketing emails for regulatory compliance, "
        "deliverability, spam prevention, or regional marketing standards."
    ),
    "FORMAL_CONTENT_TRANSFORMATION": (
        "Rewriting, summarizing, or adapting an existing formal source "
        "document such as a legal, financial, HR, academic, or technical document."
    ),
}


class IntentLabel(StrEnum):
    SOCIAL_MEDIA_CONTENT_CREATION = "SOCIAL_MEDIA_CONTENT_CREATION"
    AGILE_PLANNING_AND_ARTIFACTS = "AGILE_PLANNING_AND_ARTIFACTS"
    READABILITY_AND_COMPLIANCE_SCORING = "READABILITY_AND_COMPLIANCE_SCORING"
    MARKETING_EMAIL_COMPLIANCE = "MARKETING_EMAIL_COMPLIANCE"
    FORMAL_CONTENT_TRANSFORMATION = "FORMAL_CONTENT_TRANSFORMATION"
    unknown = "unknown"
