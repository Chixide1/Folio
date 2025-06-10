import type { MDXComponents } from 'mdx/types';
import CodeBlock from '@/components/ui/codeblock'; // Adjust the import path as needed

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className="inline-block max-w-(--breakpoint-md) text-[2.5rem]/10 tracking-tight text-pretty text-gray-950 max-lg:font-medium lg:text-6xl dark:text-gray-200" {...props} />,
    pre: (props) => {
      const { children } = props;
      // Extract the code string and className from the children
      const code = children.props?.children;
      const className = children.props?.className || '';
      return <CodeBlock className={className}>{code}</CodeBlock>;
    },
    // You can also customize other elements like inline code
    code: ({ children }) => {
      return <code style={{ color: 'lightblue' }}>{children}</code>;
    },
    a: ({children, target, ...props}) => <a {...props} target={target ?? '_blank'}>{children}</a> 
  };
}