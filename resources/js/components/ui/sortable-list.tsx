import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import {
    CSS,
} from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortableItem {
    id: string;
    content: React.ReactNode;
}

interface SortableItemComponentProps {
    item: SortableItem;
    onRemove?: (id: string) => void;
}

function SortableItemComponent({ item, onRemove }: SortableItemComponentProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
                flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm
                ${isDragging ? 'opacity-50' : ''}
            `}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
            >
                <GripVertical className="h-4 w-4" />
            </div>
            
            <div className="flex-1">
                {item.content}
            </div>
            
            {onRemove && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(item.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

interface SortableListProps {
    items: SortableItem[];
    onReorder: (items: SortableItem[]) => void;
    onRemove?: (id: string) => void;
    className?: string;
}

export function SortableList({ 
    items, 
    onReorder, 
    onRemove, 
    className = '' 
}: SortableListProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over?.id);

            const newItems = arrayMove(items, oldIndex, newIndex);
            onReorder(newItems);
        }
    }

    const handleRemove = (id: string) => {
        if (onRemove) {
            onRemove(id);
        } else {
            // Default behavior: remove from list
            const newItems = items.filter(item => item.id !== id);
            onReorder(newItems);
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {items.map((item) => (
                        <SortableItemComponent
                            key={item.id}
                            item={item}
                            onRemove={handleRemove}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}

// Example usage component
export function SortableListExample() {
    const [items, setItems] = useState<SortableItem[]>([
        { id: '1', content: <div>Item 1: First item in the list</div> },
        { id: '2', content: <div>Item 2: Second item in the list</div> },
        { id: '3', content: <div>Item 3: Third item in the list</div> },
        { id: '4', content: <div>Item 4: Fourth item in the list</div> },
    ]);

    const addItem = () => {
        const newId = (items.length + 1).toString();
        const newItem: SortableItem = {
            id: newId,
            content: <div>Item {newId}: New item added to the list</div>
        };
        setItems([...items, newItem]);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sortable List</h3>
                <Button onClick={addItem} variant="outline" size="sm">
                    Add Item
                </Button>
            </div>
            
            <SortableList
                items={items}
                onReorder={setItems}
                className="max-w-md"
            />
            
            <div className="text-sm text-muted-foreground">
                Drag items by the grip handle to reorder them
            </div>
        </div>
    );
}