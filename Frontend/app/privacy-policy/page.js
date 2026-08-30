import PrivacyPolicy from "../../src/views/PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy",
  description: "How CoreCraft Agency collects, uses, and protects information when you visit our site or enquire about a project.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <PrivacyPolicy />;
}
