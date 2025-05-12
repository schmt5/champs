import React, { useEffect, useRef } from 'react';
import { cn } from '../utils/cn';
import { animate, createScope, stagger, utils } from 'animejs';

const HomeScreen = ({ onStartGame }) => {
    const root = useRef(null);
    const scope = useRef(null);

    useEffect(() => {
        const cursor = document.querySelector('.cmp-cursor')
        const spans = document.querySelectorAll('.cmp-title-spans');

        scope.current = createScope({ root }).add(self => {
            animate(cursor, {
                opacity: [0, 1],
                duration: 2000,
                loop: true,
                ease: 'steps(1)'
            })

            animate(spans, {
                opacity: [0, 1],
                duration: 160,
                delay: stagger(utils.random(100, 160)),
                easing: 'easeInOutQuad',
            });

        })

        // Properly cleanup all anime.js instances declared inside the scope
        return () => scope.current.revert();
    }, []);


    const sk = "SwissSkills"
    const champions = "Champions."
    const skSpans = sk.split('').map((char, index) => (
        <span key={index} className="no-cmp-title-spans inline-block">
            {char}
        </span>
    ));

    const championsSpans = champions.split('').map((char, index) => (
        <span key={index} className="cmp-title-spans inline-block">
            {char}
        </span>
    ));

    return (
        <div ref={root} className="min-h-screen mx-auto max-w-5xl grid grid-cols-3 place-content-center">
            <div className="col-span-2 space-y-8 max-w-3xl px-4">
                <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-gray-600 sm:text-8xl mb-1">
                    {skSpans}
                </h1>
                <h1 className="relative font-display text-5xl font-medium tracking-tight text-balance text-primary-500 sm:text-8xl">
                    {championsSpans}
                    <span className="cmp-cursor inline-block w-1 bg-primary-500 absolute top-1 bottom-4 left-0" />
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