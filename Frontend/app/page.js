import Home from "../src/views/Home";

export const metadata = {
  title: { absolute: "CoreCraft Agency — Premium Software Agency" },
  description: "CoreCraft Agency employs a design-first approach to craft modern digital experiences, web applications, AI-powered solutions, and high-performance software with architectural precision.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <Home />;
}
