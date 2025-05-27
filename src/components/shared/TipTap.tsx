'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEffect, useState } from 'react';

interface TiptapProps {
  content: string;
  onChange: (content: string) => void;
}

// Define extensions outside component to prevent recreation on each render
const extensions = [
  StarterKit,
  Link.configure({
    openOnClick: false,
  }),
];

const Tiptap = ({ content, onChange }: TiptapProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only initialize editor after component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    // Add editorProps to optimize rendering
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
      },
    },
  });

  // Show a simple placeholder while editor is initializing
  if (!editor || !isMounted) {
    return <div className="border p-3 rounded min-h-[200px] flex items-center justify-center text-gray-400">Loading editor...</div>;
  }

  return (
    <div className="tiptap-editor">
      <div className="toolbar mb-2 flex flex-wrap gap-2 border p-2 rounded">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          type="button"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          type="button"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
          type="button"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
          type="button"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          type="button"
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          type="button"
        >
          Ordered List
        </button>
      </div>
      <EditorContent editor={editor} className="border p-3 rounded min-h-[200px]" />
    </div>
  );
};

export default Tiptap;
