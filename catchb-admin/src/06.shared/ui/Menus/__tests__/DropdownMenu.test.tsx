import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { DropdownMenu } from "@shared/ui/Menus";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Menus");

describe("DropdownMenu", () => {
  type ItemType = {
    id: string;
    label: string;
  };

  const items: ItemType[] = [
    { id: "1", label: "Item 1" },
    { id: "2", label: "Item 2" },
    { id: "3", label: "Item 3" },
  ];

  const selectedItem = items[0];

  const renderItem = (item: ItemType) => item.label;

  const keyExtractor = (item: ItemType) => item.id;

  const onItemClick = vi.fn();

  it("calls onItemClick when an item is clicked", () => {
    const { getByTestId } = renderWithProviders(
      <DropdownMenu
        items={items}
        selectedItem={selectedItem}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onItemClick={onItemClick}
      />
    );

    // Open the dropdown menu
    fireEvent.click(getByTestId("menu"));

    fireEvent.click(getByTestId(`item-${keyExtractor(selectedItem)}`));
    expect(onItemClick).toHaveBeenCalledWith(selectedItem);

    // Open the dropdown menu
    fireEvent.click(getByTestId("menu"));

    // click outside to close the menu
    fireEvent.mouseDown(document.body);
    expect(getByTestId("menu")).toBeInTheDocument();
});
});
