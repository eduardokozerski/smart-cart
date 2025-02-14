import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import Cart from "@/components/Cart";
import { useCartStore } from "@/store/cartStore";

describe("Cart Component", () => {
  beforeEach(() => {
    act(() => {
      useCartStore.setState({
        cart: [
          { id: 1, name: "T-Shirt", price: 50, quantity: 2, image: "/tshirt.jpg" }
        ],
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
        total: () => 100,
        clearCart: jest.fn(),
      });
    });
  });

  afterEach(() => {
    cleanup();
  });

  test("renders correctly when open", () => {
    render(<Cart isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText(/your cart/i)).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    const { queryByText } = render(<Cart isOpen={false} onClose={jest.fn()} />);
    expect(queryByText(/your cart/i)).not.toBeInTheDocument();
  });

  test("removes an item from the cart", () => {
    render(<Cart isOpen={true} onClose={jest.fn()} />);
    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);
    expect(useCartStore.getState().removeFromCart).toHaveBeenCalledWith(1);
  });

  test("updates quantity when buttons are clicked", () => {
    render(<Cart isOpen={true} onClose={jest.fn()} />);
    
    const increaseButton = screen.getByText("+");
    fireEvent.click(increaseButton);
    expect(useCartStore.getState().updateQuantity).toHaveBeenCalledWith(1, "increase");

    const decreaseButton = screen.getByText("-");
    fireEvent.click(decreaseButton);
    expect(useCartStore.getState().updateQuantity).toHaveBeenCalledWith(1, "decrease");
  });

  test("clears cart when Clear Cart button is clicked", () => {
    render(<Cart isOpen={true} onClose={jest.fn()} />);
    const clearCartButton = screen.getByText(/clear cart/i);
    fireEvent.click(clearCartButton);
    expect(useCartStore.getState().clearCart).toHaveBeenCalled();
  });

  test("displays subtotal correctly", () => {
    render(<Cart isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("Subtotal: $100.00")).toBeInTheDocument();
  });

  test("displays 'Your cart is empty' when no items are in the cart", () => {
    act(() => {
      useCartStore.setState({
        cart: [],
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
        total: () => 0,
        clearCart: jest.fn(),
      });
    });

    render(<Cart isOpen={true} onClose={jest.fn()} />);
    
    // Usando regex para uma correspondência mais flexível
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test("displays correct total when multiple items are added", () => {
    act(() => {
      useCartStore.setState({
        cart: [
          { id: 1, name: "T-Shirt", price: 50, quantity: 2, image: "/tshirt.jpg" },
          { id: 2, name: "Pants", price: 60, quantity: 1, image: "/pants.jpg" },
        ],
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
        total: () => 160,
        clearCart: jest.fn(),
      });
    });

    render(<Cart isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText("Subtotal: $160.00")).toBeInTheDocument();
  });
});
