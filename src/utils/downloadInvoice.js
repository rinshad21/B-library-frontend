

export const downloadInvoicePDF = async (order) => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Invoice", 20, 20);
  doc.setFontSize(12);
  doc.text(`Order ID: ${order._id}`, 20, 30);
  doc.text(`Name: ${order.name}`, 20, 40);
  doc.text(`Email: ${order.email}`, 20, 50);
  doc.text(`Phone: ${order.phone}`, 20, 60);
  doc.text(`Total Price: $${order.totalPrice}`, 20, 70);
  doc.text(
    `Address: ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`,
    20,
    80
  );

  doc.text("Products:", 20, 90);
  order.productId.forEach((p, i) => {
    doc.text(`- ${p}`, 25, 100 + i * 10);
  });

  doc.save(`invoice-${order._id}.pdf`);
};
