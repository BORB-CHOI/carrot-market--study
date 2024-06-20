interface FormBtnProps {
  text: string;
  isLoading: boolean;
}

export default function FormBtn({ text, isLoading, ...props }: FormBtnProps) {
  return (
    <button
      disabled={isLoading}
      {...props}
      className={
        "primary-btn h-10 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-300"
      }
    >
      {isLoading ? "로딩중..." : text}
    </button>
  );
}
