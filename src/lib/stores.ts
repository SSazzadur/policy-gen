"use client";

import useStore from "@/hooks/useStore";

const Stores = () => {
	const [refetch, setRefetch] = useStore<boolean>("refetch", false, false);
	const [isSidebarOpen, setIsSidebarOpen, isSidebarOpenLoading] = useStore<boolean>("sidebarOpen", true);

	return {
		isSidebarOpen,
		setIsSidebarOpen,
		isSidebarOpenLoading,
		refetch,
		setRefetch,
	};
};

export default Stores;
