import React from "react";
import { Shield } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#fcf3e4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-[#399373] px-6 py-4 flex items-center">
          <Shield className="text-white mr-3" size={24} />
          <h1 className="text-2xl font-bold text-white">Terms of Service</h1>
        </div>
        <div className="px-6 py-8">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> 11-10-2024
          </p>

          <div className="space-y-6">
            <Section title="Introduction">
              <p>
                Welcome to ProdX! By using our application, you agree to comply
                with and be bound by these Terms of Service. Please read them
                carefully.
              </p>
            </Section>

            <Section title="Use of the Application">
              <p>
                You must use the application only for lawful purposes and in a
                way that does not infringe the rights of anyone else or restrict
                or inhibit anyone else's use of the application.
              </p>
            </Section>

            <Section title="User Accounts">
              <p>
                To access certain features of the application, you may be
                required to create an account. You are responsible for
                maintaining the confidentiality of your account information.
              </p>
            </Section>

            <Section title="Intellectual Property">
              <p>
                All content, trademarks, and other intellectual property rights
                in the application are owned by ProdX or its licensors.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                ProdX shall not be liable for any direct, indirect, incidental,
                special, consequential, or punitive damages arising from your
                use of the application.
              </p>
            </Section>

            <Section title="Changes to the Terms">
              <p>
                We may update these Terms of Service from time to time. We will
                notify you of any changes by posting the new terms on this page.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                If you have any questions about these Terms of Service, please
                contact us at{" "}
                <a
                  href="mailto:adhikowshik09@gmail.com"
                  className="text-[#399373] hover:text-indigo-800 transition-colors"
                >
                  adhikowshik09@gmail.com
                </a>
                .
              </p>
            </Section>
          </div>

          <p className="mt-8 text-gray-600">
            For more details, please visit our{" "}
            <a
              href="https://prodx09.vercel.app/"
              className="text-[#399373] hover:text-indigo-800 transition-colors"
            >
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    <div className="text-gray-600">{children}</div>
  </div>
);

export default Terms;
