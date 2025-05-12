import React, { useEffect, useRef } from 'react';
import { cn } from '../utils/cn';
import { animate, createScope, stagger } from 'animejs';

const HomeScreen = ({ onStartGame }) => {
    const root = useRef(null);
    const scope = useRef(null);

    useEffect(() => {
        // Get all spans
        const spans = document.querySelectorAll('.cmp-title-spans');

        scope.current = createScope({ root }).add(self => {
            // Create a "wave" effect that moves through the text
            animate(spans, {
                opacity: [0.2, 1, 0.2],
                translateY: [0, -10, 0], // Slight up and down movement
                scale: [0.95, 1.05, 0.95], // Subtle size pulsing
                duration: 2500,
                delay: (el, i) => i * 70, // Wave effect moving through text
                easing: 'easeInOutSine',
                loop: true,
                endDelay: (el, i) => 2000 - (i * 70), // Creates continuous wave
            });
        });

        // Properly cleanup all anime.js instances declared inside the scope
        return () => scope.current.revert();
    }, []);


    const sk = "SwissSkills"
    const champions = "Champions"
    const skSpans = sk.split('').map((char, index) => (
        <span key={index} className="cmp-title-spans inline-block">
            {char}
        </span>
    ));

    const championsSpans = champions.split('').map((char, index) => (
        <span key={index} className="cmp-title-spans inline-block">
            {char}
        </span>
    ));

    return (
        <div ref={root} className="min-h-screen grid grid-cols-3 place-content-center">
            <div className="col-span-2 text-center space-y-8 max-w-3xl px-4">
                <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-gray-500 sm:text-8xl mb-2">
                    {skSpans}
                </h1>
                <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-primary-500 sm:text-8xl">
                    {championsSpans}
                </h1>
                <p className="mt-12 text-gray-600 text-3xl">
                    Welcher Champion bist du?
                </p>

                <button
                    onClick={onStartGame}
                    className="cursor-pointer relative inline-block font-medium group py-4 px-12"
                >
                    <span
                        className="absolute rounded inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-primary-400 group-hover:-translate-x-0 group-hover:-translate-y-0"
                    ></span>
                    <span
                        className="absolute rounded inset-0 w-full h-full bg-white border border-primary-400 group-hover:bg-primary-50"
                    ></span>
                    <span className="relative text-primary-400 text-2xl font-semibold">Spiel starten</span>
                </button>
            </div>

            <div className='w-36 h-36 rounded-xl overflow-hidden'>
                <img src="https://worldskills-videos.s3.eu-central-1.amazonaws.com/profile-images/1726635015712img_200x200.png" class="h-full w-full object-cover"></img>

            </div>
        </div>
    );
};

export default HomeScreen; 