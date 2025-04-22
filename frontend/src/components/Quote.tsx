export default function Quote() {
  return (
    <div className="bg-slate-200 h-screen flex items-center justify-center flex-col p-8  ">
      <div className="flex flex-col space-y-3">
        <div className="max-w-lg  text-5xl font-bold">
          Words have power — <br />
          share yours.
        </div>
        <div className="max-w-md text-2xl font-semibold mt-4">
          "A reader lives a thousand lives before he dies. The man who never
          reads lives only one."
        </div>
        <div className="max-w-md text-xl font-semibold mt-1 text-slate-600">
          - George R.R. Martin
        </div>
      </div>
    </div>
  );
}
