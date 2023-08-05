import { Application } from "models"
import { renderViewAsPdf } from "../../utils/express-handlebars-pdf-client"
import db from "../../db/db-client"

export class ApplicationLetterService {
  #applicationId: number
  #fundingType: string
  #applicationData: any

  constructor({ applicationId, fundingType }: { applicationId: number; fundingType: string }) {
    this.#applicationId = applicationId
    this.#fundingType = fundingType
  }

  async generateApprovalLetter(): Promise<Buffer> {
    await this.#getApplicationData()

    return renderViewAsPdf(`./templates/admin/application-letter/approval/${this.#fundingType}`, {
      ...this.#applicationData,
      title: "Application Approval Letter",
      currentDate: new Date(),
      // Example content
      recipient: {
        firstName: "James",
        initials: "A.",
        lastName: "Thompson",
        address: "567 Oak Avenue",
        city: "Metropolis",
        province: "Quebec",
        country: "Canada",
        postalCode: "D4E 5F6",
        phoneNumber: "987-654-3210",
        email: "james.thompson@example.com",
      },
      program: {
        name: "Software Engineering Bootcamp",
        startDate: new Date("2023-09-01"),
        endDate: new Date("2024-03-01"),
        institutionName: "Tech Academy",
        ratePerWeekInCents: 400000,
        approvalWeeks: 26,
        travelAndAirFairCostInCents: 1200000,
      },
      disembursement: [
        { amountInCents: 1000000, releaseDate: new Date("2023-09-15") },
        { amountInCents: 1500000, releaseDate: new Date("2023-12-15") },
      ],
      studentFinancialAssistanceOfficer: {
        firstName: "Samantha",
        lastName: "Smith",
      },
    })
  }

  async generateRejectionLetter(): Promise<Buffer> {
    await this.#getApplicationData()

    return renderViewAsPdf(`./templates/admin/application-letter/rejection/${this.#fundingType}`, {
      ...this.#applicationData,
      title: "Application Rejection Letter",
    })
  }

  ////
  // See https://xkcd.com/1179/ -> https://en.wikipedia.org/wiki/ISO_8601 for date format
  async buildApprovalLetterFileName() {
    await this.#getApplicationData()

    const studentLastName = this.#applicationData.student.person.last_name
    if (!studentLastName) {
      Promise.reject(new Error("No student last name"))
    }

    const formattedData = new Date().toISOString().slice(0, 10) // YYYYY-MM-DD
    return `Approval Letter, ${studentLastName}, ${formattedData}.pdf`
  }

  async buildRejectionLetterFileName() {
    await this.#getApplicationData()

    const studentLastName = this.#applicationData.student.person.last_name
    if (!studentLastName) {
      Promise.reject(new Error("No student last name"))
    }

    const formattedData = new Date().toISOString().slice(0, 10) // YYYYY-MM-DD
    return `Rejection Letter, ${studentLastName}, ${formattedData}.pdf`
  }

  // Private Methods
  async #getApplicationData(): Promise<any> {
    if (this.#applicationData) return this.#applicationData

    const application = await db("sfa.application").where({ id: this.#applicationId }).first()
    if (!application) {
      return Promise.reject(new Error("Application not found"))
    }

    const student = await db("sfa.student").where({ id: application.student_id }).first()
    if (!student) {
      return Promise.reject(new Error("Student not found"))
    }

    const person = await db("sfa.person").where({ id: student.person_id }).first()
    if (!person) {
      return Promise.reject(new Error("Person not found"))
    }

    student.person = person
    application.student = student

    this.#applicationData = application
    return this.#applicationData
  }
}
