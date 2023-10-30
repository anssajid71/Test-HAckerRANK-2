const { EventEmitter } = require('events');
const fs = require('fs');

class OrderProcessor extends EventEmitter {
  constructor() {
    super();
    this.stockData = JSON.parse(fs.readFileSync('stocklist.json'));
  }

  placeOrder(orderData) {
    const { orderNumber, lineItems } = orderData;
    let failed = false;

    lineItems.forEach((lineItem) => {
      const stockInfo = this.stockData.find(
        (item) => item.id === lineItem.itemId
      );
      if (!stockInfo || lineItem.quantity > stockInfo.stock) {
        failed = true;
        this.emit('PROCESSING FAILED', {
          orderNumber,
          reason: stockInfo ? 'INSUFFICIENT STOCK' : 'LINEITEMS EMPTY',
          itemId: lineItem.itemId,
        });
      }
    });

    if (!failed) {
      this.emit('PROCESSING SUCCESS', orderNumber);
    }
  }
}
module.exports = OrderProcessor;
