import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useCallback } from 'react';

interface Props {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function TipTapEditor({ content, onChange, placeholder = 'Start writing...' }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 hover:text-blue-500 underline',
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4 text-gray-900 dark:text-gray-100',
            },
        },
    });

    const addImage = useCallback(() => {
        const url = window.prompt('Image URL');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            {/* Toolbar */}
            <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 p-3 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('bold') 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('italic') 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('strike') 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    <s>S</s>
                </button>
                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('heading', { level: 1 }) 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('heading', { level: 2 }) 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('heading', { level: 3 }) 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    H3
                </button>
                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('bulletList') 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('orderedList') 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    1. List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('blockquote') 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    " Quote
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('codeBlock') 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    {'</>'}
                </button>
                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button
                    type="button"
                    onClick={setLink}
                    className={`px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                        editor.isActive('link') 
                            ? 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100' 
                            : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    🔗 Link
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className="px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
                >
                    🖼️ Image
                </button>
                <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 transition-colors"
                >
                    ↶ Undo
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="px-3 py-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-300 transition-colors"
                >
                    ↷ Redo
                </button>
            </div>

            {/* Editor */}
            <div className="bg-white dark:bg-gray-800">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}