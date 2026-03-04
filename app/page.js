import HomeClient from "../components/Home";
import Stories from "../components/Stories";

export default function Home() {
  return (
    <HomeClient stories={<Stories />} />
  );
}