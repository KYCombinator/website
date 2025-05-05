import { redirect } from "next/navigation";

// You can update this to change the current year's redirect
const CURRENT_YEAR = "2024";

export default function LouiesRedirect() {
  redirect(`/louies/${CURRENT_YEAR}`);
}
