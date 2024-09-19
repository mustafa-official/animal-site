import Animal from "@/components/Animal";
import NavBar from "@/components/NavBar";


export default function Home() {
  return (
    <div className="bg-black">
      <NavBar />
      <Animal />
    </div>
  );
}
