export function VideoPlayer({ src, height, width }) {
  return (
    <video
      height={height}
      width={width}
      autoPlay
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
