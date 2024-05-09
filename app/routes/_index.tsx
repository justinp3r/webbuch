import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Buch Server" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1" }}>
      <>
        <h1>Start Buch Seite</h1>
        <a href="/demo">Gehe zur Demoseite</a>
      </>
    </div>
  );
}
