import ParentLayout from "@/components/layout/parent-layout";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return <ParentLayout>{children}</ParentLayout>;
};

export default MainLayout;
