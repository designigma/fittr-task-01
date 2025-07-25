export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all">
      {children}
    </button>
  );
}
