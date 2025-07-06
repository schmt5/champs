export function LoadingSpinner() {
  const color = "#e60000";

  return (
    <div className="flex items-center justify-center relative">
      <div
        className="animate-spin rounded-full border-solid absolute"
        style={{
          width: 60,
          height: 60,
          borderWidth: 4,
          borderColor: `${color}20`, // 20% opacity
          borderTopColor: color,
          animationDuration: 1500,
        }}
      />

      {/* Small inner ring */}
      <div
        className="animate-spin rounded-full border-solid"
        style={{
          width: 36,
          height: 36,
          borderWidth: 4,
          borderColor: `${color}20`, // 20% opacity
          borderTopColor: color,
          animationDuration: 1500,
          animationDirection: "reverse", // Spin in opposite direction
        }}
      />
    </div>
  );
}
