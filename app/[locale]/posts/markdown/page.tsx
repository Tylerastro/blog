import Strings from "@/markdown/Strings.mdx";
import Django from "@/markdown/Django.mdx";

function CustomH1({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 {...props} style={{ color: "blue", fontSize: "100px" }}>
      {children}
    </h1>
  );
}

const overrideComponents = {
  h1: CustomH1,
};

export default function Page() {
  return (
    <>
      <Strings components={overrideComponents} />
    </>
  );
}
