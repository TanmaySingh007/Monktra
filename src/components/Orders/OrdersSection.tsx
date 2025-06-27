import ContentCard from '@/components/Feed/ContentCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/useRedux';
import { ArrowUpDown, Clock, Package } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

const OrdersSection: React.FC = () => {
  const { items, customOrder } = useAppSelector((state) => state.feed);

  // Get items in custom order
  const orderedItems = customOrder.length > 0 ?
  customOrder.map((id) => items.find((item) => item.id === id)).filter(Boolean) :
  [];

  const recentlyReordered = orderedItems.slice(0, 12);

  if (customOrder.length === 0) {
    return (
      <motion.div
        className="p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} data-id="md7k8iacd" data-path="src/components/Orders/OrdersSection.tsx">

        <div className="max-w-md mx-auto" data-id="javv7345o" data-path="src/components/Orders/OrdersSection.tsx">
          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }} data-id="iygihcvtu" data-path="src/components/Orders/OrdersSection.tsx">

            <Package className="w-16 h-16 mx-auto mb-4 text-amber-600 dark:text-amber-400" data-id="x0338k79q" data-path="src/components/Orders/OrdersSection.tsx" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white" data-id="icccttnva" data-path="src/components/Orders/OrdersSection.tsx">
            No Custom Orders Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6" data-id="mb1qfifp0" data-path="src/components/Orders/OrdersSection.tsx">
            Start dragging and reordering content cards in your feed to see them organized here!
          </p>
          <Badge variant="outline" className="px-4 py-2" data-id="tkjk18ol5" data-path="src/components/Orders/OrdersSection.tsx">
            <ArrowUpDown className="w-4 h-4 mr-2" data-id="ts8e1d21h" data-path="src/components/Orders/OrdersSection.tsx" />
            Drag & Drop to Reorder
          </Badge>
        </div>
      </motion.div>);

  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }} data-id="6cp8xmmmp" data-path="src/components/Orders/OrdersSection.tsx">

      <motion.div
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }} data-id="vdu8y1ywb" data-path="src/components/Orders/OrdersSection.tsx">

        <div className="flex items-center justify-between mb-4" data-id="lvjsgsbjb" data-path="src/components/Orders/OrdersSection.tsx">
          <div className="flex items-center gap-3" data-id="7i22ftq8h" data-path="src/components/Orders/OrdersSection.tsx">
            <motion.div
              className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} data-id="1qmoob6ks" data-path="src/components/Orders/OrdersSection.tsx">

              <Package className="w-6 h-6 text-amber-600 dark:text-amber-400" data-id="chz50p18r" data-path="src/components/Orders/OrdersSection.tsx" />
            </motion.div>
            <div data-id="22nzeu0d5" data-path="src/components/Orders/OrdersSection.tsx">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white" data-id="k8zjcn7wq" data-path="src/components/Orders/OrdersSection.tsx">
                Custom Feed Order
              </h2>
              <p className="text-gray-600 dark:text-gray-300" data-id="jsosrnhdw" data-path="src/components/Orders/OrdersSection.tsx">
                Your personalized content arrangement
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="px-3 py-1" data-id="q6etw7ui9" data-path="src/components/Orders/OrdersSection.tsx">
            <Clock className="w-4 h-4 mr-2" data-id="4gpcc5vk0" data-path="src/components/Orders/OrdersSection.tsx" />
            {orderedItems.length} items arranged
          </Badge>
        </div>

        <motion.div
          className="flex gap-3 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }} data-id="rvl8gbwtk" data-path="src/components/Orders/OrdersSection.tsx">

          <Badge variant="outline" className="px-3 py-1" data-id="3xcys5knd" data-path="src/components/Orders/OrdersSection.tsx">
            <ArrowUpDown className="w-4 h-4 mr-2" data-id="argrvt2ov" data-path="src/components/Orders/OrdersSection.tsx" />
            Drag & Drop Enabled
          </Badge>
          <Badge variant="outline" className="px-3 py-1" data-id="x31oqf9by" data-path="src/components/Orders/OrdersSection.tsx">
            Auto-saved
          </Badge>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }} data-id="u2661nn7y" data-path="src/components/Orders/OrdersSection.tsx">

        {recentlyReordered.map((item, index) =>
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1 * index,
            duration: 0.4
          }}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 }
          }} data-id="m346gh3mr" data-path="src/components/Orders/OrdersSection.tsx">

            <div className="relative" data-id="t6atrdjyk" data-path="src/components/Orders/OrdersSection.tsx">
              <ContentCard item={item} data-id="un9fdm7g4" data-path="src/components/Orders/OrdersSection.tsx" />
              <motion.div
              className="absolute -top-2 -left-2 bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 * index, type: "spring", stiffness: 300 }} data-id="uociezaft" data-path="src/components/Orders/OrdersSection.tsx">

                {index + 1}
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {orderedItems.length > 12 &&
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }} data-id="cnw6v38fr" data-path="src/components/Orders/OrdersSection.tsx">

          <p className="text-gray-600 dark:text-gray-300 mb-4" data-id="ayx9ms5qz" data-path="src/components/Orders/OrdersSection.tsx">
            Showing first 12 of {orderedItems.length} custom arranged items
          </p>
          <Button variant="outline" className="px-6" data-id="wplqqfvkk" data-path="src/components/Orders/OrdersSection.tsx">
            View All Ordered Items
          </Button>
        </motion.div>
      }
    </motion.div>);

};

export default OrdersSection;