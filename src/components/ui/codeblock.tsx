// components/CodeBlock.tsx
import { codeToHtml } from 'shiki';
import { FC } from 'react';

interface Props {
  children: string;
  className?: string;
}

const CodeBlock: FC<Props> = async ({ children, className }) => {
  const lang = className?.replace('language-', '') || 'plaintext';
  const html = await codeToHtml(children.trim(), {
    lang,
    theme: 'github-dark', // You can choose any theme Shiki supports
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default CodeBlock;