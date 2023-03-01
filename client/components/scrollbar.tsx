import { useStateContext } from "@/context/state-context";
import { useRouter } from "next/router";

const Scrollbar = () => {
  const router = useRouter();
  const { activeSection, setActiveSection } = useStateContext();

  const scroll = (e: any) => {
    if (activeSection === "images") {
      router.push("/text-generation");
      setActiveSection("text");
    }
    if (activeSection === "text") {
      router.push("/image-generation");
      setActiveSection("images");
    }
  };
  return (
    <div
      onScroll={(e) => scroll(e)}
      className="absolute z-20 right-0 w-16 h-screen overflow-scroll"
    >
      <div className="my-4 h-screen w-16 " />
    </div>
  );
};

export default Scrollbar;
