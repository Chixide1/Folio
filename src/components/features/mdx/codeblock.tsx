import type {BundledLanguage} from 'shiki'
import {codeToHtml} from 'shiki'

type Props = {
  children: string;
  lang: BundledLanguage | "text";
  className?: string;
}

export async function CodeBlock(props: Props) {
  const out = await codeToHtml(props.children, {
    lang: props.lang,
    theme: "github-dark"
  })

  return <div className={props.className} dangerouslySetInnerHTML={{ __html: out }} />
}