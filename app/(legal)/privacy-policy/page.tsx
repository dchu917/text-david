import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — David",
  description: "Privacy policy for David",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>Last updated: February 10, 2026</p>

      <p>
        Manaflow (the &ldquo;Company&rdquo;) is committed to maintaining robust
        privacy protections for its users. This Privacy Policy is designed to
        help you understand how we collect, use and safeguard the information
        you provide to us.
      </p>
      <p>
        For purposes of this policy, &ldquo;Site&rdquo; refers to the
        Company&rsquo;s website at{" "}
        <a href="https://textdavid.com">textdavid.com</a>.
        &ldquo;Service&rdquo; refers to the David AI messaging assistant,
        accessible via iMessage, and the Site collectively. The terms
        &ldquo;we,&rdquo; &ldquo;us,&rdquo; and &ldquo;our&rdquo; refer to the
        Company. &ldquo;You&rdquo; refers to you, as a user of our Service.
      </p>
      <p>
        By using our Service, you accept this Privacy Policy and our{" "}
        <a href="/terms-of-service">Terms of Service</a>, and you consent to
        our collection, storage, use and disclosure of your information as
        described here.
      </p>

      <h2>I. Information We Collect</h2>
      <p>
        We collect &ldquo;Non-Personal Information&rdquo; and &ldquo;Personal
        Information.&rdquo; Non-Personal Information includes information that
        cannot be used to personally identify you, such as anonymous usage data
        and diagnostics. Personal Information includes data that can identify
        you, such as your phone number, message content, and connected account
        data.
      </p>

      <h3>1. Information collected automatically</h3>
      <p>
        When you use the Service, we automatically collect:
      </p>
      <ul>
        <li>Your phone number (to identify you and deliver responses)</li>
        <li>Message content you send to the Service</li>
        <li>Conversation history (to maintain context across interactions)</li>
        <li>Timestamps and message metadata</li>
      </ul>

      <h3>2. Information you provide through integrations</h3>
      <p>
        If you choose to connect third-party accounts (such as Google), we may
        access:
      </p>
      <ul>
        <li>Google Calendar events (to read and create events on your behalf)</li>
        <li>Gmail messages (to search, read, send, and draft emails on your behalf)</li>
        <li>Google Contacts (to search your contacts)</li>
        <li>OAuth tokens (securely stored to maintain your connection)</li>
      </ul>
      <p>
        You can revoke access to connected accounts at any time by contacting
        us or revoking permissions through the third-party service.
      </p>

      <h3>3. Information you provide directly</h3>
      <p>
        If you contact us via email or through the Service, we collect the
        information you provide such as your name and email address.
      </p>

      <h3>4. Children&rsquo;s Privacy</h3>
      <p>
        The Service is not directed to anyone under the age of 13. We do not
        knowingly collect information from anyone under 13. If you believe we
        have collected such information, please contact us at{" "}
        <a href="mailto:founders@manaflow.com">founders@manaflow.com</a>.
      </p>

      <h2>II. Third-Party Services</h2>
      <p>
        The Service relies on third-party service providers to operate,
        including:
      </p>
      <ul>
        <li>
          <strong>Messaging infrastructure providers</strong> &mdash; to send
          and receive iMessages on our behalf
        </li>
        <li>
          <strong>Cloud hosting and database providers</strong> &mdash; to store
          conversation data and run backend services
        </li>
        <li>
          <strong>AI model providers</strong> &mdash; to process your messages
          and generate responses
        </li>
        <li>
          <strong>Google APIs</strong> &mdash; Calendar, Gmail, and Contacts
          integration, only accessed when you explicitly connect your Google
          account
        </li>
      </ul>
      <p>
        Each of these providers has its own privacy policy governing the
        collection and use of your data.
      </p>

      <h2>III. How We Use and Share Information</h2>
      <p>
        We use your information to:
      </p>
      <ul>
        <li>Provide and improve the Service</li>
        <li>Process your messages and generate AI responses</li>
        <li>Maintain conversation context for future interactions</li>
        <li>Execute actions on connected third-party services at your request</li>
      </ul>
      <p>
        We do not sell, trade, rent or otherwise share your Personal Information
        with third parties for marketing purposes. We may share information if
        we have a good-faith belief that disclosure is necessary to meet legal
        process or protect against harm.
      </p>

      <h2>IV. How We Protect Information</h2>
      <p>
        We implement security measures designed to protect your information from
        unauthorized access, including encryption and secure server
        infrastructure. OAuth tokens for connected services are stored securely.
        However, no method of transmission or storage is 100% secure. By using
        our Service, you acknowledge and agree to assume these risks.
      </p>

      <h2>V. Your Rights</h2>
      <p>
        Depending on your location, you may have rights under applicable data
        protection laws (such as GDPR or CCPA), including:
      </p>
      <ul>
        <li>Right to access a copy of data we hold about you</li>
        <li>Right to request correction of inaccurate data</li>
        <li>Right to request deletion of your data</li>
        <li>Right to data portability</li>
        <li>Right to restrict or object to processing</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{" "}
        <a href="mailto:founders@manaflow.com">founders@manaflow.com</a>.
      </p>

      <h2>VI. Links to Other Websites</h2>
      <p>
        The Service may provide links to third-party websites. We are not
        responsible for the privacy practices of those websites. This Privacy
        Policy applies solely to information collected by us.
      </p>

      <h2>VII. Changes to This Policy</h2>
      <p>
        We reserve the right to change this policy at any time. Significant
        changes will go into effect 30 days following notification. You should
        periodically check the Site for updates.
      </p>

      <h2>VIII. Contact Us</h2>
      <p>
        If you have any questions regarding this Privacy Policy, please contact
        us at{" "}
        <a href="mailto:founders@manaflow.com">founders@manaflow.com</a>.
      </p>

      <h2>IX. Data Retention</h2>
      <p>
        Conversation history and user data are retained as long as necessary to
        provide the Service. You may request deletion of any data associated
        with you by contacting us at{" "}
        <a href="mailto:founders@manaflow.com">founders@manaflow.com</a>.
      </p>
    </>
  );
}
