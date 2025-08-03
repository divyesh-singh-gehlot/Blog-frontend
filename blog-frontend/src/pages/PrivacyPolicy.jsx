import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: July 16, 2025</p>

      <section className="mb-6">
        <p>
          Welcome to <strong>Notionary</strong>. Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you visit or use our website at{" "}
          <a href="https://notionary-5sn8.onrender.com/" className="text-blue-600 underline">
            Notionary
          </a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Personal Information:</strong> Name, email, and other details you provide when signing up or contacting us.</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, device type, IP address, and browser type.</li>
          <li><strong>Cookies:</strong> We may use cookies to enhance your experience and analyze traffic.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p>We may use your data to:</p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Provide and improve our services</li>
          <li>Send newsletters or updates (if subscribed)</li>
          <li>Respond to inquiries or support requests</li>
          <li>Monitor usage trends and enhance security</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. How We Protect Your Information</h2>
        <p>
          We use industry-standard security measures (such as HTTPS, encryption, and secure authentication) to protect
          your personal data. However, no method of transmission is 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Sharing of Information</h2>
        <p>
          We do not sell or rent your personal information. We may share it only with:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Service providers helping operate our site</li>
          <li>Law enforcement, when required by law</li>
          <li>Other parties with your explicit consent</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Access or correct your personal data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p className="mt-2">Contact us at the email below to exercise these rights.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites. We are not responsible for their privacy practices or content.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Children’s Privacy</h2>
        <p>
          Notionary is not intended for children under 13. We do not knowingly collect personal data from minors.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Continued use of the site means you accept the updated policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at: <br />
          <a href="mailto:your-email@example.com" className="text-blue-600 underline">
            gehlotdivyeshsingh@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;