import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import React from "react";
import { NavLink } from "react-router";
import { useCart } from "../../context/cart/CartContext";

interface CartIconProps {
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { itemsCount } = useCart();

  return (
    <NavLink to="/profile">
      <Badge count={itemsCount} size="small" className="cursor-pointer">
        <ShoppingCartOutlined className="text-2xl text-black!" />
      </Badge>
    </NavLink>
  );
};

export default CartIcon;
