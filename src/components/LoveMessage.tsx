import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FootprintsIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TypeAnimation } from "react-type-animation";

const LoveMessage = () => {
  const [showWalkButton, setShowWalkButton] = useState(false);
  const [audio] = useState(new Audio("/romantic-background.mp3"));
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Play background music when component mounts
    audio.loop = true;
    audio.volume = 0.3;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Audio playback failed:", error);
      });
    }

    // Show the button with a delay
    setTimeout(() => {
      setShowWalkButton(true);
    }, 8000); // Increased delay to match typing animation

    // Cleanup
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-valentine-pink to-white p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <TypeAnimation
          sequence={[
            "Every moment with you feels like a beautiful dream come true. Your smile lights up my world, and your love makes my heart skip a beat. I cherish every second we spend together, and I can't imagine my life without you in it.",
            () => setShowWalkButton(true),
          ]}
          wrapper="p"
          speed={50}
          className="text-2xl md:text-3xl text-valentine-dark"
        />

        {showWalkButton && (
          <Button
            onClick={() => navigate("/memories")}
            className="mt-8 animate-in fade-in slide-in-from-bottom duration-1000 bg-valentine-purple hover:bg-valentine-dark text-white"
          >
            <FootprintsIcon className="mr-2" />
            Walk with me? 👣
          </Button>
        )}
      </div>
      <p className="text-black text-center">
        {/* with ❤️ from <a href="https://x.com/dtechoracle">dtechoracle</a> */}
        with ❤️ from Jeremiah.
      </p>
    </div>
  );
};

export default LoveMessage;
