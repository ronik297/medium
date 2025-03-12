export default function Quote() {
  return (
    <div className="bg-slate-200 h-screen flex items-center justify-center flex-col p-8">
      <div className="flex flex-col">
        <div className="max-w-lg  text-3xl font-bold">
          "The customer support I received was exceptional. The support team
          went above and beyond to address my concerns."
        </div>
        <div className="max-w-md text-xl font-semibold mt-4">
          Julies Winfield
        </div>
        <div className="max-w-md text-sm font-semibold mt-1 text-slate-600">
          CEO | Acme corp
        </div>
      </div>
    </div>
  );
}
