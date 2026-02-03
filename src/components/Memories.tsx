import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Memories = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNo = () => {
    toast({
      description: "I am blocking you right now! 😠",
      variant: "destructive",
    });
  };

  const handleYes = () => {
    navigate("/proposal");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-valentine-pink to-white p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-valentine-dark animate-in fade-in slide-in-from-bottom duration-1000">
          You are special, my love. ❤️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <img
            src="/hand-with-ring.jpg"
            alt="Valentine Memory 1"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
          {/* <img
            src="/gloria2.jpg"
            alt="Valentine Memory 2"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
          <img
            src="/gloria3.jpg"
            alt="Valentine Memory 2"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform"
          />
          <img
            src="/gloria4.jpg"
            alt="Valentine Memory 2"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform"
          /> */}
        </div>

        <p className="text-xl text-valentine-dark/80 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          You are my Everything. That gold shine, that vibe the way you carry it all. Every detail about you hits different. You are unmatched. Loving you is my favorite flex every day. 💝
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-valentine-dark animate-in fade-in slide-in-from-bottom duration-1000">
          Want to see what is ahead? 💝
        </h1>

        <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          <Button
            onClick={handleYes}
            className="bg-valentine-purple hover:bg-valentine-dark text-white"
          >
            Yes, I'd love to! 💖
          </Button>
          <Button
            onClick={handleNo}
            variant="outline"
            className="border-valentine-purple text-valentine-purple hover:bg-valentine-pink/20"
          >
            No 😢
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Memories;
