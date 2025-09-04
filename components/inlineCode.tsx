export default function InlineCode({ code }: { code: string }) {
  return (
    <code className="mx-1 px-1 py-0.5 rounded bg-muted text-sm font-mono text-muted-foreground">
      {code}
    </code>
  );
}
