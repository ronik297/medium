interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export default function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <div className="border-b border-slate-200 border-slate-400 p-4 ">
      <div className="flex items-center">
        <Avatar name={authorName} />
        <div className="font-extralight pl-2 text-sm">{authorName}</div>
        <div className="pl-2 text-sm text-slate-500">&#x2022;</div>
        <div className="pl-2 font-thin text-slate-500 text-sm">
          {publishedDate}
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className=" text-slate-500 text-sm font-thin mt-2">{`${Math.ceil(
        content.length / 100
      )} minute(s) read`}</div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full">
      <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
