import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import { animate, createScope, createTimeline, stagger, utils } from 'animejs';
import sleep from '../utils/sleep';
import { ImageHero } from './ImageHero';


const HomeScreen = ({ onNextPage }) => {
    const root = useRef(null);
    const scope = useRef(null);
    const startGameAnimation = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleStartGame = useCallback(async () => {
        setLoading(true)
        if (startGameAnimation.current) {
            startGameAnimation.current.play()
        }

        await sleep(2000)
        onNextPage()
    }, [onNextPage])

    useEffect(() => {
        const cursor = document.querySelector('.cmp-cursor')
        const spans = document.querySelectorAll('.cmp-title-spans');

        scope.current = createScope({ root }).add(self => {
            animate(cursor, {
                opacity: [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
                duration: 3000,
                ease: 'steps(1)',
                loop: true,
                loopDelay: 6000,
            })

            animate(spans, {
                opacity: [0, 1],
                duration: 180,
                delay: stagger(utils.random(100, 160), { start: 3000 }),
                easing: 'easeInOutQuad',
                loop: true,
                alternate: true,
                loopDelay: 3000,
            });
        })

        const startSpinner = utils.$('.cmp-start-spinner')

        const timeline = createTimeline({ autoplay: false });

        timeline.add(startSpinner, {
            x: 128,
            width: 64,
            height: 64,
            easing: 'easeInOutQuad',
            duration: 500
        }).add(startSpinner, {
            rotate: 90,
            duration: 500,
            loop: true,
            loopDelay: 50,
            easing: 'easeInOutQuad'
        });

        startGameAnimation.current = timeline;


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

    const squares = Array.from({ length: 64 }).map((_, index) => (
        <span key={index} className="cmp-bg-squares inline-block w-3 h-3 bg-gray-100 rounded-sm" />
    ));



    return (
        <div ref={root} className="min-h-screen mx-auto max-w-5xl grid grid-cols-3 place-content-center">
            <div className='-z-10 fixed top-4 -bottom-96 right-0 left-1/4 grid' style={{ gridTemplateColumns: 'repeat(8, 1fr)', transform: 'rotate(45deg)' }}>
                {squares}
            </div>


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

                {!loading && (<button
                    onClick={handleStartGame}
                    className="cursor-pointer relative inline-block font-medium group py-4 px-12 w-64 m-0"
                >
                    <span
                        className={cn("absolute rounded inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-primary-500 group-hover:-translate-x-0 group-hover:-translate-y-0"
                        )}
                    ></span>
                    <span
                        className={cn("absolute inset-0 w-full h-full bg-white border-2 border-primary-500 rounded")}
                    ></span>
                    <span className="relative text-primary-500 text-2xl font-semibold">
                        Spiel starten
                    </span>

                </button>)}


                <div className={cn("cmp-start-spinner w-64 h-16 bg-white rounded border-2 border-primary-500", {
                    "hidden": !loading
                })} />
            </div>
            <div className=''>
                <ImageHero src="/assets/c1-p.webp" alt='Portrait of a champion' />
            </div>

        </div>
    );
};

export default HomeScreen;
