const OrderProcessor = require('./orderProceser');
const orderProcessor = new OrderProcessor();
orderProcessor.on('PROCESSING_STARTED', (orderNumber) => {
  console.log(`Pre-Order Checks Running for ${orderNumber}`);
});
orderProcessor.on('PROCESSING FAILED', (failureData) => {
  console.log('Failed Order');
  console.log(`- OrderNumber: ${failureData.orderNumber}`);
  console.log(`- Reason: ${failureData.reason}`);
  if (failureData.itemId) {
    console.log(`- ItemId: ${failureData.itemId}`);
  }
});

orderProcessor.on('PROCESSING SUCCESS', (orderNumber) => {
  console.log(`Pre-Order Checks Passed for ${orderNumber}`);
});

orderProcessor.placeOrder({
  orderNumber: 'OD2323',
  lineItems: [
    { itemId: 3, quantity: 4 },
    { itemId: 5, quantity: 4 },
  ],
});
