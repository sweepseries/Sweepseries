import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props<T> {
  items: T[];
  selectedItem: T;
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  onItemClick: (item: T) => void;
}

export function DropdownMenu<T>({
  items,
  selectedItem,
  renderItem,
  keyExtractor,
  onItemClick,
}: Readonly<Props<T>>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (item: T) => {
    onItemClick(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={containerRef}>
      <button onClick={handleToggle} data-testid="menu">{renderItem(selectedItem)}</button>
      {isOpen && (
        <Menu>
          {items.map((item) => (
            <MenuItem
              key={keyExtractor(item)}
              onClick={() => handleSelect(item)}
              data-testid={`item-${keyExtractor(item)}`}
            >
              {renderItem(item)}
            </MenuItem>
          ))}
        </Menu>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  user-select: none;
`;

const Menu = styled.ul`
  display: flex;
  margin-top: 4px;
  padding: 0;
  position: absolute;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background300};
  border-radius: 4px;
  overflow-y: auto;
  z-index: 100;
`;

const MenuItem = styled.li`
  display: flex;
  padding: 8px;
  cursor: pointer;
`;
