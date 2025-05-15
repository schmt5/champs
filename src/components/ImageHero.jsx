export function ImageHero({ src, alt }) {
    return (
        <div className="flex items-center justify-center p-8">
            <div
                className="relative transition-all duration-300 scale-105"
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                }}
            >
                {/* Shadow effect */}
                <div
                    className="absolute -bottom-4 -right-4 rounded-xl bg-primary-500/20 w-full h-full -z-10 blur-md transition-all duration-300"
                    style={{
                        transform: 'translateZ(-50px)',
                    }}
                />

                {/* Border glow effect */}
                <div
                    className="absolute inset-0 rounded-xl transition-all duration-300 bg-primary-500/30 blur-md"
                    style={{
                        transform: 'translateZ(-10px)',
                    }}
                />

                {/* The image itself */}
                <div
                    className="overflow-hidden rounded-xl border-2 border-primary-50"
                    style={{
                        boxShadow: '0 20px 25px -5px rgba(230, 0, 0, 0.2), 0 10px 10px -5px rgba(230, 0, 0, 0.1)',
                        transform: 'translateZ(40px) rotateY(-5deg)',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="rounded-md transition-all duration-300"
                        style={{
                            filter: 'brightness(1.1) contrast(1.1)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
