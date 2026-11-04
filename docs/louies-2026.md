# Louies 2026 nominations

Draft implementation at `/events/louies/2026`; private review at `/admin/louies`.

Rachel confirmed carrying forward the 2025 awards, replacing GRIT with Comeback Kid, and adding Bench Builder and Early Adopter. The 20-award slate has stable IDs and updates Exits, RIP, and Future Founders references to 2026. Existing nominees, sponsors, venue, and schedule are not copied. Descriptions for the three changed/new awards are implementation copy rather than previously approved wording.

Rachel explicitly approved publication and enabling public submissions on November 4, 2026. `nominationsOpen` is now `true`.

Production publication uses the existing main-branch SST workflow. Its final verification step uses the existing session signing key to mint short-lived test admin/member sessions (without sending login emails). It checks the live form, validation, anonymous/member denial, a temporary submission, consistent DynamoDB retrieval, and admin dashboard display, then deletes the temporary record in a `finally` block and verifies its removal. It confirms authenticated cleanup works before writing test data. No session tokens or nomination contents are logged.

Administrator review: `/admin/louies`; authenticated JSON retrieval and deletion: `/api/admin/louies`.

Storage uses the existing SST Gallery DynamoDB table, partition `LOUIES#2026`, with one UUID-keyed record per submission. Records include submitter contact details and an array of category nominations. Listing paginates and uses consistent reads. The admin route requires the existing admin session in middleware and verifies it again server-side. No new infrastructure or email messages are introduced.

The CI deployment and credential steps are now restricted to pushes to main: the existing workflow otherwise deploys production even for pull requests. This prevents draft PR previews from publishing an unconfirmed slate.

The optional bottom question is “Popularity Contest,” for the “Class President” award, with exactly Dan, Jack, and Rachel. Its `favoriteKyxLead` value is stored alongside the existing nomination data and displayed in the protected admin view; older records remain valid without a vote. Production checks submit both a vote and an omitted vote and remove both test entries.

Additional regular awards: “The Drip-loma” (best dressed) and “Most School Spirit” (founder/team member repping company swag). The slate now contains 22 regular awards; the optional Class President vote remains at the bottom. Existing stored nominations retain their IDs and award references.

Latest revision: remove The Drip-loma from the active slate, add The Middle-Out and The Dinesh & Gilfoyle, and retain Most School Spirit and Class President. There are 23 active awards. Each award supports repeated nomination entries through “Add another nominee”; the API accepts repeated award IDs without changing the record shape. Existing nominations, including retired award entries, remain readable.

Latest cleanup: removed the original Recognition group (Exits, RIP, Future Founders, Spouse of the Year) and Best Community Operator from the active nomination slate. Bench Builder now covers the community-support role. There are 18 active awards. All retired IDs retain admin display labels, and no stored nominations are migrated or deleted. Assistant to the Founder explicitly permits a co-founder or early-stage employee.
