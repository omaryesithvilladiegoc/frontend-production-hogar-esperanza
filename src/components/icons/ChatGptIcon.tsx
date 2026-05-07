type ChatGptIconProps = {
  className?: string;
};

export function ChatGptIcon({ className }: ChatGptIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8.8 4.1a4 4 0 0 1 6.8 1.5 4 4 0 0 1 4.2 5.8 4 4 0 0 1-2.7 6.5 4 4 0 0 1-6.8 1.5 4 4 0 0 1-4.2-5.8 4 4 0 0 1 2.7-6.5 4 4 0 0 1 0-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 7.8 12 5.6l3.8 2.2v4.4L12 14.4l-3.8-2.2V7.8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.4v4.2M15.8 12.2l3.5 2M8.2 12.2l-3.5 2M12 5.6V3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
