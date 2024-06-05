export const trackerAccordionItems = [
  {
    id: "get-approved",
    headerPrefix: "Step 1:",
    header: "Get Approved",
    body: "This process takes time, so securing your pre-approval letter early is essential. It determines your budget, helping to focus your search on affordable options.",
  },
  {
    id: "make-offer",
    headerPrefix: "Step 2:",
    header: "Make an Offer",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.",
  },
  {
    id: "escrow",
    headerPrefix: "Step 3:",
    header: "Escrow",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.",
  },
  {
    id: "closing",
    headerPrefix: "Step 4:",
    header: "Closing",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.",
  },
  {
    id: "moving-in",
    headerPrefix: "Step 5:",
    header: "Moving In",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.",
  },
];

export const steps = {
  "get-approved": {
    description:
      "To get pre-approved, start by collecting and upload your documents to your Bloomsday portal. When you are ready we’ll help you package up your documents and share with your chosen lender.",
    tasks: [
      {
        headerIcon: "assets",
        header: "Assets",
        checkList: [
          { status: true, label: "Bank Statement" },
          { status: false, label: "2023 Tax Returns" },
          { status: true, label: "2023 W-2 Statement" },
          { status: false, label: "Brokerage Statement" },
          { status: false, label: "Retirement Statement" },
          { status: false, label: "Gift Letter" },
        ],
      },
      {
        headerIcon: "income",
        header: "Income",
        hasGroups: true,
        checkListGroups: [
          {
            title: "If Employed",
            checkList: [
              { status: false, label: "Pay Stubs" },
              { status: false, label: "Employment Letter" },
            ],
          },
          {
            title: "If Self-Employed",
            checkList: [
              { status: false, label: "Business Tax Returns" },
              { status: false, label: "Profit-Loss Statement" },
            ],
          },
        ],
      },
      {
        headerIcon: "debt",
        header: "Debt",
        checkList: [
          { status: false, label: "Student Loans" },
          { status: false, label: "Car Loan Statement" },
          { status: false, label: "Credit Card" },
          { status: false, label: "Divorce Decree" },
          { status: false, label: "Evidence of Child Support" },
          { status: false, label: "Bankruptcy" },
        ],
      },
      {
        headerIcon: "reports",
        header: "Reports",
        checkList: [
          { status: false, label: "Credit History Report" },
          { status: false, label: "Pre-Approval Letter" },
          { status: false, label: "Loan Estimate" },
        ],
      },
    ],
  },
  "make-offer": {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.",
    tasks: [
      {
        headerIcon: "write",
        header: "Prepare Offer",
        checkList: [
          { status: false, label: "Offer Letter" },
          { status: false, label: "Personalized Letter to Seller" },
        ],
      },
      {
        headerIcon: "accept",
        header: "Offer Accepted",
        checkList: [
          { status: false, label: "Sign Purchase Agreement" },
          { status: false, label: "Deposit Earnest Money" },
          { status: false, label: "Secure Mortgage with Pre-Approval Lender" },
          { status: false, label: "Title Report Review" },
        ],
      },
      {
        headerIcon: "reject",
        header: "Offer Rejected",
        checkList: [
          { status: false, label: "Offer Expired" },
          { status: false, label: "No Counteroffer" },
          { status: false, label: "Revise Offer (based on Counteroffer)" },
        ],
      },
      {
        headerIcon: "counter",
        header: "Counter Offer",
        checkList: [
          { status: false, label: "Accept Counteroffer" },
          { status: false, label: "Reject Counteroffer" },
        ],
      },
    ],
  },
  escrow: {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.",
    tasks: [
      {
        headerIcon: "home-inspections",
        header: "Inspections",
        checkList: [
          { status: false, label: "Home Inspection" },
          { status: false, label: "Mold Inspection" },
          { status: false, label: "Radon Inspection" },
          { status: false, label: "HVAC Inspection" },
          { status: false, label: "Pest Inspection" },
          { status: false, label: "Septic Inspection" },
          { status: false, label: "Chimney Inspection" },
          { status: false, label: "Electrical Inspection" },
          { status: false, label: "Foundation Inspection" },
        ],
      },
      {
        headerIcon: "home-appraisals",
        header: "Appraisals",
        checkList: [
          { status: false, label: "Property Valuation" },
          { status: false, label: "Title Review" },
          { status: false, label: "Seller Disclosure Letter" },
        ],
      },
      {
        headerIcon: "repairs",
        header: "Repairs",
        checkList: [
          { status: false, label: "Request Discount Price" },
          { status: false, label: "Request Seller Credits" },
          { status: false, label: "Requset Seller Fix Issues" },
        ],
      },
    ],
  },
  closing: {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.",
    tasks: [
      {
        headerIcon: "disclosure",
        header: "Disclosures",
        checkList: [
          { status: false, label: "Closing Disclosure" },
          { status: false, label: "Escrow Disclosure" },
        ],
      },
      {
        headerIcon: "agreement",
        header: "Agreements",
        checkList: [
          { status: false, label: "Buyer / Agent" },
          { status: false, label: "Bill of Sale" },
          { status: false, label: "Purchase Agreement" },
          { status: false, label: "Occupancy Certificate" },
        ],
      },
      {
        headerIcon: "deed",
        header: "Deeds",
        checkList: [
          { status: false, label: "Deed of Trust" },
          { status: false, label: "House Title" },
        ],
      },
      {
        headerIcon: "insurance",
        header: "Insurance",
        checkList: [
          { status: false, label: "Homeowner's Insurance" },
          { status: false, label: "Companion Policy" },
          { status: false, label: "Mortgage" },
        ],
      },
    ],
  },
  "moving-in": {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.",
    tasks: [
      {
        headerIcon: "moving-in",
        header: "Pre-Move In",
        checkList: [
          { status: false, label: "Schedule Deep Clean" },
          { status: false, label: "Schedule Movers" },
          { status: false, label: "Set up HOA Account" },
          { status: false, label: "Transfer Utilities" },
          { status: false, label: "Update Mailing Address" },
          { status: false, label: "Update Accounts" },
        ],
      },
      {
        headerIcon: "key",
        header: "Moving Day",
        checkList: [
          { status: false, label: "Organize Valuables" },
          { status: false, label: "Pack Essentials" },
          { status: false, label: "Direct the Movers" },
          { status: false, label: "Clean Old Home" },
          { status: false, label: "Verify Inventory" },
        ],
      },
      {
        headerIcon: "living",
        header: "Post Move In",
        checkList: [
          { status: false, label: "Unpack" },
          { status: false, label: "Change Locks" },
          { status: false, label: "Meet Your Neighbors" },
          { status: false, label: "Celebrate!" },
        ],
      },
    ],
  },
};

