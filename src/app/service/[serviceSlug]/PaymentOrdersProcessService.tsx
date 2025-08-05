import React from "react";

const PaymentOrdersProcessService = () => {
  return (
    <section className="px-4 md:px-16 py-16 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          💳 Payment & Order Process
        </h2>

        {/* Intro Paragraph */}
        <p className="text-lg md:text-xl text-center text-gray-600 mb-10">
          Soon, you’ll be able to accept orders and payments directly from your
          digital menu — no third-party apps, no setup headaches. Your customers
          will scan your QR code, browse your menu, place an order, and pay —
          all from their phone.
        </p>

        {/* Key Features (Coming Soon) */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center">What’s Coming:</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p>
                <strong>Live Order Dashboard:</strong> Easily manage and track
                incoming orders in real-time — mark them as prepared, ready, or
                delivered.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p>
                <strong>Direct Payments:</strong> Let customers pay with cards,
                Apple Pay, Google Pay, and more — no third-party fees or
                redirects.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p>
                <strong>Fully Integrated:</strong> One system for QR menu,
                orders, and payments — no extra hardware or software required.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <p>
                <strong>Customizable for Any Service:</strong> Works for
                dine-in, takeaway, or delivery workflows.
              </p>
            </li>
          </ul>
        </div>

        {/* Coming Soon Note */}
        <div className="mt-12 text-center">
          <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
            Coming Soon
          </span>
          <p className="mt-3 text-gray-600">
            We’re actively building this feature based on real restaurant
            feedback — stay tuned for launch!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentOrdersProcessService;
