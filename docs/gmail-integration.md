# Gmail integration

The Gmail action lists the authenticated user's send-as aliases, selects the primary alias, and patches its HTML signature. Gmail may sanitize the HTML. If the API call fails, use the manual copy flow.

Before production use, configure the Google OAuth consent screen, Gmail API, authorized origins, and test users in Google Cloud.
