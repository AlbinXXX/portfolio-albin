import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Tag } from 'lucide-react';

interface TagOption {
    id: number;
    name: string;
    slug: string;
}

interface TagsInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    availableTags?: TagOption[];
    placeholder?: string;
    className?: string;
}

export default function TagsInput({ 
    value = [], 
    onChange, 
    availableTags = [], 
    placeholder = "Add tags...",
    className = ""
}: TagsInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [filteredTags, setFilteredTags] = useState<TagOption[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const filtered = availableTags.filter(tag => 
            tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
            !value.includes(tag.name)
        );
        setFilteredTags(filtered);
    }, [inputValue, availableTags, value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addTag = (tagName: string) => {
        const trimmedTag = tagName.trim();
        if (trimmedTag && !value.includes(trimmedTag)) {
            onChange([...value, trimmedTag]);
        }
        setInputValue('');
        setIsOpen(false);
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.trim()) {
                addTag(inputValue);
            }
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            removeTag(value[value.length - 1]);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            setInputValue('');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsOpen(true);
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div className="flex flex-wrap gap-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                {value.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md"
                    >
                        <Tag className="h-3 w-3" />
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
                
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder={value.length === 0 ? placeholder : ""}
                    className="flex-1 min-w-[120px] outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
            </div>

            {isOpen && (filteredTags.length > 0 || inputValue.trim()) && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredTags.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => addTag(tag.name)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-900 dark:text-gray-100"
                        >
                            <Tag className="h-4 w-4 text-gray-400" />
                            {tag.name}
                        </button>
                    ))}
                    
                    {inputValue.trim() && !filteredTags.some(tag => tag.name.toLowerCase() === inputValue.toLowerCase()) && (
                        <button
                            type="button"
                            onClick={() => addTag(inputValue)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-blue-600 dark:text-blue-400 border-t border-gray-200 dark:border-gray-600"
                        >
                            <Plus className="h-4 w-4" />
                            Create "{inputValue}"
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}