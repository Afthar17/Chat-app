import { Users } from "lucide-react";

const SidebarSkeleton = () => {

  return (
    <aside className="w-18 lg:w-60 bg-blue-300/10 h-full rounded-2xl">
        <div className="flex flex-col items-center justify-top h-full border rounded-2xl border-[#219ebc]/10 ">
            <div className="flex gap-2 mt-3 border-b border-[#219ebc]/10 w-full items-center justify-center p-2 ">
                <Users className="text-[#DEFFF2]" /> 
                <h1 className="text-[#DEFFF2] text-sm hidden lg:block font-semibold">Contacts</h1>
            </div>
            <div className="overflow-y-auto w-full py-3">
                {Array(8).fill(null).map((_, idx) => (
                <div key={idx} className="w-full p-3 flex items-center gap-3">
                    {/* Avatar skeleton */}
                    <div className="relative mx-auto lg:mx-0">
                        <div className="skeleton size-12 rounded-full" />
                    </div>

                    {/* User info skeleton - only visible on larger screens */}
                    <div className="hidden lg:block text-left min-w-0 flex-1">
                        <div className="skeleton h-4 w-32 mb-2" />
                        <div className="skeleton h-3 w-16" />
                    </div>
                </div>
                ))}
            </div>
        </div>
    </aside>
  );
};

export default SidebarSkeleton;