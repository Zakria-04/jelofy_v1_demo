import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { getAllSubscriptionPlansAPI } from "@/store/subscription-plans/plansThunks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Pricing = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { subscriptionPlans } = useAppSelector(
    (state) => state.subscriptionPlans
  );
  const PricingPlans = useTranslations("PricingPlans");
  useEffect(() => {
    // const fetchSubscriptionPlans = async () => {
    //   try {
    //     await dispatch(getAllSubscriptionPlansAPI()).unwrap();
    //   } catch (error) {
    //     console.error("Error fetching subscription plans:", error);
    //   }
    // };
    // fetchSubscriptionPlans();

    const fetchSubscriptionPlans = async () => {
      try {
        // await dispatch(getSelectedLanguagePlanThunk()).unwrap();
        await dispatch(getAllSubscriptionPlansAPI()).unwrap();
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      }
    };

    fetchSubscriptionPlans();
  }, [dispatch]);

  return (
    <section id="pricing" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
          <p className="text-gray-600 mb-10">
            Choose the plan that fits your business best.
          </p>
        </div>

        <div className="grid mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subscriptionPlans?.map((plan) => (
            <div
              key={plan._id}
              className={`flex flex-col justify-between rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                plan.planName === "businessPlan.planName"
                  ? "transform md:scale-105"
                  : ""
              }`}
            >
              <div
                className={`px-6 py-4 ${
                  plan.planName === "businessPlan.planName"
                    ? "bg-custom-red-4 text-white"
                    : "bg-white"
                }`}
              >
                <h3 className="text-2xl font-semibold capitalize">
                  {PricingPlans(plan.planName)}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span
                    className={`ml-1 text-lg font-medium ${
                      plan.planName === "businessPlan.planName"
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {plan.price > 0 ? PricingPlans("monthlyPayment") : ""}
                  </span>
                </div>
                <p className="mt-4 text-sm min-h-[96px]">
                  {/* Adjust height to match across plans */}
                  {PricingPlans(plan.description)}
                </p>
              </div>
              <div className="px-6 pt-6 pb-8 bg-gray-50 flex flex-col justify-between flex-grow">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className={`h-5 w-5 flex-shrink-0 ${
                          plan.planName === "businessPlan.planName"
                            ? "text-custom-red-4"
                            : "text-green-500"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-gray-700">
                        {PricingPlans(feature)}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    router.push("/auth?=signup")
                  }}
                  className={`w-full px-4 py-3 rounded-md font-medium mt-auto ${
                    plan.planName === "businessPlan.planName"
                      ? "bg-custom-red-4 text-white hover:bg-custom-red-1"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {plan.price === 0
                    ? PricingPlans("getStated")
                    : PricingPlans("choosePlan")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
