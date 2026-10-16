import { MDXRemote } from "next-mdx-remote/rsc";

type MdxContentProps = {
  source: string;
};

const mdxClassName =
  "space-y-4 text-zinc-700 leading-7 dark:text-zinc-300 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-950 dark:[&_h2]:text-zinc-50 [&_h2]:pt-2 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:text-zinc-950 dark:[&_strong]:text-zinc-50";

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className={mdxClassName}>
      <MDXRemote source={source} />
    </div>
  );
}
