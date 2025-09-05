export function Logo({ onNavigateToHome }) {
  return (
    <div className="fixed top-0 right-0">
      <button
        onClick={onNavigateToHome}
        className="-translate-y-0.5 cursor-pointer"
      >
        <img height={78} width={144} src="/assets/images/logo.png" alt="Logo" />
      </button>
    </div>
  );
}
