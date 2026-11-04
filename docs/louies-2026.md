# Louies 2026 nominations

Draft implementation at `/events/louies/2026`; private review at `/admin/louies`.

Rachel confirmed carrying forward the 2025 awards, replacing GRIT with Comeback Kid, and adding Bench Builder and Early Adopter. The 20-award slate has stable IDs and updates Exits, RIP, and Future Founders references to 2026. Existing nominees, sponsors, venue, and schedule are not copied. Descriptions for the three changed/new awards are implementation copy rather than previously approved wording.

`nominationsOpen` remains `false`. Do not deploy or enable public data collection: deployment permission remains pending after an automatic approval review denial reported by the parent thread.

Remaining steps after explicit deployment permission:

1. Verify a saved submission against a non-production SST stage, including administrator retrieval and anonymous denial.
2. Open nominations, add the 2026 link to the appropriate existing Louies/events navigation, and deploy through the existing main-branch SST workflow.
3. Verify the actual public URL and a safely removable production submission with authorized storage access. No end-to-end persistence check has yet been performed.

Storage uses the existing SST Gallery DynamoDB table, partition `LOUIES#2026`, with one UUID-keyed record per submission. Records include submitter contact details and an array of category nominations. Listing paginates and uses consistent reads. The admin route requires the existing admin session in middleware and verifies it again server-side. No new infrastructure or email messages are introduced.

The CI deployment and credential steps are now restricted to pushes to main: the existing workflow otherwise deploys production even for pull requests. This prevents draft PR previews from publishing an unconfirmed slate.
