import Images from "@/assets/images/Images";
import Image from "next/image";
import React from "react";

const QRMenuService = () => {
  return (
    <section className="px-4 md:px-16 py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          📲 QR Menu Generator
        </h2>
        <p className="text-lg md:text-xl text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Tired of asking a developer to update your menu every time you change
          a price or run out of an item? With our{" "}
          <span className="font-semibold">QR Menu Generator</span>, you’re in
          full control — no tech knowledge needed.
        </p>

        <p className="text-lg md:text-xl text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Tired of paying every time you want your menu to look a little
          different? We’re constantly adding new styles and features — no extra
          cost, no coding needed.
        </p>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Features & Steps */}
          <div className="space-y-8">
            {/* Features List */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Why restaurants love it:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <p>No developer needed — make changes anytime</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <p>Custom QR code you can print or share instantly</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <p>Mobile-first design that looks great everywhere</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <p>Live updates — remove or edit meals in seconds</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <p>
                    New features and templates are added regularly — no need to
                    pay a developer every time you want to update your design.
                  </p>
                </li>
              </ul>
            </div>

            {/* How It Works */}
            <div className="mt-5">
              <h3 className="text-xl font-semibold mb-4">How it works:</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Sign up in less than a minute</li>
                <li>Add your restaurant name, logo, and meals</li>
                <li>Customize your design and categories</li>
                <li>Your unique QR code is ready — print it or share it</li>
              </ol>
            </div>

            {/* Call to Action */}
            <div className="mt-6">
              <a
                href="/register"
                className="inline-block bg-black text-white text-lg px-6 py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Start Now – It&apos;s Free to Try
              </a>
              <p className="mt-3 text-sm text-gray-500">
                Join restaurants that stopped waiting on developers and started
                managing their menus themselves.
              </p>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="relative">
            <Image
              src={Images.qr_example}
              alt="QR menu preview"
              className="rounded-2xl shadow-xl w-full"
            />
            {/* Optional caption */}
            <p className="text-center text-sm text-gray-500 mt-2">
              Example of a QR code and mobile-ready menu
            </p>
          </div>
        </div>

        {/* Optional: Visual Use Case */}
        <div className="mt-20 bg-gray-50 p-6 md:p-10 rounded-xl shadow-sm text-center">
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your customer sits down, scans a QR code, and instantly sees your
            menu — styled to match your brand. You sold out of a dish? Just log
            in and remove it — no delays, no support tickets, no stress.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QRMenuService;
