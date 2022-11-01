import React from "react";
import LinearText from "../components/LinearText";
import { PolicyWrapper } from "../styled";

function Policy() {
  return (
    <PolicyWrapper>
      <LinearText
        style={{
          marginBottom: "0px",
        }}
        title={"Privacy Policy"}
        fontSize={"50px"}
        lineHeight={"55px"}
      />
      <div className="mt-2 text-italic">
        <p>Last updated: September 09, 2022</p>
        <p>
          This Privacy Policy describes our policies and procedures on the
          collection, use and disclosure of your information when using IVIRSE’s
          DataHub
        </p>
        <p>
          Your identifiable information would be used to access DataHub’s
          service. By using IVIRSE’s Datahub, you agree to the use and
          collection of information according to this Privacy Policy.
        </p>
      </div>
      <div className="title-text text-uppercase mt-10">
        Interpretation and Definitions
      </div>
      <div className="mt-3">
        <p className="title-text-small">Interpretation</p>
        <p>
          The following circumstances establish the meanings of words whose
          first letter is capitalized. The following definitions are to be
          understood equally whether they are written in the singular or plural.
        </p>
      </div>
      <div className="mt-3">
        <p className="title-text-small">Definitions</p>
        <p>For the purposes of this Privacy Policy:</p>
        {/* ul */}
        <ul>
          <li>
            <span className="title-text-small">Account </span>
            <span>
              refers to both a special username and a password setting up for
              only You to access our service or specific features of it.
            </span>
          </li>
          <li>
            <span className="title-text-small">Affiliates </span>
            <span>
              are companies that control, are controlled by, or share a common
              controlling interest with one or more parties. To be in control, a
              company must possess at least 50% of the voting shares,, equity
              interests, or control of directors or other management positions.
            </span>
          </li>
          <li>
            <span className="title-text-small">Application </span>
            <span>
              refers to the IVIRSE software program that You have downloaded
              from the Company onto Any Electronic Device.
            </span>
          </li>
          <li>
            <span className="title-text-small">Company </span>
            <span>
              (referred to as either "the Company '', "We", "Us" or "Our" in
              this Agreement) refers to IVIRSE.
            </span>
          </li>
          <li>
            <span className="title-text-small">Country </span>
            <span>refers to: Republic of Singapore.</span>
          </li>
          <li>
            <span className="title-text-small">Device </span>
            <span>
              means any device that can access the Service such as a computer, a
              cell phone or a digital tablet.
            </span>
          </li>
          <li>
            <span className="title-text-small">
              Personally identifiable information{" "}
            </span>
            <span>
              is any recognizing information to confirm an individual's
              identity.
            </span>
          </li>
          <li>
            <span className="title-text-small">Service </span>
            <span>refers to the Application.</span>
          </li>
          <li>
            <span className="title-text-small">Service provider </span>
            <span>
              is any individual—natural or legal—who processes data on behalf of
              the Company. It refers to third-party businesses or people that
              the Company employs to enable the Service, supply the Service on
              its behalf, carry out services associated with the Service, or
              help the Company analyze how the Service is utilized.
            </span>
          </li>
          <li>
            <span className="title-text-small">Usage Data </span>
            <span>
              is a term used to describe information that is automatically
              gathered from the service's infrastructure or from users of the
              service (for example, the duration of a page visit).
            </span>
          </li>
          <li>
            <span className="title-text-small">You </span>
            <span>
              refers to the person who accesses or uses the service, or, if
              applicable, the business or other legal entity that the person is
              accessing or using on their behalf.
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-10 title-text text-uppercase">
        Data collection and usage
      </div>
      <div className="mt-3 title-text">Types of Data Collected</div>
      <div className="mt-3">
        <p className="title-text-small">Identifiable information</p>
        <p>
          While accessing Our Service, We may ask You to reveal certain
          personally identifiable information that necessary to share as asset
          on Our Datahub. Personally identifiable information includes:
        </p>
        <ul>
          <li>
            DataCid: hash of encrypted data stored on IVIRSE's distributed
            storage system.
          </li>
          <li>
            TokenAmount: the amount of tokens the user wants to receive for
            sharing data.
          </li>
          <li>Owner address: the address of the data owner.</li>
          <li>hashOfKey: the hash of the key k corresponding to the data </li>
        </ul>
      </div>
      <div className="mt-3">
        <p className="title-text-small">Usage Data</p>
        <p>
          Usage Data may include information about Your Device's IP address, the
          type and version of your browser, the pages of our service that You
          view, when and how long you stay on each page, unique device
          identifiers, and other diagnostic information.
        </p>
        
        <p className="mt-3">
          We may automatically gather certain information when you use a device
          to access the Service, including, but not limited to, the type of
          devices , its unique ID, its IP address, its operating system, the
          kind of Internet browser you use, unique device identifiers, and other
          diagnostic data.
        </p>
        {/* <p>
          When You access the Service by or through a mobile device, We may
          collect certain information automatically, including, but not limited
          to, the type of mobile device You use, Your mobile device unique ID,
          the IP address of Your mobile device, Your mobile operating system,
          the type of mobile Internet browser You use, unique device identifiers
          and other diagnostic data.
        </p>
        <p>
          We may also collect information that Your browser sends whenever You
          visit our Service or when You access the Service by or through a
          mobile device.
        </p> */}
      </div>
      {/* <div className="mt-3">
        <p className="title-text-small">
          Uses of Your Identifiable Information{" "}
        </p>
        <p>
          The following uses of the Identifiable data by the Company are
          possible:
        </p>
        <ul>
          <li>
            <span className="title-text-small">To provide our Service, </span>
            <span>including to monitor the usage of our Service.</span>
          </li>
          <li>
            <span className="title-text-small">To manage Your Account: </span>
            <span>
              Controlling how things are done is necessary. For the Service to
              work, you must register. By submitting your identifiable
              information, you can gain access to Service features that are only
              available to identified users.
            </span>
          </li>
          <li>
            <span className="title-text-small">To manage Your requests: </span>
            <span>To attend and manage Your requests to Us.</span>
          </li>
          <li>
            <span className="title-text-small">For other purposes: </span>
            <span>
              Other uses of Your information include data analysis, spotting
              usage patterns, gauging the success of our marketing initiatives,
              and assessing and enhancing our Service and your experience.
            </span>
          </li>
        </ul>
        <p>
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies
          remain on Your personal computer or mobile device when You go offline,
          while Session Cookies are deleted as soon as You close Your web
          browser. Learn more about cookies on the Privacy Policies website
          article.
        </p>
        <div className="mt-3">
          <p>
          We may share Your identifiable information in the following situations:
          </p>
          <ul className="non-disc">
            <li className="mt-3">
              <p className="title-text-small">Necessary / Essential Cookies</p>
              <p>Type: Session Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies are essential to provide You with
                services available through the Website and to enable You to use
                some of its features. They help to authenticate users and
                prevent fraudulent use of user accounts. Without these Cookies,
                the services that You have asked for cannot be provided, and We
                only use these Cookies to provide. You with those services.
              </p>
            </li>
            <li className="mt-3">
              <p className="title-text-small">
                Cookies Policy / Notice Acceptance Cookies
              </p>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies identify if users have accepted the use
                of cookies on the Website.
              </p>
            </li>
            <li className="mt-3">
              <p className="title-text-small">Functionality Cookies</p>
              <p>Type: Persistent Cookies</p>
              <p>Administered by: Us</p>
              <p>
                Purpose: These Cookies allow us to remember choices You make
                when You use the Website, such as remembering your login details
                or language preference. The purpose of these Cookies is to
                provide You with a more personal experience and to avoid You
                having to re-enter your preferences every time You use the
                Website. For more information about the cookies we use and your
                choices regarding cookies, please visit our Cookies Policy or
                the Cookies section of our Privacy Policy.
              </p>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="mt-3 title-text">
        Uses of Your Identifiable Information
      </div>
      <div>
        <p>
          The following uses of the Identifiable data by the Company are
          possible:
        </p>
        <ul>
          <li>
            <span className="title-text-small">To provide our Service, </span>
            <span>including to monitor the usage of our Service.</span>
          </li>
          <li>
            <span className="title-text-small">To manage Your Account: </span>
            <span>
              Controlling how things are done is necessary. For the Service to
              work, you must register. By submitting your identifiable
              information, you can gain access to Service features that are only
              available to identified users.
            </span>
          </li>
          <li>
            <span className="title-text-small">To manage Your requests: </span>
            <span>To attend and manage Your requests to Us.</span>
          </li>
          <li>
            <span className="title-text-small">For other purposes: </span>
            <span>
              Other uses of Your information include data analysis, spotting
              usage patterns, gauging the success of our marketing initiatives,
              and assessing and enhancing our Service and your experience.
            </span>
          </li>
          {/* <li>
            <span className="title-text-small">To provide You with news, </span>
            <span>
              special offers and general information about other goods, services
              and events which we offer that are similar to those that you have
              already purchased or enquired about unless You have opted not to
              receive such information.
            </span>
          </li>
          <li>
            <span className="title-text-small">To manage Your requests: </span>
            <span>To attend and manage Your requests to Us.</span>
          </li>
          <li>
            <span className="title-text-small">For business transfers: </span>
            <span>
              We may use Your information to evaluate or conduct a merger,
              divestiture, restructuring, reorganization, dissolution, or other
              sale or transfer of some or all of Our assets, whether as a going
              concern or as part of bankruptcy, liquidation, or similar
              proceeding, in which Personal Data held by Us about our Service
              users is among the assets transferred.
            </span>
          </li>
          <li>
            <span className="title-text-small">For other purposes: </span>
            <span>
              We may use Your information for other purposes, such as data
              analysis, identifying usage trends, determining the effectiveness
              of our promotional campaigns and to evaluate and improve our
              Service, products, services, marketing and your experience.
            </span>
          </li> */}
        </ul>
        <p>
          We may share Your identifiable information in the following
          situations:
        </p>
        <ul>
          <li>
            <span className="title-text-small">With Service Providers: </span>
            <span>
              To track and analyze how our service is used, to get in touch with
              you, and we might disclose Your personal information to Service
              Providers.
            </span>
          </li>
          <li>
            <span className="title-text-small">With Affiliates: </span>
            <span>
              In the event that we disclose Your information with our
              affiliates, we shall demand that they abide by this Privacy
              Policy. Affiliates are any subsidiaries, joint venture partners,
              or other businesses that we control or that share a shared control
              structure with us, as well as Our parent company.
            </span>
          </li>
          <li>
            <span className="title-text-small">With other users: </span>
            <span>
              When You communicate with other users in the public sections and
              share personal information with them, this information may be seen
              by other users and may be made available to the general public.
            </span>
          </li>
          <li>
            <span className="title-text-small">With Your consent: </span>
            <span>
              With your permission, we may share your personal information for
              any other reason.
            </span>
          </li>
          {/* <li>
            <span className="title-text-small">With other users: </span>
            <span>
              when You share personal information or otherwise interact in the
              public areas with other users, such information may be viewed by
              all users and may be publicly distributed outside.
            </span>
          </li>
          <li>
            <span className="title-text-small">With Your consent: </span>
            <span>
              We may disclose Your personal information for any other purpose
              with Your consent.
            </span>
          </li> */}
        </ul>
      </div>
      <div className="mt-3 title-text">
        Retention of Your Identifiable Information
      </div>
      <p>
        Your identifiable information will be retained by the Company to achieve
        the objectives specified in this privacy statement. We will retain and
        utilize your information as needed to comply with our legal obligations
        (for example, if applicable laws require us to keep your data on file),
        resolve disputes, and maintain our agreements and policies.
      </p>
      <p>
        The Company will also save Usage Data for its own internal analysis
        requirements. Usage Data is normally retained for a brief period of
        time. To meet legal requirements, settle disputes, or improve the
        functionality of Our Service, information might need to be maintained
        for a longer period of time.
      </p>
      <div className="mt-3 title-text">
        Transfer of Your Identifiable Information
      </div>
      <p>
        The Company's operations offices and any other locations, where the
        parties participating in the process are based, are where your
        information is processed. It implies that this data might be moved to
        and kept on computers situated outside of Your state, province, country,
        or another governmental jurisdiction where the data protection
        regulations might be different from those from Your jurisdiction.
      </p>
      <p>
        Your permission to the transfer is shown by your acceptance of this
        Privacy Policy and your submission of the requested information.
      </p>
      <p>
        The Company will take all reasonable measures to protect Your data and
        treat it securely in line with this privacy policy, and no transfer of
        Your Personal Data to a company or a country will happen unless there
        are sufficient safeguards in place or according to the order of the
        Court or a governmental agency
      </p>
      <div className="mt-3 title-text">
        Disclosure of Your Identifiable Information
      </div>
      <p className="title-text-small">Business Transactions</p>
      <p>
        Your identifiable information might be transferred if the Company goes
        through a merger, acquisition, or asset sale. Prior to the transfer of
        Your privacy and its transition to a new Privacy Policy, we will notify
        you.
      </p>
      <p className="title-text-small">Law enforcement</p>
      <p>
        Occasionally, the Company may be required by law to disclose Your
        privacy or in response to lawful requests for the data from the
        government (e.g. a court or a government agency).
      </p>
      <p className="title-text-small">Other legal requirements</p>
      <p>
      The Company may divulge Your Information if it has a good faith belief that doing so is required to:
      </p>

      <ul>
        <li>
          <span>Comply with a legal obligation</span>
        </li>
        <li>
          <span>Protect and defend the rights or property of the Company</span>
        </li>
        <li>
          <span>
            Prevent or investigate possible wrongdoing in connection with the
            Service
          </span>
        </li>
        <li>
          <span>
            Protect the personal safety of Users of the Service or the public
          </span>
        </li>
        <li>
          <span>Protect against legal liability</span>
        </li>
      </ul>
      <div className="mt-3 title-text">Security of Usage Data </div>
      <p>
      The security of usage data is important to Us and We guarantee its absolute security as following reasons:
      </p>
      <ul>
        <li>Data is encrypted by the organization collecting and providing the data.</li>
        <li>The key used to encrypt the data is shared with the data owner through asymmetric encryption.</li>
        <li>Encrypted data is authenticated and signed by the data provider and the data owner.</li>
        <li>Encrypted data and signatures are stored on distributed storage systems.</li>
      </ul>
      <div className="mt-10 title-text text-uppercase">
      Links to Other Websites
      </div>
      <p>
      Our Service contains links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
      </p>
      <p>
      We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
      </p>
      <div className="mt-10 title-text text-uppercase">
      Changes to this Privacy Policy
      </div>
      <p>
      Our privacy policy may occasionally be updated. In case of any changes to this Policy, we'll let you know by posting the updated Privacy Policy on this page.
      </p>
      <p>
      We will keep You informed via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
      </p>
      <p>
      You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
      </p>
      
      <div className="mt-10 title-text text-uppercase">Contact Us</div>
      <p>
        If you have any questions about this Privacy Policy, You can contact us:
      </p>
      <ul>
        <li>
          By email: <span className="title-text-small">legal@ivirse.com</span>
        </li>
        <li>
        Address: <span className="title-text-small">Hong Lim Complex #02-11, 531 Upper Cross Street, 050531, Singapore</span>
        </li>
      </ul>
    </PolicyWrapper>
  );
}

export default Policy;
