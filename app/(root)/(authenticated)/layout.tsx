import React from "react";
import Sidebar from "@/components/sidebar";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="py-16">
      <div>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-10">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticatedLayout;
