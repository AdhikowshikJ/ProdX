import React from "react";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#fcf3e4]  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-[#399373] px-6 py-4 flex items-center">
          <Shield className="text-white mr-3" size={24} />
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
        </div>
        <div className="px-6 py-8">
          <p className="text-gray-600 mb-6">
            <strong>Effective Date:</strong> 11-10-2024
          </p>

          <div className="space-y-6">
            <Section title="Introduction">
              <p>
                At ProdX, we value your privacy. This Privacy Policy outlines
                how we collect, use, and protect your personal information when
                you use our application.
              </p>
            </Section>

            <Section title="Information We Collect">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Personal Information:</strong> When you sign in with
                  your Google account, we may collect your name, email address,
                  and profile picture.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect data on how you
                  interact with our app, including your activity logs and
                  preferences.
                </li>
              </ul>
            </Section>

            <Section title="How We Use Your Information">
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and maintain our service.</li>
                <li>To notify you about changes to our service.</li>
                <li>
                  To allow you to participate in interactive features of our
                  service when you choose to do so.
                </li>
                <li>To provide customer support.</li>
              </ul>
            </Section>

            <Section title="Data Sharing">
              <p>
                We do not share your personal information with third parties
                without your consent, except as required by law.
              </p>
            </Section>

            <Section title="Security">
              <p>
                We take the security of your data seriously and use reasonable
                measures to protect it.
              </p>
            </Section>

            <Section title="Your Rights">
              <p>
                You have the right to request access to your personal data, ask
                for corrections, or request deletion under applicable laws.
              </p>
            </Section>

            <Section title="Contact Us">
              <p>
                If you have any questions about this Privacy Policy, please
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
              Privacy Policy
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

export default Privacy;
