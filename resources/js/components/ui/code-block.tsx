import { useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Import common languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';

// Import a theme (you can change this)
import 'prismjs/themes/prism-tomorrow.css';

interface CodeBlockProps {
    code: string;
    language: string;
    className?: string;
}

export function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);

    return (
        <div className={`relative overflow-hidden rounded-lg border bg-muted ${className}`}>
            {/* Language label */}
            <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                <span className="text-sm font-medium text-muted-foreground">
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                </span>
                <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                    Copy
                </button>
            </div>
            
            {/* Code content */}
            <pre className="overflow-x-auto p-4">
                <code
                    ref={codeRef}
                    className={`language-${language}`}
                >
                    {code}
                </code>
            </pre>
        </div>
    );
}

interface InlineCodeProps {
    children: string;
    className?: string;
}

export function InlineCode({ children, className = '' }: InlineCodeProps) {
    return (
        <code className={`rounded bg-muted px-1.5 py-0.5 text-sm font-mono ${className}`}>
            {children}
        </code>
    );
}