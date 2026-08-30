import PrivacyPolicy from "../../src/views/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy",
  description: "How CoreCraft Studio collects, uses, and protects information when you visit our site or enquire about a project.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <PrivacyPolicy />;
}
