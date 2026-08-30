import TermsConditions from "../../src/views/TermsConditions";

export const metadata = {
  title: "Terms of Service",
  description: "Terms that govern use of the CoreCraft Studio website and engagement of our digital product services.",
  alternates: { canonical: "/terms-conditions" },
};

export default function Page() {
  return <TermsConditions />;
}
