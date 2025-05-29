import { Editor } from "@tiptap/react";
import styled from "styled-components";

import { AppIcon } from "@shared/ui/Icons";

interface Props {
  editor: Editor;
}

export function EditorToolbar({ editor }: Readonly<Props>) {
  return (
    <Toolbar>
      <Wrapper>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          $isActive={editor.isActive("bold")}
          data-testid="toolbar-bold"
        >
          <AppIcon icon="bold" size={20} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          $isActive={editor.isActive("italic")}
          data-testid="toolbar-italic"
        >
          <AppIcon icon="italic" size={20} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          $isActive={editor.isActive("strike")}
          data-testid="toolbar-strikethrough"
        >
          <AppIcon icon="strikethrough" size={20} />
        </ToolbarButton>
      </Wrapper>
      <Wrapper>
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          $isActive={editor.isActive("paragraph")}
          data-testid="toolbar-paragraph"
        >
          <AppIcon icon="paragraph" size={20} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          $isActive={editor.isActive("heading", { level: 1 })}
          data-testid="toolbar-heading-1"
        >
          <AppIcon icon="h1" size={20} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          $isActive={editor.isActive("heading", { level: 2 })}
          data-testid="toolbar-heading-2"
        >
          <AppIcon icon="h2" size={20} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          $isActive={editor.isActive("heading", { level: 3 })}
          data-testid="toolbar-heading-3"
        >
          <AppIcon icon="h3" size={20} />
        </ToolbarButton>
      </Wrapper>
      <Wrapper>
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          data-testid="toolbar-undo"
        >
          <AppIcon icon="undo" size={20} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          data-testid="toolbar-redo"
        >
          <AppIcon icon="redo" size={20} />
        </ToolbarButton>
      </Wrapper>
      <Wrapper>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          $isActive={editor.isActive("bulletList")}
          data-testid="toolbar-bullet-list"
        >
          <AppIcon icon="bullet-list" size={20} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          $isActive={editor.isActive("orderedList")}
          data-testid="toolbar-ordered-list"
        >
          <AppIcon icon="numbered-list" size={20} />
        </ToolbarButton>
      </Wrapper>
    </Toolbar>
  );
}

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
`;

const ToolbarButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  padding: 0.25rem;
  border-radius: 8px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.background900 : "transparent"};
`;
