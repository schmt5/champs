import React, { useEffect, useRef } from 'react';
import { cn } from '../utils/cn';
import { animate, createScope, stagger } from 'animejs';

const HomeScreen = ({ onStartGame }) => {
    const root = useRef(null);
    const scope = useRef(null);

    useEffect(() => {
        scope.current = createScope({ root }).add(self => {
            animate('span', {
                opacity: [0, 1],
                duration: 2000,
                delay: stagger(100),
            })
        })

        // Properly cleanup all anime.js instances declared inside the scope
        return () => scope.current.revert()
    }, [])

    const title = "SwissSkills Champions";
    const titleSpans = title.split('').map((char, index) => (
        <span key={index} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
        </span>
    ));

    return (
        <div ref={root} className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-center space-y-8 max-w-3xl px-4">
                <h1 className="text-5xl font-bold text-primary-500">
                    {titleSpans}
                </h1>
                <p className="text-gray-600 text-lg">
                    Finde heraus, welcher Champion zu dir passt
                </p>
                <button
                    onClick={onStartGame}
                    className={cn(
                        "px-12 py-6 rounded-xl shadow-lg",
                        "bg-primary-400 text-white",
                        "hover:bg-primary-500",
                        "transform transition-all duration-200",
                        "text-2xl font-semibold",
                        "hover:scale-105"
                    )}
                >
                    Spiel starten
                </button>
            </div>
        </div>
    );
};

export default HomeScreen; 