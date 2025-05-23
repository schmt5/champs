export function Avatar({ imageSrc }) {
  return (
    <div className="w-20 h-20 rounded-full shadow-xl border-2 border-white overflow-hidden">
      <img src={imageSrc} className="h-full w-full object-cover" alt="Avatar" />
    </div>
  );
}
