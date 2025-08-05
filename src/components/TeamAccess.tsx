import {
  createNewManagerAccountAPI,
  deleteManagerAPI,
  getOwnerManagersAPI,
  updateManagerDetailsAPI,
} from "@/res/api";
import { useAppSelector } from "@/store/store/storeSelectors";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ConformationModal from "./ConformationModal";
import EditManagerModal from "./EditManagerModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getAllUserRestaurantsAPI } from "@/store/restaurant/restaurantThunk";
import { useTranslations } from "next-intl";

type Manager = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  role: string;
}[];

const TeamAccess = () => {
  // const [managers, setManagers] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     email: "john@example.com",
  //     role: "Manager",
  //     status: "Active",
  //     // lastActive: "2 hours ago",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     role: "Senior Manager",
  //     status: "Active",
  //     // lastActive: "1 day ago",
  //   },
  //   {
  //     id: 3,
  //     name: "Robert Johnson",
  //     email: "robert@example.com",
  //     role: "Manager",
  //     status: "Inactive",
  //     // lastActive: "1 week ago",
  //   },
  // ]);
  const Managers = useTranslations("Managers");
  const [managers, setManagers] = useState<Manager>([]);
  const { restaurants } = useAppSelector((state) => state.restaurant);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const fetchedManagers = await getOwnerManagersAPI();
        setManagers(fetchedManagers);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, []);

  const [newManager, setNewManager] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const [isAddingManager, setIsAddingManager] = useState(false);
  const [expandedManager, setExpandedManager] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | { message: string }>(null);
  const [conformationModal, setConformationModal] = useState({
    isOpen: false,
    managerId: "",
    managerName: "",
  });
  const [editModal, setEditModal] = useState<{
    isOpen?: boolean;
    managerId?: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
  }>({
    isOpen: false,
    managerId: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setNewManager({
      ...newManager,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const combineFirstAndLastName = `${newManager.firstName.trim()} ${newManager.lastName.trim()}`;

    const newManagerObj = {
      userName: newManager.userName.trim(),
      firstName: newManager.firstName.trim(),
      lastName: newManager.lastName.trim(),
      password: newManager.password,
      restaurantId: selectedRestaurant,
    };

    setIsLoading(true);
    setError(null);
    try {
      const createNewManager = await createNewManagerAccountAPI(newManagerObj);
      // setManagers((prevManagers) => [...prevManagers, createNewManager]);
      setManagers([...managers, createNewManager.manager]);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? JSON.parse(error.message)
          : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsAddingManager(false);
      setIsLoading(false);
      // setNewManager({ firstName: "", lastName: "", password: "" });
      setNewManager({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
      });
    }
  };

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        await dispatch(getAllUserRestaurantsAPI()).unwrap();
      } catch (error) {
        console.error("error all fetch restaurant", error);
      }
    };

    fetchAllRestaurants();
  }, [dispatch]);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newManagerObj = {
  //     id: managers.length + 1,
  //     name: newManager.firstName,
  //     email: newManager.lastName,
  //     status: "Pending",
  //     lastActive: "Never",
  //   };
  //   setManagers([...managers, newManagerObj]);
  //   setNewManager({ name: "", email: "", role: "Manager", sendInvite: true });
  //   setIsAddingManager(false);
  // };

  const removeManager = async (id: string) => {
    try {
      const deleteResponse = await deleteManagerAPI(id);
      if (deleteResponse.success) {
        setManagers((prevManagers) =>
          prevManagers.filter((manager) => manager._id !== id)
        );
      }
    } catch (error) {
      console.error("Error removing manager:", error);
      setError({ message: "Failed to remove manager. Please try again." });
    }
  };

  const toggleManagerDetails = (id: string) => {
    setExpandedManager(expandedManager === id ? null : id);
  };

  const handleUpdateManagerDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const editManager = await updateManagerDetailsAPI(
        editModal.managerId ?? "",
        {
          userName: editModal.userName,
          firstName: editModal.firstName,
          lastName: editModal.lastName,
          password: editModal.password,
        }
      );
      if (editManager.success) {
        setManagers((prevManagers) =>
          prevManagers.map((manager) =>
            manager._id === editModal.managerId
              ? { ...manager, userName: editModal.userName }
              : manager
          )
        );
        setEditModal({
          isOpen: false,
          managerId: "",
          userName: "",
          firstName: "",
          lastName: "",
          password: "",
        });
      } else {
        setError({ message: "Failed to update manager details." });
      }
    } catch (error) {
      console.error("error with manager input error", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {Managers("title")}
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            {Managers("titleParagraph")}
          </p>
        </div>
        <button
          onClick={() => setIsAddingManager(true)}
          className="bg-custom-red-4 hover:bg-custom-red-1 text-white px-4 py-2 rounded-lg flex items-center w-full sm:w-auto justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          {Managers("addManager")}
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">
            {Managers("desktopTitle")}
          </h2>
          <p className="text-gray-500 text-sm">
            {Managers("desktopTitleParagraph")}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {Managers("name")}
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th> */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {Managers("role")}
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th> */}
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Active
                </th> */}
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {managers.map((manager) => (
                <tr key={manager._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {manager?.firstName?.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {manager.firstName} {manager.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {manager.email}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      // className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      // ${
                      //   manager.role === "Senior Manager"
                      //     ? "bg-purple-100 text-purple-800"
                      //     : "bg-green-100 text-green-800"
                      // }
                      // `}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                    >
                      {manager.role}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        manager.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : manager.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {manager.status}
                    </span>
                  </td> */}
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {manager.lastActive}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        setEditModal({
                          isOpen: true,
                          managerId: manager._id,
                          userName: manager.userName,
                          password: "",
                          firstName: manager.firstName,
                          lastName: manager.lastName,
                        })
                      }
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      {Managers("edit")}
                    </button>
                    <button
                      // onClick={() => removeManager(manager._id)}
                      onClick={() =>
                        setConformationModal({
                          isOpen: true,
                          managerId: manager._id,
                          managerName: `${manager.firstName} ${manager.lastName}`,
                        })
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      {Managers("remove")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {managers.map((manager) => (
          <div
            key={manager._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleManagerDetails(manager._id)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {manager.firstName.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {manager.firstName} {manager.lastName}
                  </div>
                  {/*//TODO I added only manager role option but in the future there will be more roles like senior manager... etc. */}
                  <div className="text-xs text-gray-500">{manager.role}</div>
                </div>
              </div>
              <div>
                {/* <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    manager.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : manager.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {manager.status}
                </span> */}
                <svg
                  className={`w-5 h-5 ml-2 text-gray-500 inline-block transition-transform ${
                    expandedManager === manager._id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {expandedManager === manager._id && (
              <div className="px-4 pb-4 border-t border-gray-200">
                <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                  {/* <div>
                    <p className="text-gray-500">Email</p>
                    <p className="text-gray-900">{manager.email}</p>
                  </div> */}
                  {/* <div>
                    <p className="text-gray-500">Last Active</p>
                    <p className="text-gray-900">{manager.lastActive}</p>
                  </div> */}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setEditModal({
                        isOpen: true,
                        managerId: manager._id,
                        userName: manager.userName,
                        password: "",
                        firstName: manager.firstName,
                        lastName: manager.lastName,
                      });
                    }}
                    className="px-3 py-1 border border-blue-600 rounded-md text-blue-600 text-sm"
                  >
                    {Managers("edit")}
                  </button>
                  <button
                    onClick={() => {
                      setConformationModal({
                        isOpen: true,
                        managerId: manager._id,
                        managerName: `${manager.firstName} ${manager.lastName}`,
                      });
                    }}
                    // onClick={() => removeManager(manager.id)}
                    className="px-3 py-1 border border-red-600 rounded-md text-red-600 text-sm"
                  >
                    {Managers("remove")}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Manager Modal */}
      {isAddingManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {Managers("addManagerModal")}
                </h3>
                <button
                  onClick={() => setIsAddingManager(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <select
                    name="restaurant"
                    id="restaurant-select"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-400 outline-none transition-all mb-3"
                    onChange={(e) => setSelectedRestaurant(e.target.value)}
                    value={selectedRestaurant || ""}
                    required
                  >
                    <option value="">Select a restaurant</option>
                    {restaurants?.map((rest) => (
                      <option
                        key={rest._id}
                        value={rest._id}
                        className="truncate"
                      >
                        {rest.restaurantName} {" | "}
                        {rest.businessUrl}
                      </option>
                    ))}
                  </select>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {Managers("fNameLabel")}
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="firstName"
                    placeholder={Managers("fNamePlaceHolder")}
                    value={newManager.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-gray-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {Managers("lNameLabel")}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder={Managers("lNamePlaceHolder")}
                    value={newManager.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-gray-400"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {Managers("userNameLabel")}
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder={Managers("userNamePlaceHolder")}
                    value={newManager.userName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-gray-400"
                    required
                  />
                  <p className="text-sm mt-3 text-gray-700">
                    {Managers("userNameTip")}
                  </p>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {Managers("passwordLabel")}
                  </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder={Managers("passwordPlaceHolder")}
                    value={newManager.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-gray-400"
                    required
                  />
                </div>

                {/* <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={newManager.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Manager">Manager</option>
                    <option value="Senior Manager">Senior Manager</option>
                    <option value="Area Manager">Area Manager</option>
                  </select>
                </div> */}

                {/* <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="sendInvite"
                      name="sendInvite"
                      type="checkbox"
                      checked={newManager.sendInvite}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="sendInvite"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Send invitation email
                    </label>
                  </div>
                </div> */}

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddingManager(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                  >
                    {Managers("cancelBtn")}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-custom-red-4 hover:bg-custom-red-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                  >
                    {Managers("formAddBtn")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-6 w-6 text-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-red-800">
                    Action Required
                  </h3>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-red-700 font-medium">{error.message}</p>
              <p className="text-gray-600">
                To continue, please upgrade your plan to add more managers.
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
              <Link
                href="/dashboard/plans"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Upgrade Plan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-2 -mr-1 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      {conformationModal.isOpen && (
        <ConformationModal
          isOpen={conformationModal.isOpen}
          actionName={conformationModal.managerName}
          onClose={() =>
            setConformationModal({
              isOpen: false,
              managerId: "",
              managerName: "",
            })
          }
          onConfirm={() => {
            removeManager(conformationModal.managerId);
            setConformationModal({
              isOpen: false,
              managerId: "",
              managerName: "",
            });
          }}
        />
      )}

      {editModal.isOpen && (
        <EditManagerModal
          isOpen={editModal.isOpen}
          userName={editModal.userName}
          setEditModal={setEditModal}
          editModal={editModal}
          password={editModal.password ?? ""}
          onClose={() =>
            setEditModal({
              isOpen: false,
              managerId: "",
              userName: "",
              password: "",
              firstName: "",
              lastName: "",
            })
          }
          onSubmit={handleUpdateManagerDetails}
        />
      )}
    </div>
  );
};

export default TeamAccess;
