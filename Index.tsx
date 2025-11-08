import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Index = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const [noButtonAttempts, setNoButtonAttempts] = useState(0);

  const getRandomPosition = () => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    return { x, y };
  };

  const handleNoHover = () => {
    setNoButtonPosition(getRandomPosition());
    setNoButtonAttempts((prev) => prev + 1);
  };

  const handleNoClick = () => {
    setNoButtonPosition(getRandomPosition());
    setNoButtonAttempts((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  useEffect(() => {
    // Generate floating hearts
    const hearts = document.querySelectorAll(".floating-heart");
    hearts.forEach((heart, index) => {
      const delay = index * 2;
      (heart as HTMLElement).style.animationDelay = `${delay}s`;
      (heart as HTMLElement).style.left = `${Math.random() * 100}%`;
    });
  }, []);

  const getNoButtonText = () => {
    if (noButtonAttempts === 0) return "No 😢";
    if (noButtonAttempts < 3) return "Are you sure? 🥺";
    if (noButtonAttempts < 5) return "Please? 🥹";
    if (noButtonAttempts < 8) return "Think again! 💭";
    return "Impossible! 😤";
  };

  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="floating-heart absolute text-primary animate-float-up"
            size={30}
            fill="currentColor"
          />
        ))}
        <div className="text-center animate-bounce-in z-10">
          <div className="text-8xl mb-6 animate-wiggle">🎉</div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Yay! 💕
          </h1>
          <p className="text-2xl text-foreground/80 mb-8">
            I knew you'd say yes! You just made me the happiest person! ✨
          </p>
          <div className="flex gap-4 justify-center text-4xl">
            <span className="animate-bounce">❤️</span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              💖
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              💝
            </span>
          </div>
        </div>
      </div>
    );
  }
return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating hearts background */}
      {[...Array(15)].map((_, i) => (
        <Heart
          key={i}
          className="floating-heart absolute text-primary/30 animate-float-up"
          size={24}
          fill="currentColor"
        />
      ))}

      {/* Main content */}
      <div className="text-center z-10 px-4 animate-bounce-in">
        <div className="mb-8 text-7xl animate-wiggle">💌</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Will You Be Mine?
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-md mx-auto">
          I've been thinking about this for a while... and I can't imagine not asking you! 💕
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative min-h-[100px]">
          <Button
            onClick={handleYesClick}
            size="lg"
            className="text-2xl px-12 py-8 rounded-full bg-gradient-to-r from-primary to-accent hover:scale-110 transition-all duration-300 shadow-[0_0_20px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.7)] font-bold"
          >
            Yes! 💕
          </Button>

          <Button
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
            size="lg"
            variant="secondary"
            className="text-xl px-8 py-6 rounded-full transition-all duration-200 border-2 border-primary/30 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold shadow-lg absolute"
            style={{
              left: noButtonAttempts === 0 ? "auto" : `${noButtonPosition.x}px`,
              top: noButtonAttempts === 0 ? "auto" : `${noButtonPosition.y}px`,
              position: noButtonAttempts === 0 ? "relative" : "fixed",
            }}
          >
            {getNoButtonText()}
          </Button>
        </div>

        {noButtonAttempts > 0 && (
          <p className="mt-8 text-muted-foreground animate-bounce-in">
            {noButtonAttempts < 5
              ? "Oops! The button ran away! 😊"
              : "You can't escape this! Just say yes! 🥰"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
