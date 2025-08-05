import {
  getCurrentUserSubscriptionPlanAPI,
  saveCheckoutIdAPI,
} from "@/res/api";
import { AppDispatch } from "@/store/store";
import { useAppSelector } from "@/store/store/storeSelectors";
import { getAllSubscriptionPlansAPI } from "@/store/subscription-plans/plansThunks";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PlanModalOpen from "./PlanModalOpen";

type PaddleEvent = {
  event: string;
  name: string;
  eventData: PaddleEventData;
  data: {
    transaction_id?: string;
  };
};

type PaddleEventData = {
  checkout?: {
    id: string;
    completed: boolean;
  };
  product?: {
    id: number;
    name: string;
  };
  user?: {
    id: string;
    email: string;
  };
  subscription?: {
    id: number;
    plan_id: number;
    status: string;
    next_bill_date: string;
  };
};

// Extend the Window interface to include Paddle
declare global {
  interface Window {
    Paddle?: {
      Environment: {
        set: (env: string) => void;
      };
      Setup: (config: {
        token: string;
        eventCallback?: (event: PaddleEvent) => void;
      }) => void;
      Checkout: {
        open: (options: {
          customer: { email: string };
          items: { priceId: string }[];
          custom_data?: { user_id?: string; user_email?: string };
        }) => void;
      };
    };
  }
}

const Plans = () => {
  const PricingPlans = useTranslations("PricingPlans");
  const { subscriptionPlans } = useAppSelector(
    (state) => state.subscriptionPlans
  );
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [userSelectedPlan, setUserSelectedPlan] = useState<string>("");
  const selectedPlanRef = useRef("");
  const [planModalOpen, setPlanModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // await dispatch(getAllSubscriptionPlansAPI()).unwrap();
        await dispatch(getAllSubscriptionPlansAPI()).unwrap();
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      }
    };

    const fetchCurrentUserPlan = async () => {
      try {
        const response = await getCurrentUserSubscriptionPlanAPI();

        setUserSelectedPlan(response.plan);
      } catch (error) {
        console.error("Error fetching current user plan:", error);
      }
    };

    fetchPlans();
    fetchCurrentUserPlan();
  }, [dispatch]);

  const handlePlanSelection = (planNameId: string) => {
    selectedPlanRef.current = planNameId; // Keep ref in sync
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.Paddle) {
      // Use sandbox during testing
      window.Paddle.Environment.set("production");
      window.Paddle.Setup({
        token: process.env.NEXT_PUBLIC_PADDLE_TOKEN || "",
        eventCallback: async (event) => {
          // console.log("Received Paddle event:", event);
          // console.log("Selected Plan (Ref):", selectedPlanRef.current);

          if (event.name === "checkout.completed") {
            // if (!event.data?.transaction_id) return;
            // console.log("event", event);
            await saveCheckoutIdAPI(
              event?.data?.transaction_id || "",
              selectedPlanRef.current
            );
          }
        },
      });
    }
  }, []);

  const handleCheckout = (priceId: string, planNameId: string) => {
    if (window.Paddle) {
      handlePlanSelection(planNameId);
      window.Paddle.Checkout.open({
        customer: {
          email: user?.user?.email || "",
        },
        items: [
          {
            priceId: priceId, // your actual price ID
          },
        ],

        // custom_data: {
        //   user_id: user?.user?._id,
        //   user_email: user?.user?.email,
        // },
      });
    }
  };

  if (!subscriptionPlans || subscriptionPlans.length === 0) {
    return <div className="text-center py-12">Loading plans...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {PricingPlans("title")}
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            {PricingPlans("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan._id}
              className={`rounded-lg shadow-lg overflow-hidden ${
                plan.nameId === userSelectedPlan
                  ? "ring-2 ring-custom-red-1 transform scale-105"
                  : ""
              }`}
            >
              <div
                className={`px-6 py-8 ${
                  plan.nameId === userSelectedPlan
                    ? "bg-custom-red-4"
                    : "bg-white"
                }`}
              >
                <h3
                  className={`text-lg font-medium uppercase tracking-wider ${
                    plan.nameId === userSelectedPlan
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {PricingPlans(plan.planName)}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span
                    className={`text-4xl font-extrabold ${
                      plan.nameId === userSelectedPlan
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={`ml-1 text-lg font-medium ${
                      plan.nameId === userSelectedPlan
                        ? "text-custom-white-1"
                        : "text-gray-500"
                    }`}
                  >
                    {PricingPlans("monthlyPayment")}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    plan.nameId === userSelectedPlan
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                >
                  {PricingPlans(plan.description)}
                </p>
              </div>
              <div className="bg-gray-50 px-6 pt-6 pb-8">
                <h4 className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {PricingPlans("features")}
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <svg
                        className="h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-700">
                        {PricingPlans(feature)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button
                    onClick={() => {
                      if (plan.nameId === "starter") {
                        setPlanModalOpen(true);
                      } else {
                        handleCheckout(plan.priceId, plan.nameId);
                      }
                    }}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                      plan.nameId === userSelectedPlan
                        ? "bg-custom-red-4 hover:bg-custom-red-1"
                        : "bg-gray-800 hover:bg-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-red-4`}
                  >
                    {plan.nameId === userSelectedPlan
                      ? PricingPlans("currentPlan")
                      : PricingPlans("getStated")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* plan modal */}
      {planModalOpen && userSelectedPlan !== "starter" && (
        <PlanModalOpen onClose={() => setPlanModalOpen(false)} />
      )}
    </div>
  );
};

export default Plans;

// visa test num 4111 1111 1111 1111