export const documentAccordionItems = [
  {
    title: "Assets",
    items: [
      {
        title: "Bank Statement",
        href: "#get-approved",
      },
      {
        title: "2023 W-2 Form",
        href: "#make-an-offer",
      },
    ],
  },
  {
    title: "Income",
    items: [
      {
        title: "Bank Statement",
        href: "#get-approved",
      },
      {
        title: "2023 W-2 Form",
        href: "#make-an-offer",
      },
    ],
  },
  {
    title: "Debts",
    items: [
      {
        title: "Bank Statement",
        href: "#get-approved",
      },
      {
        title: "2023 W-2 Form",
        href: "#make-an-offer",
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        title: "Bank Statement",
        href: "#get-approved",
      },
      {
        title: "2023 W-2 Form",
        href: "#make-an-offer",
      },
    ],
  },
];

export const sidebarMenuItems = [
  {
    title: "Home",
    href: "#home",
    icon: "home",
  },
  {
    title: "Tasks",
    icon: "tasks",
    items: [
      {
        title: "Get Approved",
        href: "/tasks/get-approved",
      },
      {
        title: "Make an Offer",
        href: "#make-an-offer",
      },
      {
        title: "Escrow",
        href: "#escrow",
      },
      {
        title: "Closing",
        href: "#closing",
      },
      {
        title: "Moving in",
        href: "#moving-in",
      },
    ],
  },
  {
    title: "Documents",
    icon: "documents",
    items: [
      {
        title: "Get Approved",
        href: "/documents/get-approved",
      },
      {
        title: "Make an Offer",
        href: "#make-an-offer",
      },
      {
        title: "Escrow",
        href: "#escrow",
      },
      {
        title: "Closing",
        href: "#closing",
      },
      {
        title: "Moving in",
        href: "#moving-in",
      },
    ],
  },
  {
    title: "Notes",
    href: "#notes",
    icon: "notes",
  },
  {
    title: "Photos",
    href: "#photos",
    icon: "photos",
  },
];

export const packageAccordionItems = [
  {
    title: "Assets",
    items: [
      {
        id: "bank_statement",
        title: "Bank Statement",
        checked: true,
        type: "PDF",
      },
      {
        id: "tax_returns",
        title: "2023 Tax Returns",
        checked: true,
        type: "PDF",
      },
      {
        id: "w_2_form",
        title: "2023 W-2 Form",
        checked: true,
        type: "PDF",
      },
    ],
  },
  {
    title: "Income",
    items: [
      {
        id: "pay_stubs",
        title: "Pay Stubs",
        checked: false,
        type: "PDF",
      },
      {
        id: "employment_letter",
        title: "Employment Letter",
        checked: true,
        type: "PDF",
      },
    ],
  },
  {
    title: "Debts",
    items: [
      {
        id: "pay_stubs1",
        title: "Pay Stubs",
        checked: false,
        type: "PDF",
      },
      {
        id: "employment_letter1",
        title: "Employment Letter",
        checked: true,
        type: "PDF",
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        id: "pay_stubs2",
        title: "Pay Stubs",
        checked: false,
        type: "PDF",
      },
      {
        id: "employment_letter2",
        title: "Employment Letter",
        checked: true,
        type: "PDF",
      },
    ],
  },
];
