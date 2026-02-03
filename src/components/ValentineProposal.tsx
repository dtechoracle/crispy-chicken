import { useState, useRef } from "react";
import FloatingHeart from "./FloatingHeart";
import LoveBook from "./LoveBook";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ValentineProposal = () => {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const { toast } = useToast();
  const heartbreakAudioRef = useRef(null);
  const perfectAudioRef = useRef(null);

  // useEffect(() => {
  //   const playAudio = () => {

  //   };
  //   playAudio();
  // }, [accepted]);

  const handleNo = () => {
    if (!heartbreakAudioRef.current) {
      heartbreakAudioRef.current = new Audio("/heartbreak.mp3");
    }
    if (perfectAudioRef.current) {
      perfectAudioRef.current.pause();
      perfectAudioRef.current.currentTime = 0;
    }
    if (heartbreakAudioRef.current.paused) {
      heartbreakAudioRef.current.play();
    }
    setNoCount((prev) => prev + 1);
    const messages = [
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
    ];
    toast({
      description: messages[Math.min(noCount, messages.length - 1)],
      variant: "destructive",
    });
  };

  const handleYes = () => {
    if (!perfectAudioRef.current) {
      perfectAudioRef.current = new Audio(
        "/Perfect-(Mr-Jat.in).mp3"
      );
    }
    if (heartbreakAudioRef.current) {
      heartbreakAudioRef.current.pause();
      heartbreakAudioRef.current.currentTime = 0;
    }
    if (perfectAudioRef.current.paused) {
      perfectAudioRef.current.play();
    }
    setAccepted(true);
    setShowBook(true);
    toast({
      description: "Yay! Can't wait for our Valentine's Day! ❤️",
      className: "bg-valentine-pink text-pink-800",
    });
  };

  const getNoButtonSize = () => {
    const sizes = ["default", "sm", "xs"];
    return sizes[Math.min(noCount, sizes.length - 1)] || "xs";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-valentine-pink to-white overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <FloatingHeart
            key={i}
            size={16 + Math.random() * 24}
            className={`absolute animate-${i % 2 ? "float" : "float-delayed"}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center p-8 rounded-lg backdrop-blur-sm bg-white/30 shadow-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-valentine-dark animate-in fade-in slide-in-from-top duration-1000">
          {accepted ? "Hey!💝" : "Hey!🌚"}
        </h1>
        <p className="text-2xl md:text-3xl mb-4 text-valentine-dark animate-in fade-in slide-in-from-left duration-1000 delay-300">
          {/* I'm Jeremiah */}
        </p>
        <p className="text-xl font-bold md:text-2xl mb-8 text-valentine-dark/80 animate-in fade-in slide-in-from-right duration-1000 delay-500">
          Will you be my Valentine?
        </p>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          <Button
            onClick={handleYes}
            className="bg-valentine-purple hover:bg-valentine-dark text-white px-8 py-2 rounded-full transform transition hover:scale-110"
            disabled={accepted}
          >
            Yes! 💖
          </Button>
          <Button
            onClick={handleNo}
            variant="outline"
            size={getNoButtonSize() as any}
            className="border-valentine-purple text-valentine-purple hover:bg-valentine-pink/20"
            style={{
              transform: `scale(${Math.max(0.7, 1 - noCount * 0.1)})`,
            }}
          >
            No 😢
          </Button>
        </div>
      </div>

      {/* Love Book Modal */}
      {showBook && <LoveBook onClose={() => setShowBook(false)} />}
    </div>
  );
};

export default ValentineProposal;
