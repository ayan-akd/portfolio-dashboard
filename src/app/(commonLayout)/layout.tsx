import { AuroraBackground } from "@/components/ui/aurora-background";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AuroraBackground className="flex-1">
        <div className="w-[90%] mx-auto py-8">
          {children}
        </div>
      </AuroraBackground>
    </div>
  );
};

export default CommonLayout;