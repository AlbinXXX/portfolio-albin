import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { CodeBlock, InlineCode } from './code-block';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
    return (
        <div className={`prose prose-neutral dark:prose-invert max-w-none ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    // Custom code block component
                    code: ({ className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeContent = String(children).replace(/\n$/, '');
                        
                        // Check if it's a block code element (has language class)
                        if (className && match) {
                            return (
                                <CodeBlock
                                    code={codeContent}
                                    language={match[1]}
                                    className="my-4"
                                />
                            );
                        }
                        
                        // Otherwise render as inline code
                        return (
                            <InlineCode {...props}>
                                {codeContent}
                            </InlineCode>
                        );
                    },
                    
                    // Custom heading components with better styling
                    h1: ({ children }: any) => (
                        <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4 first:mt-0">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }: any) => (
                        <h2 className="text-2xl font-semibold tracking-tight mt-6 mb-3">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }: any) => (
                        <h3 className="text-xl font-semibold tracking-tight mt-6 mb-2">
                            {children}
                        </h3>
                    ),
                    
                    // Custom paragraph with better spacing
                    p: ({ children }: any) => (
                        <p className="leading-7 mb-4">
                            {children}
                        </p>
                    ),
                    
                    // Custom list styling
                    ul: ({ children }: any) => (
                        <ul className="my-4 ml-6 list-disc space-y-1">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }: any) => (
                        <ol className="my-4 ml-6 list-decimal space-y-1">
                            {children}
                        </ol>
                    ),
                    
                    // Custom blockquote
                    blockquote: ({ children }: any) => (
                        <blockquote className="border-l-4 border-border pl-4 my-4 italic text-muted-foreground">
                            {children}
                        </blockquote>
                    ),
                    
                    // Custom table styling
                    table: ({ children }: any) => (
                        <div className="my-4 overflow-x-auto">
                            <table className="w-full border-collapse border border-border">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }: any) => (
                        <th className="border border-border bg-muted p-2 text-left font-semibold">
                            {children}
                        </th>
                    ),
                    td: ({ children }: any) => (
                        <td className="border border-border p-2">
                            {children}
                        </td>
                    ),
                    
                    // Custom link styling
                    a: ({ href, children }: any) => (
                        <a 
                            href={href}
                            target={href?.startsWith('http') ? '_blank' : undefined}
                            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                        >
                            {children}
                        </a>
                    ),
                    
                    // Custom image styling
                    img: ({ src, alt }: any) => (
                        <img 
                            src={src} 
                            alt={alt}
                            className="rounded-lg border my-4 max-w-full h-auto"
                            loading="lazy"
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

// Preview component for showing markdown content in edit mode
interface MarkdownPreviewProps {
    content: string;
    title?: string;
}

export function MarkdownPreview({ content, title }: MarkdownPreviewProps) {
    return (
        <div className="space-y-4">
            {title && (
                <div className="border-b pb-2">
                    <h2 className="text-xl font-semibold">Preview</h2>
                </div>
            )}
            
            <MarkdownRenderer content={content} />
        </div>
    );
}