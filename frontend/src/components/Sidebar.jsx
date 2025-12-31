import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeltons/SidebarSkelton";

const Sidebar = () => {
  const {
    selectedUser,
    users,
    getUsers,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // fetch users once
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // memoized online set
  const onlineSet = useMemo(
    () => new Set(onlineUsers),
    [onlineUsers]
  );

  // filtered users
  const filteredUsers = useMemo(() => {
    if (!showOnlineOnly) return users;
    return users.filter((user) => onlineSet.has(user._id));
  }, [users, showOnlineOnly, onlineSet]);

  // online count excluding self
  const onlineCount = useMemo(() => {
    if (!authUser) return 0;
    return onlineUsers.filter((id) => id !== authUser._id).length || 0;
  }, [onlineUsers, authUser]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="w-18 lg:w-60 bg-blue-300/10 h-full rounded-2xl">
      <div className="flex flex-col h-full border rounded-2xl border-[#219ebc]/10">
        {/* Header */}
        <div className="flex gap-2 mt-3 border-b border-[#219ebc]/10 w-full items-center justify-center p-2">
          <Users className="text-[#DEFFF2]" />
          <h1 className="text-[#DEFFF2] text-sm hidden lg:block font-semibold">
            Contacts
          </h1>
        </div>

        {/* Online filter */}
        <div className="flex gap-2 my-2 items-center justify-center">
          <h1 className="text-[#DEFFF2] text-sm hidden lg:block font-semibold">
            Online
          </h1>
          <p className="text-[#DEFFF2] text-sm font-semibold">
            {onlineCount}
          </p>
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
        </div>

        {/* User list */}
        <div className="overflow-y-auto w-full flex flex-col items-center border border-[#219ebc]/10">
          {filteredUsers.map((user) => {
            const isOnline = onlineSet.has(user._id);
            const isSelected = selectedUser?._id === user._id;

            return (
              <button
                key={user._id} 
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center gap-3 border-b border-[#219ebc]/10 transition-all duration-200 hover:bg-[#219ebc]/10 ${
                  isSelected
                    ? "bg-[#219ebc]/10 ring-2 rounded-xl ring-[#219ebc]/5"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative mx-auto lg:mx-2 mt-1">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full mb-1 border-2 border-[#219ebc]"
                  />
                  <span
                    className={`absolute top-0 right-0 w-3 h-3 ${
                      isOnline ? "bg-green-400" : "bg-red-400"
                    } border-2 border-white rounded-full`}
                  />
                </div>

                {/* User info */}
                <div className="hidden lg:flex flex-col text-left min-w-0">
                  <p className="text-[#DEFFF2] truncate">
                    {user.name}
                  </p>
                  <p className="text-gray-400 font-extralight text-xs">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full w-full text-[#DEFFF2] text-sm font-semibold">
            No users online...
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
