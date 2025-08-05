import { useTranslations } from "next-intl";
import React from "react";

const Terms = () => {
  const TermsService = useTranslations("TermsService");
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">{TermsService("title")}</h1>
      <p className="text-sm text-gray-500 mb-8">{TermsService("subTitle")}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {TermsService("introduction")}
        </h2>
        <p>{TermsService("introductionText")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {TermsService("subscriptionPayment")}
        </h2>
        {/* <p>
          Our platform offers subscription-based plans. By subscribing, you
          agree to be billed on a recurring basis according to your selected
          plan. Payments are processed securely via <strong>Paddle</strong>, our
          payment provider. Paddle may handle your billing information and
          transaction details in accordance with their{" "}
          <a
            href="https://www.paddle.com/legal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            terms and policies
          </a>
          .
        </p>
        <p>
          You may cancel your subscription at any time. Features and access will
          remain active until the end of your billing period.
        </p> */}
        <p>
          {TermsService("subscriptionPaymentText1")}{" "}
          <strong>{TermsService("paddle")}</strong>{" "}
          {TermsService("subscriptionPaymentText2")}{" "}
          <a
            href="https://www.paddle.com/legal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {TermsService("termsAndPolicies")}
          </a>{" "}
        </p>
        <p>{TermsService("subscriptionPaymentText3")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {TermsService("refundPolicy")}
        </h2>
        {/* <p>
          We offer a <strong>7-day refund</strong> for new subscribers if the
          platform does not meet your expectations. Refund requests must be
          processed through Paddle and can be submitted to{" "}
          <a
            href="mailto:jelofyteam@gmail.com"
            className="text-blue-600 underline"
          >
            jelofyteam@gmail.com
          </a>
          .
        </p>
        <p>
          Refunds will not be issued after 7 days or for subscription renewals.
          Paddle&apos;s refund processing times may apply.
        </p> */}
        <p>
          {TermsService("refundPolicyText1")}{" "}
          <strong>{TermsService("refundText")}</strong>{" "}
          {TermsService("refundPolicyText2")}{" "}
          <a
            href="mailto:jelofyteam@gmail.com"
            className="text-blue-600 underline"
          >
            jelofyteam@gmail.com
          </a>
        </p>
        <p>{TermsService("refundPolicyText3")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {TermsService("privacyPolicy")}
        </h2>
        <p>{TermsService("privacyPolicyText1")}</p>
        <p>{TermsService("privacyPolicyText2")}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {TermsService("dataSecurity")}
        </h2>
        <p>
          {/* All customer data is stored securely. You are responsible for
          maintaining the security of your account and password. Paddle complies
          with PCI-DSS standards for payment processing. */}
          {TermsService("dataSecurityText")}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {TermsService("changesToTerms")}
        </h2>
        <p>{TermsService("changesToTermsText")}</p>
      </section>

      {/* <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          7. Limitation of Liability
        </h2>
        <p>
          Jelofy is not liable for any payment processing errors, fees, or
          disputes arising from transactions handled by Paddle. You agree to
          resolve such issues directly with Paddle.
        </p>
      </section> */}

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {TermsService("contactUs")}
        </h2>
        <p>
          {TermsService("contactUsText")}
          {" "}
          <a
            href="mailto:jelofyteam@gmail.com"
            className="text-blue-600 underline"
          >
            jelofyteam@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Terms;
