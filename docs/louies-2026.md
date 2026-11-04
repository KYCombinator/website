# Louies 2026 nominations

Draft implementation at `/events/louies/2026`; private review at `/admin/louies`.

The confirmed full award slate is still pending. `src/data/louies2026.ts` deliberately contains no categories and keeps `nominationsOpen = false`. The only verified decisions are Comeback Kid replacing GRIT, Bench Builder being included, and First Yes being renamed Early Adopter. Do not infer the rest from 2025 or reuse its nominees, sponsors, schedule, or venue.

To finish after Rachel confirms the slate:

1. Add stable award IDs, approved names and descriptions to `awards2026`.
2. Verify form validation and a saved submission against a non-production SST stage, including administrator retrieval and anonymous denial.
3. Open nominations, add the 2026 link to the appropriate existing Louies/events navigation, and deploy through the existing main-branch SST workflow.
4. Verify the actual public URL and a safely removable production submission with authorized storage access. No end-to-end persistence check has yet been performed.

Storage uses the existing SST Gallery DynamoDB table, partition `LOUIES#2026`, with one UUID-keyed record per submission. Records include submitter contact details and an array of category nominations. Listing paginates and uses consistent reads. The admin route requires the existing admin session in middleware and verifies it again server-side. No new infrastructure or email messages are introduced.

The CI deployment and credential steps are now restricted to pushes to main: the existing workflow otherwise deploys production even for pull requests. This prevents draft PR previews from publishing an unconfirmed slate.
