function TextEditor({
  onChange,
  value,
}: {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4  rounded-lg border border-gray-300">
        <div className="flex items-center justify-between rounded-lg p-2">
          <div className="  w-full rounded-lg">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              value={value}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800  border-0 pl-2 "
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
