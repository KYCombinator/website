import { redirect } from "next/navigation";

// The gallery has been folded into /events, which now hosts a section per
// event series (with photos + community uploads). Keep this route as a
// permanent redirect so old links and bookmarks still land somewhere useful.
export default function GalleryPage() {
  redirect("/events");
}
