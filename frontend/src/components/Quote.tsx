export default function Quote() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-50 p-8">
      <div className="max-w-4xl space-y-6 text-center md:text-left animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent leading-tight">
          Words have power — <br className="hidden md:block" />
          share yours.
        </h1>

        <blockquote className="max-w-2xl text-2xl md:text-3xl font-medium text-gray-800 italic leading-relaxed">
          "A reader lives a thousand lives before he dies. The man who never
          reads lives only one."
        </blockquote>

        <p className="text-xl font-semibold text-gray-600 transition-all duration-300 hover:text-gray-800">
          — George R.R. Martin
        </p>
      </div>
    </div>
  );
}
