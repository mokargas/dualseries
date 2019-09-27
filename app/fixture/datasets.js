const datasets = [
  {
    "id": "1",
    "name": "Employment by Classification and Gender",
    "categories": [
      "SES 3",
      "SES 2",
      "SES 1",
      "EL2",
      "EL1",
      "APS 6",
      "APS 5",
      "APS 4",
      "APS 3",
      "APS 2",
      "APS 1",
      "Total"
    ],
    "tags": {
      "Year": [
        "at 30 June 2017",
        "at 30 June 2018"
      ],
      "Engagement": [
        "Total",
        "Ongoing",
        "Non-Ongoing"
      ],
      "Gender": [
        "Total",
        "Female",
        "Male",
        "Indeterminate, Intersex, or Unspecified"
      ]
    }
  },
  {
    "id": "2",
    "name": "Employment Type by Full-time, Part-time Status, Irregular/Intermittent",
    "categories": [
      "SES 3",
      "SES 2",
      "SES 1",
      "EL2",
      "EL1",
      "APS 6",
      "APS 5",
      "APS 4",
      "APS 3",
      "APS 2",
      "APS 1",
      "Total"
    ],
    "tags": {
      "Year": [
        "at 30 June 2017",
        "at 30 June 2018"
      ],
      "Engagement": [
        "Total",
        "Ongoing",
        "Non-Ongoing"
      ],
      "Type": [
        "Total",
        "Full-Time",
        "Part-Time",
        "Irregular or intermittent"
      ]
    }
  },
  {
    "id": "3",
    "name": "Employment type by location",
    "categories": [
      "ACT",
      "NSW",
      "NT",
      "VIC",
      "QLD",
      "WA",
      "SA",
      "TAS",
      "Overseas",
      "Total"
    ],
    "tags": {
      "Year": [
        "at 30 June 2017",
        "at 30 June 2018"
      ],
      "Engagement": [
        "Total",
        "Ongoing",
        "Non-Ongoing"
      ]
    }
  },
  {
    "id": "4",
    "name": "Indigenous Employee Staffing",
    "categories": [
      "Total",
      "Ongoing",
      "Non-ongoing",
      "Casual"
    ],
    "tags": {
      "Year": [
        "At 30 June 2017",
        "At 30 June 2018"
      ]
    }
  },
  {
    "id": "5",
    "name": "Employment Arrangements of Senior Executives and Non-Senior Executives",
    "categories": [
      "Total"
    ],
    "tags": {
      "Classification": [
        "Total",
        "SES",
        "Non-SES"
      ]
    }
  },
  {
    "id": "6",
    "name": "Salary Ranges by Classification level Minimum/Maximum",
    "categories": [
      "SES 3",
      "SES 2",
      "SES 1",
      "EL2",
      "EL1",
      "APS 6",
      "APS 5",
      "APS 4",
      "APS 3",
      "APS 2",
      "APS 1",
      "Total"
    ],
    "tags": {
      "Range": [
        "Minimum",
        "Maximum"
      ]
    }
  },
  {
    "id": "8",
    "name": "Statement of Comprehensive Income",
    "categories": [
      "Employee Benefits Expense",
      "Suppliers Expense",
      "Total Expenses",
      "Total Own-Source Income",
      "Net cost of services",
      "Revenue from Government",
      "Surplus/(Deficit) attributable to the Australian Government",
      "Total comprehensive Income/(Loss)"
    ],
    "tags": {
      "Variance": [
        "2017-18 actuals",
        "2016-17 actuals",
        "2017-18 budget"
      ]
    }
  },
  {
    "id": "9",
    "name": "Statement of Financial Position",
    "categories": [
      "Total Financial Assets",
      "Total Non-Financial Assets",
      "Total Assets",
      "Total Payables",
      "Total Provisions",
      "Total Liabilities",
      "Net Assets",
      "Total Equity"
    ],
    "tags": {
      "Variance": [
        "2017-18 actuals",
        "2016-17 actuals",
        "2017-18 budget"
      ]
    }
  },
  {
    "id": "10",
    "name": "Statement of Changes in Equity",
    "categories": [
      "Balance Carried Forward from Previous Period",
      "Adjusted Opening Balance",
      "Total Comprehensive Income",
      "Closing Balance as at 30 June"
    ],
    "tags": {
      "Variance": [
        "2017-18 actuals",
        "2016-17 actuals",
        "2017-18 budget"
      ]
    }
  },
  {
    "id": "11",
    "name": "Cash Flow Statement",
    "categories": [
      "Total Cash Received (OPERATING ACTIVITIES)",
      "Total Cash Used for (OPERATING ACTIVITIES)",
      "Net Cash from OPERATING ACTIVITIES",
      "Total Cash Received (INVESTING ACTIVITIES)",
      "Total Cash Used (INVESTING ACTIVITIES)",
      "Net Cash from INVESTING ACTIVITIES",
      "Total Cash Received (FINANCING ACTIVITIES)",
      "Total Cash Used (FINANCING ACTIVITIES)",
      "Net Cash from FINANCING ACTIVITIES",
      "Cash at the End of the Reporting Period"
    ],
    "tags": {
      "Variance": [
        "2017-18 actuals",
        "2016-17 actuals",
        "2017-18 budget"
      ]
    }
  },
  {
    "id": "12",
    "name": "Administered Schedule of Comprehensive Income",
    "categories": [
      "Total Expenses Administered on behalf of the Government",
      "Total Income Administered on behalf of the Government",
      "Net Cost of Services",
      "Net Contribution by Services",
      "Total Other Comprehensive Income/(Loss)",
      "Total comprehensive Income/(Loss)"
    ],
    "tags": {
      "Variance": [
        "2017-18 actuals",
        "2016-17 actuals",
        "2017-18 budget"
      ]
    }
  },
  {
    "id": "13",
    "name": "Administered Schedule of Assets and Liabilities",
    "categories": [
      "Total Financial Assets",
      "Total Non-Financial Assets",
      "Total Assets",
      "Total Payables",
      "Total Provisions",
      "Total Liabilities",
      "Net Assets"
    ],
    "tags": {
      "Variance": [
        "2017-18 actuals",
        "2016-17 actuals",
        "2017-18 budget"
      ]
    }
  },
  {
    "id": "14",
    "name": "Administered Reconciliation Schedule",
    "categories": [
      "Opening assets less liabilities",
      "Closing assets less liabilities"
    ],
    "tags": {
      "Variance": [
        "2017-18 actuals",
        "2016-17 actuals",
        "2017-18 budget"
      ]
    }
  },
  {
    "id": "15",
    "name": "Administered Cash Flow Statement",
    "categories": [
      "Total Cash Received (OPERATING ACTIVITIES)",
      "Total Cash Used for (OPERATING ACTIVITIES)",
      "Net Cash from OPERATING ACTIVITIES",
      "Total Cash Received (INVESTING ACTIVITIES)",
      "Total Cash Used (INVESTING ACTIVITIES)",
      "Net Cash from INVESTING ACTIVITIES",
      "Total Cash Received (FINANCING ACTIVITIES)",
      "Total Cash Used (FINANCING ACTIVITIES)",
      "Net Cash from FINANCING ACTIVITIES",
      "Total Cash from Official Public Account",
      "Total Cash to Official Public Account",
      "Cash at the End of the Reporting Period"
    ],
    "tags": {
      "Variance": [
        "2017-18 actuals",
        "2016-17 actuals",
        "2017-18 budget"
      ]
    }
  },
  {
    "id": "17",
    "name": "Entity Resource Statement",
    "categories": [
      "Ordinary annual services total",
      "Administered expenses total",
      "Specific payments to States, Act, Nt and Local Government total",
      "New administered expenses total",
      "Departmental non-operating total",
      "Administered non-operating total",
      "Other services B total",
      "Available annual total",
      "Appropriations and payments total",
      "Special appropriations C total",
      "Special accounts total",
      "Resourcing and payments total",
      "Net resourcing and payments for entity total"
    ],
    "tags": {
      "Variance": [
        "Actual available appropriation",
        "Payments made",
        "Balance remaining"
      ]
    }
  }
]

export default datasets