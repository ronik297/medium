import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <div>Medium</div>
      <Avatar size="big" name="Ronik Kumar" />
    </div>
  );
};
