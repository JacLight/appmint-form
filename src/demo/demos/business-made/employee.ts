export const employee = {
    "title": "Employee Information",
    "type": "object",
    "properties": {
        "id": {
            "type": "string",
            "pattern": "[-0-9a-zA-Z]{10}$",
            "maxLength": 10,
            "minLength": 10,
            "unique": true,
            "transform": [
                "prefix::emp-",
                "random-string::6",
                "uppercase"
            ],
            "group": "status",
            "layoutGroup": "x-layout.main.items.0",
            "title": "Id"
        },
        "employeeId": {
            "type": "string",
            "pattern": "[-0-9a-zA-Z]{10}$",
            "maxLength": 10,
            "minLength": 10,
            "unique": true,
            "transform": [
                "prefix::emp-",
                "random-string::6",
                "uppercase"
            ],
            "group": "status",
            "layoutGroup": "x-layout.main.items.0",
            "title": "Employee Id",
            "inputRequired": true
        },
        "status": {
            "type": "string",
            "enum": [
                "active",
                "inactive",
                "terminated",
                "on_leave"
            ],
            "default": "active",
            "group": "status",
            "layoutGroup": "x-layout.main.items.0",
            "title": "Status"
        },
        "firstName": {
            "type": "string",
            "group": "name",
            "layoutGroup": "x-layout.main.items.0",
            "title": "First Name",
            "inputRequired": true
        },
        "lastName": {
            "type": "string",
            "group": "name",
            "layoutGroup": "x-layout.main.items.0",
            "title": "Last Name",
            "inputRequired": true
        },
        "email": {
            "type": "string",
            "format": "email",
            "group": "contact",
            "layoutGroup": "x-layout.main.items.3",
            "title": "Email",
            "inputRequired": true
        },
        "phone": {
            "type": "string",
            "group": "contact",
            "layoutGroup": "x-layout.main.items.3",
            "title": "Phone",
            "inputRequired": true
        },
        "jobTitle": {
            "type": "string",
            "group": "department",
            "layoutGroup": "x-layout.main.items.1",
            "title": "Job Title"
        },
        "department": {
            "type": "string",
            "group": "department",
            "layoutGroup": "x-layout.main.items.1",
            "title": "Department"
        },
        "employmentType": {
            "type": "string",
            "enum": [
                "full_time",
                "part_time",
                "contract",
                "temporary",
                "intern"
            ],
            "group": "employment",
            "layoutGroup": "x-layout.main.items.1",
            "title": "Employment Type"
        },
        "dateOfHire": {
            "type": "string",
            "format": "date",
            "group": "employment",
            "layoutGroup": "x-layout.main.items.1",
            "title": "Date Of Hire"
        },
        "salary": {
            "type": "number",
            "group": "compensation",
            "layoutGroup": "x-layout.main.items.2",
            "title": "Salary"
        },
        "hourlyRate": {
            "type": "number",
            "group": "compensation",
            "layoutGroup": "x-layout.main.items.2",
            "title": "Hourly Rate"
        },
        "payStructure": {
            "type": "string",
            "enum": [
                "salary",
                "hourly",
                "commission",
                "mixed"
            ],
            "group": "compensation",
            "layoutGroup": "x-layout.main.items.2",
            "title": "Pay Structure"
        },
        "benefits": {
            "type": "array",
            "labelPosition": "top",
            "layout": "horizontal",
            "readOnly": true,
            "operations": [
                "add",
                "pick"
            ],
            "dataSource": {
                "source": "collection",
                "value": "benefit"
            },
            "items": {
                "type": "object",
                "layout": "horizontal",
                "hideLabel": true,
                "properties": {
                    "benefitId": {
                        "type": "string",
                        "group": "benefit",
                        "hideLabel": true
                    },
                    "benefitName": {
                        "type": "string",
                        "group": "benefit",
                        "hideLabel": true
                    },
                    "employeeCost": {
                        "type": "number",
                        "group": "benefit",
                        "hideLabel": true
                    }
                }
            },
            "title": "Benefits"
        },
        "deductions": {
            "type": "array",
            "labelPosition": "top",
            "layout": "horizontal",
            "readOnly": true,
            "operations": [
                "add",
                "pick"
            ],
            "dataSource": {
                "source": "collection",
                "value": "deduction"
            },
            "items": {
                "type": "object",
                "layout": "horizontal",
                "hideLabel": true,
                "properties": {
                    "deductionId": {
                        "type": "string",
                        "group": "deduction",
                        "hideLabel": true
                    },
                    "deductionName": {
                        "type": "string",
                        "group": "deduction",
                        "hideLabel": true
                    },
                    "amount": {
                        "type": "number",
                        "group": "deduction",
                        "hideLabel": true
                    }
                }
            },
            "title": "Deductions"
        },
        "emergencyContact": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "group": "emergency"
                },
                "relationship": {
                    "type": "string",
                    "group": "emergency"
                },
                "phone": {
                    "type": "string",
                    "group": "emergency"
                }
            },
            "title": "Emergency Contact"
        },
        "address": {
            "type": "object",
            "group": "address",
            "properties": {
                "street1": {
                    "type": "string",
                    "group": "address"
                },
                "street2": {
                    "type": "string",
                    "group": "address"
                },
                "city": {
                    "type": "string",
                    "group": "address"
                },
                "state": {
                    "type": "string",
                    "group": "address"
                },
                "postalCode": {
                    "type": "string",
                    "group": "address"
                },
                "country": {
                    "type": "string",
                    "group": "address"
                }
            },
            "layoutGroup": "x-layout.main.items.3",
            "title": "Address"
        },
        "taxInformation": {
            "type": "object",
            "group": "tax",
            "properties": {
                "ssn": {
                    "type": "string",
                    "pattern": "^\\d{3}-\\d{2}-\\d{4}$",
                    "group": "tax"
                },
                "federalFilingStatus": {
                    "type": "string",
                    "enum": [
                        "single",
                        "married_joint",
                        "married_separate",
                        "head_of_household",
                        "qualifying_widow"
                    ],
                    "group": "tax"
                },
                "federalAllowances": {
                    "type": "number",
                    "group": "tax"
                },
                "stateFilingStatus": {
                    "type": "string",
                    "group": "tax"
                },
                "stateAllowances": {
                    "type": "number",
                    "group": "tax"
                }
            },
            "layoutGroup": "x-layout.main.items.4",
            "title": "Tax Information"
        },
        "createdAt": {
            "type": "string",
            "format": "date-time",
            "readOnly": true,
            "title": "Created At"
        },
        "updatedAt": {
            "type": "string",
            "format": "date-time",
            "readOnly": true,
            "title": "Updated At"
        }
    },
    "required": [
        "employeeId",
        "firstName",
        "lastName",
        "email",
        "phone"
    ],
    "x-layout": {
        "main": {
            "type": "tab",
            "id": "main",
            "items": [
                {
                    "id": "personal",
                    "title": "Personal Information"
                },
                {
                    "id": "employment",
                    "title": "Employment Information"
                },
                {
                    "id": "compensation",
                    "title": "Compensation & Benefits"
                },
                {
                    "id": "address",
                    "title": "Address & Contact"
                },
                {
                    "id": "tax",
                    "title": "Tax Information"
                }
            ]
        }
    }
}