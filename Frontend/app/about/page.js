import About from "../../src/views/About";

export const metadata = {
  title: "About Us",
  description: "Learn about CoreCraft Agency's genesis, our team in Karachi, and the engineering principles that guide our work.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <About />;
}
