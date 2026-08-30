import Home from "../src/views/Home";

export const metadata = {
  title: { absolute: "CoreCraft Studio — Premium Software Agency" },
  description: "CoreCraft Agency is a multidisciplinary creative studio based in Karachi, specializing in digital experiences, custom web applications, AI automation, and e-commerce solutions built with architectural precision.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <Home />;
}
