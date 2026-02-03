import { useState, useEffect, useRef, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import html2canvas from "html2canvas";

interface LoveBookProps {
    onClose?: () => void;
}

// Page component that accepts ref
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; pageNumber?: string }>(
    ({ children, pageNumber }, ref) => {
        return (
            <div ref={ref} className="page bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 p-8 shadow-lg">
                {/* Page Lines */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20 px-8"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 31px,
              rgba(251, 113, 133, 0.5) 31px,
              rgba(251, 113, 133, 0.5) 32px
            )`,
                    }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col" style={{ lineHeight: "32px" }}>
                    {children}
                </div>

                {/* Page Number */}
                {pageNumber && (
                    <div className="absolute bottom-4 right-8 text-rose-400 text-sm font-serif">
                        {pageNumber}
                    </div>
                )}
            </div>
        );
    }
);

Page.displayName = "Page";

const LoveBook = ({ onClose }: LoveBookProps) => {
    const [currentLine, setCurrentLine] = useState(0);
    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const bookRef = useRef<any>(null);
    const downloadRef = useRef<HTMLDivElement>(null);

    const loveLines = [
        "My Dearest Mirabelle,",
        "",
        "From the moment our paths crossed, my world became brighter,",
        "warmer, and filled with endless possibilities.",
        "",
        "Your smile lights up my darkest days, your laughter is my",
        "favorite melody, and your presence is my greatest comfort.",
        "",
        "Every moment with you feels like magic, every conversation",
        "a treasure, every memory a precious gift.",
        "",
        "You are the answer to questions I didn't even know I was",
        "asking, the dream I never knew I had.",
        "",
        "With you, I've found my home, my best friend, my everything.",
        "",
        "So today, on this special day, I want you to know that",
        "you mean the world to me.",
        "",
        "Will you be mine?",
        "",
        "Forever yours,",
        "With all my love ❤️",
    ];

    useEffect(() => {
        if (currentLine < loveLines.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => [...prev, loveLines[currentLine]]);
                setCurrentLine((prev) => prev + 1);
            }, 500);

            return () => clearTimeout(timer);
        } else if (currentLine === loveLines.length) {
            setIsComplete(true);
        }
    }, [currentLine]);

    const handleDownload = async () => {
        if (!downloadRef.current) return;

        try {
            // Get all text elements and temporarily set them to full opacity
            const textElements = downloadRef.current.querySelectorAll("p, div");
            const originalStyles: { element: HTMLElement; opacity: string; animation: string }[] = [];

            textElements.forEach((el) => {
                const htmlEl = el as HTMLElement;
                originalStyles.push({
                    element: htmlEl,
                    opacity: htmlEl.style.opacity,
                    animation: htmlEl.style.animation,
                });
                htmlEl.style.opacity = "1";
                htmlEl.style.animation = "none";
            });

            await new Promise((resolve) => setTimeout(resolve, 100));

            const canvas = await html2canvas(downloadRef.current, {
                backgroundColor: "#fef3f2",
                scale: 2,
                logging: false,
            });

            // Restore original styles
            originalStyles.forEach(({ element, opacity, animation }) => {
                element.style.opacity = opacity;
                element.style.animation = animation;
            });

            const link = document.createElement("a");
            link.download = "my-love-letter.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (error) {
            console.error("Error downloading book:", error);
        }
    };

    const nextPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipNext();
        }
    };

    const prevPage = () => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipPrev();
        }
    };

    // Split content into pages (about 8 lines per page)
    const page1Lines = displayedText.slice(0, 8);
    const page2Lines = displayedText.slice(8, 16);
    const page3Lines = displayedText.slice(16);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-hidden">
            {/* Hidden single-page version for download */}
            <div className="absolute -left-[9999px]">
                <div
                    ref={downloadRef}
                    className="bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 rounded-lg shadow-2xl p-12 w-[800px]"
                    style={{
                        boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.5)",
                        backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 31px,
              rgba(251, 113, 133, 0.15) 31px,
              rgba(251, 113, 133, 0.15) 32px
            )`,
                        lineHeight: "32px",
                        paddingTop: "48px",
                    }}
                >
                    {/* Decorative Hearts */}
                    <div className="absolute top-4 right-4 text-3xl">💝</div>
                    <div className="absolute top-4 left-4 text-2xl">❤️</div>

                    {/* All content on one page */}
                    <div className="space-y-0">
                        {loveLines.map((line, index) => (
                            <p
                                key={index}
                                className={`text-base text-rose-900 ${line === "" ? "h-8" : ""}`}
                                style={{
                                    fontFamily: "'Dancing Script', cursive",
                                    fontWeight: line.includes("Dearest") || line.includes("Forever") ? 700 : 600,
                                    lineHeight: "32px",
                                    minHeight: line === "" ? "32px" : "auto",
                                    opacity: 1,
                                }}
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* Signature */}
                    <div
                        className="mt-8 text-base text-rose-900"
                        style={{
                            fontFamily: "'Dancing Script', cursive",
                            fontWeight: 700,
                            lineHeight: "32px",
                            opacity: 1,
                        }}
                    >
                        With ❤️ from Davey
                    </div>
                </div>
            </div>

            {/* Visible book with page flipping */}
            <div className="relative">
                <HTMLFlipBook
                    ref={bookRef}
                    width={400}
                    height={550}
                    size="stretch"
                    minWidth={300}
                    maxWidth={500}
                    minHeight={400}
                    maxHeight={700}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="shadow-2xl"
                >
                    {/* Cover Page */}
                    <Page>
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="text-6xl mb-6">💝</div>
                            <h1
                                className="text-3xl md:text-4xl text-rose-900 mb-4"
                                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
                            >
                                A Love Letter
                            </h1>
                            <p
                                className="text-xl text-rose-700"
                                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}
                            >
                                For My Valentine
                            </p>
                            <div className="mt-8 text-4xl animate-pulse">❤️</div>
                        </div>
                    </Page>

                    {/* Page 1 */}
                    <Page pageNumber="1">
                        <div className="space-y-0">
                            {page1Lines.map((line, index) => (
                                <p
                                    key={index}
                                    className={`text-base text-rose-900 ${line === "" ? "h-8" : ""}`}
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                        fontWeight: line.includes("Dearest") ? 700 : 600,
                                        animation: "fadeInWrite 0.8s ease-in",
                                        opacity: 0,
                                        animationFillMode: "forwards",
                                        animationDelay: `${index * 0.1}s`,
                                        lineHeight: "32px",
                                        minHeight: line === "" ? "32px" : "auto",
                                    }}
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </Page>

                    {/* Page 2 */}
                    <Page pageNumber="2">
                        <div className="space-y-0">
                            {page2Lines.map((line, index) => (
                                <p
                                    key={index}
                                    className={`text-base text-rose-900 ${line === "" ? "h-8" : ""}`}
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                        fontWeight: 600,
                                        animation: "fadeInWrite 0.8s ease-in",
                                        opacity: 0,
                                        animationFillMode: "forwards",
                                        animationDelay: `${(index + 8) * 0.1}s`,
                                        lineHeight: "32px",
                                        minHeight: line === "" ? "32px" : "auto",
                                    }}
                                >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </Page>

                    {/* Page 3 */}
                    <Page pageNumber="3">
                        <div className="space-y-0 h-full flex flex-col">
                            <div className="flex-1">
                                {page3Lines.map((line, index) => (
                                    <p
                                        key={index}
                                        className={`text-base text-rose-900 ${line === "" ? "h-8" : ""}`}
                                        style={{
                                            fontFamily: "'Dancing Script', cursive",
                                            fontWeight: line.includes("Forever") ? 700 : 600,
                                            animation: "fadeInWrite 0.8s ease-in",
                                            opacity: 0,
                                            animationFillMode: "forwards",
                                            animationDelay: `${(index + 16) * 0.1}s`,
                                            lineHeight: "32px",
                                            minHeight: line === "" ? "32px" : "auto",
                                        }}
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>

                            {/* Signature at bottom */}
                            <div className="mt-auto pt-8">
                                <p
                                    className="text-base text-rose-900"
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                        fontWeight: 700,
                                        opacity: isComplete ? 1 : 0,
                                        transition: "opacity 0.5s ease-in",
                                        lineHeight: "32px",
                                    }}
                                >
                                    With ❤️ from Davey
                                </p>
                            </div>
                        </div>
                    </Page>

                    {/* Back Cover */}
                    <Page>
                        <div className="h-full flex items-center justify-center">
                            <div className="text-6xl animate-pulse">💕</div>
                        </div>
                    </Page>
                </HTMLFlipBook>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
                    <Button
                        onClick={prevPage}
                        variant="outline"
                        size="icon"
                        className="pointer-events-auto bg-white/80 hover:bg-white border-rose-300 text-rose-600 rounded-full shadow-lg"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={nextPage}
                        variant="outline"
                        size="icon"
                        className="pointer-events-auto bg-white/80 hover:bg-white border-rose-300 text-rose-600 rounded-full shadow-lg"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Action Buttons - Always in DOM to prevent layout shift */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 transition-opacity duration-500"
                style={{
                    opacity: isComplete ? 1 : 0,
                    pointerEvents: isComplete ? 'auto' : 'none',
                }}
            >
                <Button
                    onClick={handleDownload}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full shadow-lg transform transition hover:scale-105"
                >
                    <Download className="mr-2 h-5 w-5" />
                    Download Love Letter
                </Button>
                {onClose && (
                    <Button
                        onClick={onClose}
                        variant="outline"
                        className="border-rose-600 text-rose-600 hover:bg-rose-50 px-6 py-3 rounded-full shadow-lg bg-white"
                    >
                        Close
                    </Button>
                )}
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&display=swap');
        
        @keyframes fadeInWrite {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .page {
          position: relative;
          background: linear-gradient(to bottom right, #fffbeb, #fff1f2, #fce7f3);
          border: 1px solid #fda4af;
        }

        .stf__wrapper {
          margin: 0 auto;
        }
      `}</style>
        </div>
    );
};

export default LoveBook;
