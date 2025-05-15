export function ImageHero({ src, alt }) {
    return (
        <div className="flex items-center justify-center p-8">
            <div
                className="relative transition-all duration-300"
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: '800px',
                }}
            >
                {/* Shadow effect */}
                <div
                    className="absolute -bottom-4 -right-4 rounded-xl bg-primary-500/10 w-full h-full -z-10 blur transition-all duration-300"
                    style={{
                        transform: 'translateZ(-50px)',
                    }}
                />

                {/* Border glow effect */}
                <div
                    className="absolute inset-0 rounded-xl transition-all duration-300 bg-primary-500/20 blur-md"
                    style={{
                        transform: 'translateZ(-10px)',
                    }}
                />

                {/* The image itself */}
                <div
                    className="overflow-hidden rounded-xl border-2 border-white"
                    style={{
                        boxShadow: '0 -20px 450px -5px rgba(230, 0, 0, 0.3), 0 0px 100px -5px rgba(230, 0, 0, 0.1)',
                        transform: 'translateZ(40px) rotateY(-10deg)',
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
