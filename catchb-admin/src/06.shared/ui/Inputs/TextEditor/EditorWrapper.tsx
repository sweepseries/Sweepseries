import styled from "styled-components";

export const EditorWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;

  .ProseMirror {
    height: calc(100dvh - 360px);
    white-space: pre-wrap;
    overflow-y: auto;
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray900};
    background-color: ${({ theme }) => theme.colors.background100};
  }
  
  .tiptap p.is-editor-empty:first-child::before {
    color: ${({ theme }) => theme.colors.gray500};
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;
