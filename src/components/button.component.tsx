import clsx from "clsx";

interface ButtonsProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  type?: React.ComponentProps<"button">["type"];
  onClick?: React.ComponentProps<"button">["onClick"];
}

export default function Button({
  fullWidth,
  type = "button",
  ...buttonProps
}: ButtonsProps) {
  const buttonClasses = clsx(
    "bg-[#F94D6A] px-4 py-2 border-0 rounded text-white font-bold",
    {
      "w-full": fullWidth,
    }
  );

  return <button className={buttonClasses} type={type} {...buttonProps} />;
}
