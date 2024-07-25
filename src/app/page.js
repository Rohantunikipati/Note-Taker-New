import dynamic from "next/dynamic";

const InitialContent = dynamic(() => import("@/components/initialContent"), { ssr: false });
import NoteButton from "@/components/NoteButton";

export default function Home() {
  return (
    <div className="p-20">
      <InitialContent />
    </div>
  );
}
