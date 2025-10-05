import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Empty, Image, InputNumber, List, Tag, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CartItem } from '../../context/cart/CartContext';
import { useCart } from '../../context/cart/CartContext';

const { Title, Text } = Typography;

interface CartItemsProps {
  showTitle?: boolean;
}

const CartItems: React.FC<CartItemsProps> = ({ showTitle = true }) => {
  const { t } = useTranslation(['common', 'landing']);
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Card className="border-primary-200">
        {showTitle && (
          <Title level={4} className="text-primary-800 mb-4 flex items-center">
            <ShoppingCartOutlined className="mr-2" />
            {t('cart.title') || 'Shopping Cart'}
          </Title>
        )}
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Text className="text-gray-500">
              {t('cart.empty') || 'Your cart is empty'}
            </Text>
          }
        />
      </Card>
    );
  }

  const handleQuantityChange = (item: CartItem, newQuantity: number | null) => {
    if (newQuantity && newQuantity > 0) {
      updateQuantity(item.id, item.selectedColor, newQuantity);
    }
  };

  return (
    <Card className="border-primary-200">
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <Title level={4} className="text-primary-800 mb-0 flex items-center">
            <ShoppingCartOutlined className="mr-2" />
            {t('cart.title') || 'Shopping Cart'} ({items.length})
          </Title>
          <Button
            type="text"
            onClick={clearCart}
            className="text-red-500 hover:text-red-700"
            size="small"
          >
            {t('cart.clearAll') || 'Clear All'}
          </Button>
        </div>
      )}

      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            key={`${item.id}-${item.selectedColor}`}
            className="border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center w-full gap-4">
              {/* Product Image */}
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md object-cover"
                preview={false}
              />

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Text strong className="block text-gray-900 truncate">
                  {item.name}
                </Text>
                <div className="flex items-center gap-2 mt-1">
                  <Tag color="gold" className="text-xs">
                    {item.selectedColor === 'yellow' && (t('products.colors.yellow') || 'Yellow Gold')}
                    {item.selectedColor === 'white' && (t('products.colors.white') || 'White Gold')}
                    {item.selectedColor === 'rose' && (t('products.colors.rose') || 'Rose Gold')}
                  </Tag>
                </div>
                <Text className="text-lg font-semibold text-primary-600">
                  ${item.price.toFixed(2)}
                </Text>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Text className="text-sm text-gray-500">
                    {t('cart.quantity') || 'Qty'}:
                  </Text>
                  <InputNumber
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item, value)}
                    size="small"
                    className="w-16"
                  />
                </div>
                
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeFromCart(item.id, item.selectedColor)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  size="small"
                />
              </div>
            </div>

            {/* Subtotal */}
            <div className="mt-2 text-right">
              <Text className="text-sm text-gray-500">
                {t('cart.subtotal') || 'Subtotal'}: 
                <span className="font-semibold text-gray-900 ml-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </Text>
            </div>
          </List.Item>
        )}
      />

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Title level={5} className="mb-0 text-gray-900">
            {t('cart.total') || 'Total'}:
          </Title>
          <Title level={4} className="mb-0 text-primary-600">
            ${totalPrice.toFixed(2)}
          </Title>
        </div>
      </div>
    </Card>
  );
};

export default CartItems;