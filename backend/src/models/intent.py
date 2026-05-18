from enum import StrEnum


INTENT_LIST = [
    "greeting",
    "order_status",
    "cancel_subscription",
    "update_address",
    "product_query",
]


class IntentLabel(StrEnum):
    greeting = "greeting"
    order_status = "order_status"
    cancel_subscription = "cancel_subscription"
    update_address = "update_address"
    product_query = "product_query"
    unknown = "unknown"
