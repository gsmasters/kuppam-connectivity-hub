import { Toggle } from "@/components/ui/toggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
} from 'lucide-react';
import { Editor } from '@tiptap/react';
import { useState } from 'react';

interface EditorToolbarProps {
  editor: Editor;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const EditorToolbar = ({ editor, onImageUpload }: EditorToolbarProps) => {
  const [url, setUrl] = useState<string>('');
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const setLink = () => {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    setUrl('');
    setShowLinkDialog(false);
  };

  return (
    <div className="border-b p-2 flex flex-wrap gap-2">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogTrigger asChild>
          <Toggle size="sm" pressed={editor.isActive('link')}>
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Input
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={setLink}>Add</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'left' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'center' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'right' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>

      <label className="cursor-pointer">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageUpload}
        />
        <div className="p-2 hover:bg-accent rounded-sm">
          <ImageIcon className="h-4 w-4" />
        </div>
      </label>

      <ColorPicker editor={editor} showColorPicker={showColorPicker} setShowColorPicker={setShowColorPicker} />
    </div>
  );
};

const ColorPicker = ({ 
  editor, 
  showColorPicker, 
  setShowColorPicker 
}: { 
  editor: Editor; 
  showColorPicker: boolean; 
  setShowColorPicker: (show: boolean) => void;
}) => (
  <Dialog open={showColorPicker} onOpenChange={setShowColorPicker}>
    <DialogTrigger asChild>
      <Toggle size="sm">
        <Palette className="h-4 w-4" />
      </Toggle>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Text Color</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-6 gap-2">
        {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'].map((color) => (
          <button
            key={color}
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
            onClick={() => {
              editor.chain().focus().setColor(color).run();
              setShowColorPicker(false);
            }}
          />
        ))}
      </div>
    </DialogContent>
  </Dialog>
);