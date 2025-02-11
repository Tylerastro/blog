export default function InlineCode({ code }: { code: string }) {
  return (
    <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-gray-800 dark:text-gray-200">
      {code}
    </code>
  );
}
